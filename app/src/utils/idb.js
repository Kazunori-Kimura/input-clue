// IndexedDBのラッパークラス
const DATABASE_NAME = 'dictionary'; // database名
const VERSION = 1;
const STORE_WORDS = 'words';
const STORE_FILES = 'files';

class Database {
  constructor() {
    this.db = null;
    this.isOpen = false;
  }

  async getModifiedAsync(uri) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction([STORE_FILES])
        .objectStore(STORE_FILES)
        .get(uri);
      
      request.onerror = (evt) => {
        reject(evt);
      };

      request.onsuccess = () => {
        let value = 0;
        try {
          if (request.result.modified) {
            value = parseInt(request.result.modified, 10);
          }
        } catch (err) {
          console.warn(err);
        }
        resolve(value);
      };
    });
  }

  async setModifiedAsync(uri, modified) {
    new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_FILES], 'readwrite');
      // すべて完了
      transaction.oncomplete = () => {
        resolve();
      };
      // エラー
      transaction.onerror = (ev) => {
        reject(ev);
      };

      // 登録処理
      const store = transaction.objectStore(STORE_FILES);
      store.put({ uri, modified });
    });
  }

  async openAsync() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, VERSION);
      // error
      request.onerror = (ev) => {
        console.error(ev);
        this.isOpen = false;
        reject(ev);
      };

      // success
      request.onsuccess = (ev) => {
        this.db = ev.target.result;
        // エラーハンドラ
        this.db.onerror = this.handleError;
        // openフラグ
        this.isOpen = true;

        resolve();
      };

      // upgradeneeded
      // objectStoreの作成が完了するとonsuccessが呼ばれる
      request.onupgradeneeded = (ev) => {
        this.db = ev.target.result;
        // objectStoreの作成
        const objectStore = this.db.createObjectStore(STORE_WORDS, { autoIncrement: true });
        // kanaにindexを作成する (重複可能)
        objectStore.createIndex('kana', 'kana', { unique: false });

        // 最終更新日時を格納するobjectStore
        this.db.createObjectStore(STORE_FILES, { keyPath: 'uri' });
      };
    });
  }

  /**
   * 単語登録
   * @param {object} items { kana, word, mean }
   */
  async addAsync(items) {
    new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_WORDS], 'readwrite');

      // すべて完了
      transaction.oncomplete = () => {
        resolve();
      };
      // エラー
      transaction.onerror = (ev) => {
        reject(ev);
      };

      const store = transaction.objectStore(STORE_WORDS);
      for (let i = 0; i < items.length; i += 1) {
        store.add(items[i]);
      }
    });
  }

  handleError(ev) {
    console.error(ev);
    throw new Error('database error.');
  }
}

export default Database;
