import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDictionaryStart, fetchDictionarySucceeded, fetchDictionaryFailed } from '../actions';
import { FETCH_DICTIONARY_REQUESTED } from '../utils/actionTypes';
import Worker from 'worker-loader!../utils/dictionary.worker'; // eslint-disable-line

/**
 * Web Workerを実行する
 * @param {string} url 
 */
function runWorkerAsync(url) {
  return new Promise((resolve, reject) => {
    const worker = new Worker();

    worker.onmessage = (evt) => {
      const { data } = evt;
      if (data.status === 'ok') {
        resolve();
      } else {
        reject({ error: data.error });
      }
    };

    worker.postMessage(url);
  });
}

/**
 * Worker起動して結果をstoreに反映する
 */
function* fetchDictionary() {
  try {
    // 開始
    yield put(fetchDictionaryStart());
    // workerをキック
    yield call(runWorkerAsync, './dictionary/PdicThai-JP-092U.xlsx');
    // 成功
    yield put(fetchDictionarySucceeded());
  } catch (err) {
    // 失敗
    yield put(fetchDictionaryFailed({ error: err }));
  }
}

/**
 * FETCH_DICTIONARY_REQUESTED Actionを受け取って
 * fetchDictionaryを実行
 */
function* handleFetchDictionary() {
  yield takeLatest(FETCH_DICTIONARY_REQUESTED, fetchDictionary);
}

export default handleFetchDictionary;
