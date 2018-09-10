import * as actionTypes from '../utils/actionTypes';

const initialState = {
  word: '',
  list: [],
  requesting: false,
  error: null,
};

const translate = (state = initialState, action) => {
  if (action.type === actionTypes.UPDATE_WORD) {
    // 更新
    return {
      ...state,
      word: action.word,
    };
  } else if (action.type === actionTypes.TRANSLATE_WORD_START) {
    // 翻訳開始
    return {
      ...state,
      list: [],
      requesting: true,
      error: null,
    };
  } else if (action.type === actionTypes.TRANSLATE_WORD_SUCCEEDED) {
    // 成功
    const { list } = action.payload;
    return {
      ...state,
      list,
      requesting: false,
      error: null,
    };
  } else if (action.type === actionTypes.TRANSLATE_WORD_FAILED) {
    // 失敗
    const { error } = action.payload;
    return {
      ...state,
      list: [],
      requesting: false,
      error,
    };
  } else if (action.type === actionTypes.SELECT_WORD) {
    // 選択
    return {
      ...state,
      word: action.word,
    };
  } else {
    return state;
  }
};

export default translate;
