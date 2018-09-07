import XLSX from 'xlsx';
import Database from './idb';

self.addEventListener('message', (evt) => {
  const url = evt.data;

  parseDictionary(url)
    .then(() => {
      self.postMessage({ status: 'ok' });
    })
    .catch((err) => {
      self.postMessage({ status: 'error', error: err });
    });
});

async function parseDictionary(url) {
  // fetch
  const req = new Request(url);
  const res = await fetch(req);

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
  const db = new Database();
  await db.openAsync();
  await db.addAsync(data);
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
