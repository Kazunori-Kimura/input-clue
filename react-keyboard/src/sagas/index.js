import { all } from 'redux-saga/effects';
import dictionarySagas from './dictionary';
import translateSagas from './translate';

export default function* rootSaga() {
  yield all([
    ...dictionarySagas,
    ...translateSagas,
  ]);
}
