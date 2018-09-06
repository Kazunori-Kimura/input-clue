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

/**
 * 単語選択
 * @param {string} word 
 */
export const onWordClick = word => ({
  type: actionTypes.SELECT_WORD,
  word,
});
