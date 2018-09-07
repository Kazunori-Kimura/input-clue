import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDictionaryStart, fetchDictionarySucceeded, fetchDictionaryFailed } from '../actions';
import { FETCH_DICTIONARY_REQUESTED } from '../utils/actionTypes';

/**
 * fetchして結果をstoreに反映する
 */
function* fetchDictionary() {
  try {
    // 開始
    yield put(fetchDictionaryStart());
    // fetch
    const request = new Request('./dictionary/PdicThai-JP-092U.xlsx');
    const response = yield call(fetch, request);
    console.log(response);
    // responseをarrayBufferで受け取る
    const buff = response.arrayBuffer();

    const status = response.status;
    const data = new Uint8Array(buff);
    yield put(fetchDictionarySucceeded({ status, data }));
  } catch (err) {
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
