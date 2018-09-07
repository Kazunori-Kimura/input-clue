import * as actionTypes from '../utils/actionTypes';

const initialState = {
  data: null,
  status: null,
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
      data: action.payload.data,
      status: action.payload.status,
      error: null,
      requesting: false,
    };
  } else if (action.type === actionTypes.FETCH_DICTIONARY_FAILED) {
    // 失敗
    return {
      ...state,
      data: null,
      status: 400,
      error: action.payload.error,
      requesting: false,
    };
  } else {
    return state;
  }
};

export default dictionary;
