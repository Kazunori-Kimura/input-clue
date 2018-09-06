import * as actionTypes from '../utils/actionTypes';

const initialState = {
  word: '',
  list: [],
  dictionary: [
    'foo',
    'bar',
    'hoge',
  ],
};

const translate = (state = initialState, action) => {
  if (action.type === actionTypes.UPDATE_WORD) {
    // 更新
    return {
      ...state,
      word: action.word,
    };
  } else if (action.type === actionTypes.TRANSLATE_WORD) {
    // 翻訳
    let list = [];
    if (action.word) {
      list = state.dictionary.filter(item => (item.indexOf(action.word) >= 0));
    }

    return {
      ...state,
      list,
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
