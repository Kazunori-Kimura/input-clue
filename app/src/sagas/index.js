import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchDictionary() {
  try {
    const request = new Request('./dictionary/PdicThai-JP-092U.xlsx');
    const response = yield call(fetch, request);
    const buff = yield call(response.arrayBuffer);

    const status = response.status;
    const data = new Uint8Array(buff);
    yield put()
  } catch (err) {

  }
}
