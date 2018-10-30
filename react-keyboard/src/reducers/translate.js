import {
  TRANSLATE_WORD_START, TRANSLATE_WORD_SUCCEEDED, TRANSLATE_WORD_FAILED,
} from '../actions';

const initialState = {
  list: [],
  requesting: false,
  error: null,
};

const translate = (state = initialState, action) => {
  switch (action.type) {
    case TRANSLATE_WORD_START:
      return {
        ...state,
        list: [],
        requesting: true,
        error: null,
      };
    case TRANSLATE_WORD_SUCCEEDED:
      return {
        ...state,
        list: action.payload.list,
        requesting: false,
        error: null,
      };
    case TRANSLATE_WORD_FAILED:
      return {
        ...state,
        list: [],
        requesting: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};

export default translate;
