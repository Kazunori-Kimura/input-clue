import { combineReducers } from 'redux';
import translate from './translate';
import dictionary from './dictionary';

const reducer = combineReducers({
  translate,
  dictionary,
});

export default reducer;
