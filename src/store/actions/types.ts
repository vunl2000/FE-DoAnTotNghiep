// Auth Types
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADER = 'USER_LOADER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCES = 'LOGIN_SUCCES';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCES = 'LOGOUT_SUCCES';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const CLEAR_REGISTER = 'CLEAR_REGISTER';

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
export const CHANGE_HEART = 'CHANGE_HEART';

//Error Types
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

//Local Strogae
export const OPEN_APP = 'CLEAR_ERRORS';
export const BANNER_APP = 'BANNER_APP';

//ADDRESS TYPES
export const GET_PROVINCE = 'GET_PROVINCE';
export const ADD_LIST_ADDRESS = 'ADD_LIST_ADDRESS';
export const SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS';
//Bill type
export const CREATE_BILL = 'CREATE_BILL';
export const SENDING_DETAIL_BILL = 'SENDING_DETAIL_BILL';
export const RESET_BILL = 'RESET_BILL';
export const CREATE_FAIL = 'CREATE_FAIL';

//Invoice type
export const LOADED_INVOICE_USER = 'LOADED_INVOICE_BY_USER';
export const LOADED_INVOICE_DETAIL_USER = 'LOADED_INVOICE_DETAIL_USER';
export const LOADED_INVOICE_ERR = 'LOADED_INVOICE_ERR';
export const INVOICE_CLEAR = 'INVOICE_CLEAR';

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
export const LOAD_SIZES = 'LOAD_SIZES';
export const LOAD_COLORS = 'LOAD_COLORS';

export const ADD_ITEM_HISTORY = 'ADD_ITEM_HISTORY';
export const CLEAR_ITEM_HISTORY = 'CLEAR_ITEM_HISTORY';
//Action Props
export type ActionProps = {
  type: any;
  payload: any | void;
};

//Dispath Props
export type AllDispatchProps = (arg0: {type: any; payload: any | void}) => void;

//cart
export interface TypeCartItem {
  id: string;
  _id: string;
  code: string;
  titleProduct: string;
  trademark: string;
  qty: number | any;
  imageProduct: string;
  price: number;
  priceSale: number;
  size: string;
  color: string;
  selected: boolean;
}
//product
export interface TypeProductItem {
  _id: string;
  titleProduct: string;
  trademark: string;
  imageProduct: string[];
  descriptionProduct: string;
  heart?: number;
  view?: number;
  comments: number;
  size_product: string[];
  color_product: string[];
  importPrice: number;
  price: number;
  quantity_product: number;
  material_product: string;
  flashSale: string;
  idCategoryProduct: string;
  priceSale: number;
}
//bill
export interface TypeBill {
  numberPhone: string;
  lastName: string;
  firstName: string;
  fullAddress: string;
  cityProvince: string;
  district: string;
  commune: string;
  codeZip: string;
  payment: string;
  idUser: string;
  status?: number;
  _id?: string;
}
//bill detail
export interface TypeBillDetail {
  titleProduct: string;
  trademark: string;
  imageProduct: string;
  sizeProduct: string;
  colorProduct: string;
  code: string;
  price: string;
  quantity: string;
  idBill: string;
  idProduct: string;
}
