import { combineReducers } from 'redux';
import errReducer from './errReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import firstOpenReducer from './fristOpenReducer';
import addressReducer from './addressReducer';
import catoryReducer from './catoryReducer';
import billReducer from './billReducer';
import invoiceReducer from './invoiceReducer';
import historyReducer from './historyReducer';
import deviceFBTokenReducer from './deviceFBTokenReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import errCfGmailReducer from './errCfGmailReducer';


export default combineReducers({
  product: productReducer,
  err: errReducer,
  account: loginReducer,
  register: registerReducer,
  firstOpen: firstOpenReducer,
  address: addressReducer,
  catory: catoryReducer,
  bill: billReducer,
  invoice: invoiceReducer,
  itemHistory: historyReducer,
  deviceCall: deviceFBTokenReducer,
  // confirmGmail: forgotPasswordReducer,
});
