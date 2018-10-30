import XLSX from 'xlsx';
import Database from './database';

// メッセージの受信処理
self.addEventListener('message', (evt) => {
  const { uri, lang } = evt.data;

  // 辞書ファイルの読み込み処理
  parseDictionary(uri, lang)
    .then(() => {
      self.postMessage({ status: 'ok' });
    })
    .catch((err) => {
      self.postMessage({ status: 'error', error: err });
    });
});

/**
 * ファイルの最終更新日を取得
 * @param {String} url 辞書ファイル
 */
async function getModified(url) {
  const res = await fetch(url, {
    cache: 'no-cache',
    method: 'HEAD',
  });

  const modified = res.headers.get('last-modified');
  return Date.parse(modified);
}

/**
 * 辞書ファイルを読み込んでIndexedDBに格納する
 * @param {String} url 辞書ファイル
 * @param {String} lang 言語
 */
async function parseDictionary(url, lang) {
  const db = new Database();
  await db.openAsync(lang);

  // 辞書ファイルの更新日を取得
  const lastModified = await getModified(url);
  const dbModified = await db.getModifiedAsync(lang);

  // バージョンチェックを行う
  if (dbModified !== lastModified) {
    // fetch
    const res = await fetch(url, {
      cache: 'no-cache',
      method: 'GET',
    });
    // 最終更新日時を保持
    const modified = res.headers.get('last-modified');
    const value = Date.parse(modified);
    await db.setModifiedAsync(lang, value);

    // response to arrayBuffer
    const buff = await res.arrayBuffer();
    // buffer to Uint8Array
    const arr = new Uint8Array(buff);
    // Workbook
    const book = XLSX.read(arr, { type: 'array' });
    // WorkSheet
    const name = book.SheetNames[0];
    const sheet = book.Sheets[name];
    // toJson
    const data = sheetToJson(sheet);

    // IndexedDBに追加
    await db.addAsync(lang, data);
  }
}

/**
 * シートの値をJSONに変換
 * @param {XLSX.WorkSheet} sheet
 */
function sheetToJson(sheet) {
  // セル範囲
  const ref = sheet['!ref'];
  // セル範囲を数値表現に変換
  // => {
  //      s: { c: <number>, r: <number> },
  //      e: { c: <number>, r: <number> }
  //    }
  const range = XLSX.utils.decode_range(ref);
  // { kana, word, mean }
  const rowStart = range.s.r;
  const colStart = range.s.c;
  const rowEnd = range.e.r;
  const colEnd = range.e.c;
  const data = [];
  for (let row = rowStart; row <= rowEnd; row += 1) {
    const item = {
      kana: '',
      word: '',
      mean: '',
    };

    for (let col = colStart; col <= colEnd; col += 1) {
      const address = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = sheet[address];
      if (!isEmpty(cell)) {
        if (col === colStart) {
          item.kana = cell.v;
        } else if (col === colStart + 1) {
          item.word = cell.v;
        } else if (col === colStart + 2) {
          item.mean = cell.v;
        }
      }
    }

    data.push(item);
  }

  return data;
}

function isEmpty(cell) {
  if (typeof cell !== 'undefined' && typeof cell.v !== 'undefined') {
    return false;
  }
  return true;
}
