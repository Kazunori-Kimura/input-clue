// --- ACTION_TYPE ---
/**
 * 辞書の読み込み
 */
export const LOAD_DICTIONARY = 'LOAD_DICTIONARY';
export const LOAD_DICTIONARY_START = 'LOAD_DICTIONARY_START';
export const LOAD_DICTIONARY_SUCCEEDED = 'LOAD_DICTIONARY_SUCCEEDED';
export const LOAD_DICTIONARY_FAILED = 'LOAD_DICTIONARY_FAILED';
export const RESET_DICTIONARY_STATUS = 'RESET_DICTIONARY_STATUS';

/**
 * 翻訳
 */
export const TRANSLATE_WORD = 'TRANSLATE_WORD';
export const TRANSLATE_WORD_START = 'TRANSLATE_WORD_START';
export const TRANSLATE_WORD_SUCCEEDED = 'TRANSLATE_WORD_SUCCEEDED';
export const TRANSLATE_WORD_FAILED = 'TRANSLATE_WORD_FAILED';
export const CLEAR_TRANSLATE_LIST = 'CLEAR_TRANSLATE_LIST';

// --- ACTION_CREATOR ---

export const translateWord = payload => ({
  type: TRANSLATE_WORD,
  payload,
});

export const translateWordStart = () => ({
  type: TRANSLATE_WORD_START,
});

export const translateWordSucceeded = payload => ({
  type: TRANSLATE_WORD_SUCCEEDED,
  payload,
});

export const translateWordFailed = payload => ({
  type: TRANSLATE_WORD_FAILED,
  payload,
});

export const clearTranslateList = () => ({
  type: CLEAR_TRANSLATE_LIST,
});

export const loadDictionary = payload => ({
  type: LOAD_DICTIONARY,
  payload,
});

export const loadDictionaryStart = () => ({
  type: LOAD_DICTIONARY_START,
});

export const loadDictionarySucceeded = payload => ({
  type: LOAD_DICTIONARY_SUCCEEDED,
  payload,
});

export const loadDictionaryFailed = payload => ({
  type: LOAD_DICTIONARY_FAILED,
  payload,
});

export const resetDictionaryStatus = () => ({
  type: RESET_DICTIONARY_STATUS,
});
