import {combineReducers} from 'redux';
import errReducer from './errReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';
import firstOpenReducer from './fristOpenReducer';
import addressReducer from './addressReducer';

export default combineReducers({
  product: productReducer,
  err: errReducer,
  account: loginReducer,
  firstOpen: firstOpenReducer,
  address: addressReducer,
});
