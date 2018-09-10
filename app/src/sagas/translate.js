import { call, put, takeLatest } from 'redux-saga/effects';
import {
  translateStart, translateSucceeded, translateFailed,
} from '../actions';
import { TRANSLATE_WORD } from '../utils/actionTypes';
import Database from '../utils/idb';

async function searchWords(word) {
  const db = new Database();
  await db.openAsync();
  const list = await db.getWordsAsync(word);
  return list;
}

/**
 * 単語検索
 */
function* translateWord(action) {
  try {
    // 開始
    yield put(translateStart());
    // 検索処理
    const { word } = action;
    const list = yield call(searchWords, word);
    console.log(word, list);
    // 成功
    yield put(translateSucceeded({ list }));
  } catch (err) {
    // 失敗
    yield put(translateFailed({ error: err }));
  }
}

/**
 * TRANSLATE_WORD Actionを受け取って translateWord を実行する
 */
const sagas = [
  takeLatest(TRANSLATE_WORD, translateWord),
];

export default sagas;
