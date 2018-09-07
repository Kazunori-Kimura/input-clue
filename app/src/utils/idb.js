// IndexedDBのラッパークラス
const DATABASE_NAME = 'dictionary'; // database名
const VERSION = 1; // databaseバージョン
const STORE_NAME = 'words';

class Database {
  constructor() {
    this.db = null;
    this.transaction = null;
    this.isOpen = false;
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
        const objectStore = this.db.createObjectStore(STORE_NAME, { autoIncrement: true });
        // kanaにindexを作成する (重複可能)
        objectStore.createIndex('kana', 'kana', { unique: false });
      };
    });
  }

  async addAsync(items) {
    new Promise((resolve, reject) => {
      if (this.transaction === null) {
        this.transaction = this.db.transaction([STORE_NAME], 'readwrite');
      }
      // すべて完了
      this.transaction.oncomplete = () => {
        this.transaction = null;
        resolve();
      };
      // エラー
      this.transaction.onerror = (ev) => {
        reject(ev);
      };

      const store = this.transaction.objectStore(STORE_NAME);
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
