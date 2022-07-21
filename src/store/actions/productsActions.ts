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
  await axios({
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
export function updateCart(payload: any) {
  return {
    type: 'UPDATE_CART',
    payload,
  };
}
export function deleteCart(payload: any) {
  return {
    type: 'DELETE_CART',
    payload,
  };
}

export function increaseQuantity(id: any) {
  return {
    type: 'INCREASE_QUANTITY',
    payload: {
      id,
    },
  };
}
export function changeSelectCart(id: any) {
  return {
    type: 'SELECT_BILL_CART',
    payload: {
      id,
    },
  };
}
export function slectedAllCart() {
  return {
    type: 'SELECT_ALL_CART',
    payload: null,
  };
}
export function decreaseQuantity(id: any) {
  return {
    type: 'DECREASE_QUANTITY',
    payload: {
      id,
    },
  };
}
