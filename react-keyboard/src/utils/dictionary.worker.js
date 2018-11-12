import Database from './database';

// メッセージの受信処理
self.onmessage = (evt) => {
  const { uri, lang } = evt.data;

  // 辞書ファイルの読み込み処理
  parseDictionary(uri, lang)
    .then(() => {
      self.postMessage({ status: 'ok' });
    })
    .catch((err) => {
      self.postMessage({ status: 'error', error: err });
    });
};

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

    // JSONを取得
    const json = await res.json();

    // IndexedDBに追加
    await db.addAsync(lang, json.data);
  }
}
