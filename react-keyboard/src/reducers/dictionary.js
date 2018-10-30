// 辞書データ管理
import {
  LOAD_DICTIONARY_START, LOAD_DICTIONARY_SUCCEEDED, LOAD_DICTIONARY_FAILED,
} from '../actions';

const initialState = {
  error: null,
  requesting: false,
};

const dictionary = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DICTIONARY_START:
      return {
        ...state,
        requesting: true,
      };
    case LOAD_DICTIONARY_SUCCEEDED:
      return {
        ...state,
        requesting: false,
        error: null,
      };
    case LOAD_DICTIONARY_FAILED:
      return {
        ...state,
        error: action.payload.error,
        requesting: false,
      };
    default:
      return { ...state };
  }
};

export default dictionary;
