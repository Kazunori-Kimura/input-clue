import { call, put, takeLatest } from 'redux-saga/effects';
import {
  translateWordStart, translateWordSucceeded, translateWordFailed,
  TRANSLATE_WORD,
} from '../actions';
import Database from '../utils/database';

/**
 * 単語検索
 * @async
 * @param {Object} payload
 * @param {String} payload.lang 言語
 * @param {String} payload.word 単語
 */
async function searchWord({ lang, word }) {
  const db = new Database();
  await db.openAsync(lang);
  const list = await db.getWordsAsync(lang, word);
  return list;
}

/**
 * 検索処理
 * @param {*} action 
 */
function* translate(action) {
  try {
    // 開始
    yield put(translateWordStart());

    // 検索処理
    const list = yield call(searchWord, action.payload);

    // 成功
    yield put(translateWordSucceeded({ list }));
  } catch (err) {
    // 失敗
    yield put(translateWordFailed({ error: err }));
  }
}

const sagas = [
  takeLatest(TRANSLATE_WORD, translate),
];

export default sagas;
