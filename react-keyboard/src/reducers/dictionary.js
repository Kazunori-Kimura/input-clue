// 辞書データ管理
import {
  LOAD_DICTIONARY_START, LOAD_DICTIONARY_SUCCEEDED, LOAD_DICTIONARY_FAILED,
  RESET_DICTIONARY_STATUS,
} from '../actions';

const initialState = {
  error: null,
  succeeded: false,
  requesting: false,
};

const dictionary = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DICTIONARY_START:
      return {
        ...state,
        succeeded: false,
        requesting: true,
      };
    case LOAD_DICTIONARY_SUCCEEDED:
      return {
        ...state,
        requesting: false,
        succeeded: true,
        error: null,
      };
    case LOAD_DICTIONARY_FAILED:
      return {
        ...state,
        error: action.payload.error,
        succeeded: false,
        requesting: false,
      };
    case RESET_DICTIONARY_STATUS:
      return initialState;
    default:
      return { ...state };
  }
};

export default dictionary;
