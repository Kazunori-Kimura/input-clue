### redux-saga

redux-saga/README_ja.md at master · redux-saga/redux-saga
https://github.com/redux-saga/redux-saga/blob/master/README_ja.md

### fetch

Response - Web API インターフェイス | MDN
https://developer.mozilla.org/ja/docs/Web/API/Response

### xlsx

js-xlsx/fetch.html at master · SheetJS/js-xlsx
https://github.com/SheetJS/js-xlsx/blob/master/demos/xhr/fetch.html

js-xlsx/sheetjs.jsx at 5628fa81a38cbf567ddf90d0c17eb63f253e0e78 · SheetJS/js-xlsx
https://github.com/SheetJS/js-xlsx/blob/5628fa81a38cbf567ddf90d0c17eb63f253e0e78/demos/react/sheetjs.jsx

Node.jsでExcelファイルのread/write - Qiita
https://qiita.com/Kazunori-Kimura/items/29038632361fba69de5e

### material ui

The world's most popular React UI framework - Material-UI
https://material-ui.com/

### web worker

webpack-contrib/worker-loader: A webpack loader that registers a script as a Web Worker
https://github.com/webpack-contrib/worker-loader

Web Worker を使用する - Web API インターフェイス | MDN
https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers

### indexed db

IndexedDB を使用する - Web API インターフェイス | MDN
https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Using_IndexedDB

IndexedDBでインデックスを利用して前方一致検索する - Qiita
https://qiita.com/sienori/items/9c58a0c82159e483c3a4


-------

# クライアントサイドで大きなデータを扱うときのおはなし ~ Web WorkerとIndexedDB ~

辞書データ (Excelファイル) を前方一致検索するWebアプリケーション

辞書データは任意のタイミングで更新可能
ファイルサイズは10MBほど
デプロイはファイルをプロバイダーのホームページサービスで公開するだけ
データベースやサーバーサイドの処理を使えない

## 課題(1) Excelをクライアントサイドで読み込める？

クライアントサイドでExcelデータを読み込む
`xlsx`

xlsx - npm
https://www.npmjs.com/package/xlsx

ExcelファイルをfetchしてArrayBufferとして読み込む
xlsxでWorksheetにパースする

```js
import XLSX from 'xlsx';

async function readXlsxAsync(url) {
  // fetch
  const res = await fetch(url, {
    cache: 'no-cache',
    method: 'GET',
  });
  // response to arrayBuffer
  const buff = await res.arrayBuffer();
  // buffer to Uint8Array
  const arr = new Uint8Array(buff);
  // Workbook
  const book = XLSX.read(arr, { type: 'array' });

  ...
}
```

## 課題(2) 辞書データから単語を検索するパフォーマンス

Excelデータを都度開くのは処理が遅くなりそう
では予めExcelデータを配列に展開しておく？
巨大な配列から特定のデータを抜き出す処理だって重いはず...

`IndexedDB`

> IndexedDB は、ユーザーのブラウザー内にデータを永続的に保存する手段
> IndexedDB では、"キー" でインデックス付けされたオブジェクトを保存および取り出すことができます。

基本的な概念 - Web API インターフェイス | MDN
https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB

```js
const DATABASE_NAME = 'database';
const VERSION = 1;
const STORE_NAME = 'store';

async function openAsync() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, VERSION);
    // error
    request.onerror = (ev) => {
      reject(ev);
    };

    // success
    request.onsuccess = (ev) => {
      const db = ev.target.result;
      resolve(db);
    };

    // upgradeneeded
    // objectStoreの作成が完了するとonsuccessが呼ばれる
    request.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      // objectStoreの作成
      const objectStore = db.createObjectStore(STORE_NAME, { autoIncrement: true });
      // kanaにindexを作成する (重複可能)
      objectStore.createIndex('kana', 'kana', { unique: false });
    };
  });
}
```

```js
async function addAsync(db, items) {
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');

    // すべて完了
    transaction.oncomplete = () => {
      resolve();
    };
    // エラー
    transaction.onerror = (ev) => {
      reject(ev);
    };

    const store = transaction.objectStore(STORE_NAME);
    for (let i = 0; i < items.length; i += 1) {
      store.add(items[i]);
    }
  });
}
```

```js
async function searchAsync(db, search) {
  return new Promise((resolve, reject) => {
    // 返却する配列
    const list = [];
    // rangeを作成
    const nextWord = search.slice(0, -1)
      + String.fromCharCode(search.slice(-1).charCodeAt() + 1);
    const range = IDBKeyRange.bound(search, nextWord, false, true);
    // 検索処理
    const request = db.transaction([STORE_WORDS])
      .objectStore(STORE_WORDS).index('kana').openCursor(range);

    request.onerror = (evt) => {
      reject(evt);
    };

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else {
        resolve(list);
      }
    };
  });
}
```

## 課題(3) Excel -> JSON 変換処理が重たい

Excelには10万以上の単語が登録されており、`xlsx` での読み出し・パース処理が重たい
単語を `IndexedDB` に登録するのもぐるぐると配列を回すことになる

`Web Worker`

> Web Workers は、Web コンテンツがスクリプトをバックグラウンドのスレッドで実行するためのシンプルな手段

Web Worker を使用する - Web API インターフェイス | MDN
https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers


> Worker で実行できないことは主に、親ページに直接影響を与えるものです。これは、DOM の操作やページのオブジェクトを使用することを含みます。

## 課題(4) WebWorkerから呼び出すスクリプトも ES2018 で書きたい

Web Workerを生成するには `Worker()` にスクリプトのURIを指定する

```js
const worker = new Worker('worker.js');
```

`create-react-app` で作成したプロジェクトは `react-scripts` によってトランスパイル・バンドルされる
`react-scripts` は `Babel` や `WebPack` の処理が上手く隠蔽されているので手を加えたくない

### worker-loader

webpack-contrib/worker-loader: A webpack loader that registers a script as a Web Worker
https://github.com/webpack-contrib/worker-loader

```js
import Worker from 'worker-loader!../utils/dictionary.worker';
// Web Workerのインスタンス生成
const worker = new Worker();
// メッセージの受け取り
worker.onmessage = (evt) => {
  ...
};
// メッセージの受信
worker.postMessage('message');
```

## まとめ

`IndexedDB` を使用すれば、フロントエンドだけで大きなデータを扱うことが可能
ブラウザに永続化されるのでオフライン時でも利用可能
`Web Worker` を使用すれば、計算処理などをバックグラウンドのスレッドで実行可能

これらを活用することで使い勝手のよいWebアプリケーションが作成できる


Kazunori-Kimura/input-clue
https://github.com/Kazunori-Kimura/input-clue
