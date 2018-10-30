import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loadDictionaryStart, loadDictionarySucceeded, loadDictionaryFailed,
  LOAD_DICTIONARY,
} from '../actions';
import Worker from 'worker-loader!../utils/dictionary.worker'; // eslint-disable-line

/**
 * WebWorkerを実行する
 * @async
 * @param {Object} param
 * @param {String} param.uri 辞書ファイルのパス
 * @param {String} param.lang 言語
 */
function runWorkerAsync({ uri, lang }) {
  return new Promise((resolve, reject) => {
    const worker = new Worker();

    // WebWorkerのメッセージ受信処理
    worker.onmessage = (evt) => {
      const { data } = evt;
      if (data.status === 'ok') {
        resolve();
      } else {
        reject({ error: data.error });
      }
    };

    // WebWorkerへのメッセージ送信
    worker.postMessage({ uri, lang });
  });
}

/**
 * 辞書ファイルの読み込み処理
 * @param {*} action 
 */
function* loadDictionary(action) {
  try {
    // 辞書読み込み開始
    yield put(loadDictionaryStart());

    const { dictionary, lang } = action.payload;
    const uri = `./dictionary/${dictionary}`;
    // workerを実行する
    yield call(runWorkerAsync, { uri, lang });

    // 成功
    yield put(loadDictionarySucceeded());
  } catch (err) {
    // 失敗
    yield put(loadDictionaryFailed({ error: err }));
  }
}

const sagas = [
  takeLatest(LOAD_DICTIONARY, loadDictionary),
];

export default sagas;
