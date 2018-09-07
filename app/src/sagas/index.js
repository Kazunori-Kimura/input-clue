import { call, put, takeLatest } from 'redux-saga/effects';
import XLSX from 'xlsx';
import { fetchDictionaryStart, fetchDictionarySucceeded, fetchDictionaryFailed } from '../actions';
import { FETCH_DICTIONARY_REQUESTED } from '../utils/actionTypes';

/**
 * ExcelシートをJSONに変換する
 * @param {ArrayBuffer} buff
 */
function parseXlsxToJson(buff) {
  const arr = new Uint8Array(buff);
  const book = XLSX.read(arr, { type: 'array' });
  const sheetName = book.SheetNames[0];
  const sheet = book.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

function getArrayBufferAsync(res) {
  return new Promise((resolve, reject) => {
    res.arrayBuffer()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

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
    // responseをarrayBufferで受け取る
    const buff = yield call(getArrayBufferAsync, response);

    const status = response.status;
    // ArrayBufferをJSONに変換
    const data = parseXlsxToJson(buff);
    console.log(data);

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
