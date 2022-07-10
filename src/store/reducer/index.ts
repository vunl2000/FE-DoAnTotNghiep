import {combineReducers} from 'redux';
import errReducer from './errReducer';
import productReducer from './productReducer';

export default combineReducers({
  product: productReducer,
  err: errReducer,
});
