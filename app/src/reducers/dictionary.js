import * as actionTypes from '../utils/actionTypes';

const initialState = {
  data: null,
  error: null,
  requesting: false,
};

const dictionary = (state = initialState, action) => {
  if (action.type === actionTypes.FETCH_DICTIONARY_START) {
    // 開始
    return {
      ...state,
      requesting: true,
    };
  } else if (action.type === actionTypes.FETCH_DICTIONARY_SUCCEEDED) {
    // 成功
    return {
      ...state,
      error: null,
      requesting: false,
    };
  } else if (action.type === actionTypes.FETCH_DICTIONARY_FAILED) {
    // 失敗
    return {
      ...state,
      error: action.payload.error,
      requesting: false,
    };
  } else {
    return state;
  }
};

export default dictionary;
