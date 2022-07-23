// Auth Types
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADER = 'USER_LOADER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCES = 'LOGIN_SUCCES';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCES = 'LOGOUT_SUCCES';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const REG_LOADING = 'REG_LOADING';
export const REGISTER_SUCCES = 'REGISTER_SUCCES';
export const REGISTER_FAIL = 'USER_LOADING';
export const LOG_LOADING = 'USER_LOADING';

//Product Types
export const SENDING_PRODUCT = 'SENDING_PRODUCT';
export const lOADING_PRODUCT = 'lOADING_PRODUCT';
export const SENT_PRODUCT = 'SENT_PRODUCT';
export const LOADED_PRODUCT = 'LOADED_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

//Cart Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const UPDATE_TO_CART = 'UPDATE_TO_CART';
export const CHANGE_SELECT_CART = 'SELECT_BILL_CART';
export const SELECT_ALL_CART = 'SELECT_ALL_CART';
export const DELETE_TO_CART = 'DELETE_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

//Error Types
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

//Local Strogae
export const OPEN_APP = 'CLEAR_ERRORS';

//ADDRESS TYPES
export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_DISTRICT = 'GET_DISTRICT';
export const GET_COMMUNE = 'GET_COMMUNE';

//Catory Types
export const LOADING_CATORY = 'LOADING_CATORY';
export const LOADING_CATORY_SUCCES = 'LOADING_CATORY_SUCCES';
export const LOADING_CATORY_ERR = 'LOADING_CATORY_ERR';
export const LOADING_CATORY_MEN = 'LOADING_CATORY_MEN';
export const LOADING_CATORY_MEN_SUCCES = 'LOADING_CATORY_MEN_SUCCES';
export const LOADING_CATORY_MEN_ERR = 'LOADING_CATORY_MEN_ERR';
export const LOADING_CATORY_WOMEN = 'LOADING_CATORY_WOMEN';
export const LOADING_CATORY_WOMEN_SUCCES = 'LOADING_CATORY_WOMEN_SUCCES';
export const LOADING_CATORY_WOMEN_ERR = 'LOADING_CATORY_WOMEN_ERR';
export const LOADING_CATORY_ACCESSORY = 'LOADING_CATORY_ACCESSORY';
export const LOADING_CATORY_ACCESSORY_SUCCES =
  'LOADING_CATORY_ACCESSORY_SUCCES';
export const LOADING_CATORY_ACCESSORY_ERR = 'LOADING_CATORY_ACCESSORY_ERR';

//Action Props
export type ActionProps = {
  type: any;
  payload: any | void;
};

//Dispath Props
export type AllDispatchProps = (arg0: {type: any; payload: any | void}) => void;
