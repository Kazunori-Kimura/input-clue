import * as actionTypes from '../utils/actionTypes';
/**
 * 入力
 * @param {string} word 
 */
export const onChangeWord = word => ({
  type: actionTypes.UPDATE_WORD,
  word,
});

/**
 * 翻訳
 * @param {string} word 
 */
export const onTranslateClick = word => ({
  type: actionTypes.TRANSLATE_WORD,
  word,
});

export const translateStart = () => ({
  type: actionTypes.TRANSLATE_WORD_START,
});

export const translateSucceeded = payload => ({
  type: actionTypes.TRANSLATE_WORD_SUCCEEDED,
  payload,
});

export const translateFailed = payload => ({
  type: actionTypes.TRANSLATE_WORD_FAILED,
  payload,
});

/**
 * 単語選択
 * @param {string} word 
 */
export const onWordClick = word => ({
  type: actionTypes.SELECT_WORD,
  word,
});

export const fetchDictionary = () => ({
  type: actionTypes.FETCH_DICTIONARY_REQUESTED,
});

export const fetchDictionaryStart = () => ({
  type: actionTypes.FETCH_DICTIONARY_START,
});

export const fetchDictionarySucceeded = payload => ({
  type: actionTypes.FETCH_DICTIONARY_SUCCEEDED,
  payload,
});

export const fetchDictionaryFailed = payload => ({
  type: actionTypes.FETCH_DICTIONARY_FAILED,
  payload,
});
