// 辞書ファイルをJSONに置き換える
require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const XLSX = require('xlsx');
const moment = require('moment');
const debug = require('debug')('build:dictionary');

// 言語の定義: ../src/commons/index.js
const LANGUAGE_DEFINITION = path.resolve(__dirname, '../src/commons/index.js');
// 辞書ファイルの場所: ../dictionary
const SOURCE_DICTIONARIES = path.resolve(__dirname, '../dictionary');
// publicフォルダ: ../public
const PUBLIC_DICTIONARIES = path.resolve(__dirname, '../public/dictionary');


function isEmpty(cell) {
  if (typeof cell !== 'undefined' && typeof cell.v !== 'undefined') {
    return false;
  }
  return true;
}

function loadSheet(filename) {
  const f = path.resolve(SOURCE_DICTIONARIES, filename);
  // WorkBookの読み込み
  const book = XLSX.readFile(f);
  // 先頭のSheetの読み込み
  const name = book.SheetNames[0];
  const sheet = book.Sheets[name];

  // セル範囲を取得
  const ref = sheet['!ref'];
  const range = XLSX.utils.decode_range(ref);
  /*
    =>{
        s: { c: <Number>, r: <Number> },
        e: { c: <Number>, r: <Number> },
      }
   */
  const {
    s: {
      c: startColumn,
      r: startRow,
    },
    e: {
      c: endColumn,
      r: endRow,
    }
  } = range;

  // くるくる回してデータを取得
  const data = [];
  for (let row = startRow; row <= endRow; row += 1) {
    const item = {
      kana: '',
      word: '',
      mean: '',
      pro: '', // 発音記号
    };

    for (let col = startColumn; col <= endColumn; col += 1) {
      const address = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = sheet[address];
      if (!isEmpty(cell)) {
        if (col === startColumn) {
          item.kana = cell.v;
        } else if (col === startColumn + 1) {
          item.word = cell.v;
        } else if (col === startColumn + 2) {
          item.mean = cell.v;
        } else if (col === startColumn + 3) {
          item.pro = cell.v;
        }
      }
    }

    data.push(item);
  }

  return data;
}

async function writeJson(dictionary, data) {
  const dir = path.resolve(PUBLIC_DICTIONARIES, dictionary);
  await fs.mkdirp(dir);
  const file = path.resolve(dir, 'data.json');
  await fs.writeJSON(file, data, { encoding: 'utf-8' });
}

/*
  最終的に出力されるJSONファイル
  public/dictionary/{辞書ファイル名}/data.json
  {
    lang: 'string',
    modified: number, // utc/unixtime
    data: [
      { kana, word, mean },
    ]
  }
 */
async function main() {
  // 言語ファイル定義をコピーする
  const COMMON_FILE = path.resolve(__dirname, 'common.mjs');
  await fs.copyFile(LANGUAGE_DEFINITION, COMMON_FILE);
  // 言語ファイル定義を読み込み
  const { languages } = await import(COMMON_FILE);

  // 言語の定義から辞書ファイルを取得
  const tasks = Object.keys(languages).map(async (lang) => {
    const { dictionary } = languages[lang];

    if (dictionary) {
      // Excelファイルを読み込んでJSONに変換
      const data = loadSheet(dictionary);
      // JSONデータを組み立て
      const json = {
        lang,
        data,
        modified: moment.utc().unix(),
      };
      // publicフォルダに出力
      await writeJson(dictionary, json);
    }
  });
  
  // 処理完了を待つ
  await Promise.all(tasks);
}

main()
  .then(() => {
    debug('done.');
  })
  .catch((err) => {
    debug('Error! %O', err);
  });
