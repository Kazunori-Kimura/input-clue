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

  /**
   * 更新日時を取得
   * @param {string} uri 
   */
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

  /**
   * 更新日時の更新
   * @param {string} uri 
   * @param {number} modified 
   */
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

  /**
   * IndexedDBを開く
   */
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

  /**
   * 単語を取得 (前方一致検索)
   * @param {string} search
   */
  async getWordsAsync(search) {
    return new Promise((resolve, reject) => {
      // 返却する配列
      const list = [];

      // rangeを作成
      const nextWord = search.slice(0, -1)
        + String.fromCharCode(search.slice(-1).charCodeAt() + 1);
      console.log('range:', search, nextWord);
      const range = IDBKeyRange.bound(search, nextWord, false, true);

      // 検索処理
      const request = this.db.transaction([STORE_WORDS])
        .objectStore(STORE_WORDS)
        .index('kana')
        .openCursor(range);
      
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

  handleError(ev) {
    console.error(ev);
    throw new Error('database error.');
  }
}

export default Database;
