import {combineReducers} from 'redux';
import errReducer from './errReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  product: productReducer,
  err: errReducer,
  account: loginReducer,
});
