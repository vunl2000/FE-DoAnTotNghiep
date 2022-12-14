import {combineReducers} from 'redux';
import errReducer from './errReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

import firstOpenReducer from './fristOpenReducer';
import addressReducer from './addressReducer';
import catoryReducer from './catoryReducer';

export default combineReducers({
  product: productReducer,
  err: errReducer,
  account: loginReducer,
  register: registerReducer,
  firstOpen: firstOpenReducer,
  address: addressReducer,
  catory: catoryReducer,
});
