import {
  AllDispatchProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
} from './types';
import {API_URL_GETALL_PRODUCT} from '@env';
import axios from 'axios';
import {returnErrors} from './errActions';
// Load products
export const loadProducts = () => async (dispatch: AllDispatchProps) => {
  dispatch({type: lOADING_PRODUCT, payload: null});

  //Load product form url
  axios({
    method: 'GET',
    url: API_URL_GETALL_PRODUCT,
  })
    .then(res => {
      dispatch({type: LOADED_PRODUCT, payload: res.data});
    })
    .catch(err => {
      dispatch(
        returnErrors(err.respon.code, err.respon.message, 'LOAD_PRODUCT_FAIL'),
      );
    });
};

export const addToCart = (item: any, size: any, color: any) => {
  return {
    type: ADD_TO_CART,
    payload: {
      item,
      size: size,
      color: color,
    },
  };
};
export function UpdateCart(payload: any) {
  return {
    type: 'UPDATE_CART',
    payload,
  };
}
export function DeleteCart(payload: any) {
  return {
    type: 'DELETE_CART',
    payload,
  };
}

export function IncreaseQuantity(payload: any) {
  return {
    type: 'INCREASE_QUANTITY',
    payload,
  };
}
export function DecreaseQuantity(payload: any) {
  return {
    type: 'DECREASE_QUANTITY',
    payload,
  };
}
