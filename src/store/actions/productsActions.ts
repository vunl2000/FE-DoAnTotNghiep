import {
  AllDispatchProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
  DELETE_TO_CART,
  CHANGE_HEART,
  CLEAR_PRODUCTS,
  CLEAR_ALL_PRODUTS,
} from './types';
import {API_URL, API_URL_GETALL_PRODUCT, GET_HEART} from '@env';
import axios from 'axios';
import {returnErrors} from './errActions';
import store from '..';
// Load products

export const loadProducts = () => async (dispatch: AllDispatchProps) => {
  dispatch({type: lOADING_PRODUCT, payload: null});

  await axios({
    method: 'GET',
    url: API_URL_GETALL_PRODUCT,
  })
    .then(res => {
      let data = res.data;
      let newData = data.result.map((item: any) => ({
        ...item,
        heart_active: false,
      }));
      dispatch({type: LOADED_PRODUCT, payload: newData});
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
export function deleteCart(id: any) {
  return {
    type: DELETE_TO_CART,
    payload: {id},
  };
}

export function increaseQuantity(id: any) {
  return {
    type: 'INCREASE_QUANTITY',
    payload: {id},
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

export function changeHeart(id: any) {
  return {
    type: 'CHANGE_HEART',
    payload: {
      id,
    },
  };
}

export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL_PRODUTS,
  };
}
