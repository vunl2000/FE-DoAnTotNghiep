import {
  AllDispatchProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
  DELETE_TO_CART,
  CHANGE_HEART,
  CLEAR_PRODUCTS,
  CLEAR_ALL_PRODUTS,
  UPDATE_TO_CART,
  INCREASE_QUANTITY,
  SELECT_BILL_CART,
  SELECT_ALL_CART,
  DECREASE_QUANTITY,
  AD_LIST_ID_HEART,
  AD_ITEM_ID_HEART,
  RM_ITEM_ID_HEART,
  COUNT_VIEW_PRODUCT,
} from './types';
import {
  API_URL,
  API_URL_GETALL_PRODUCT,
  BY_VIEW_PRODUCTS,
  COUNT_HEART,
  GET_HEART,
  MINES_HEART,
} from '@env';
import axios from 'axios';
import {returnErrors} from './errActions';

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
    type: UPDATE_TO_CART,
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
    type: INCREASE_QUANTITY,
    payload: {id},
  };
}
export function changeSelectCart(id: any) {
  return {
    type: SELECT_BILL_CART,
    payload: {
      id,
    },
  };
}
export function slectedAllCart() {
  return {
    type: SELECT_ALL_CART,
    payload: null,
  };
}
export function decreaseQuantity(id: any) {
  return {
    type: DECREASE_QUANTITY,
    payload: {
      id,
    },
  };
}
export const getHeartUser =
  (token: any, id: any) => async (dispatch: AllDispatchProps) => {
    if (token !== '' && token !== null) {
      let data = JSON.stringify({
        idUser: id,
      });

      await axios({
        method: 'POST',
        url: API_URL + GET_HEART,
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => {
          let data = res.data;
          let getData: any = data.result;

          dispatch({type: AD_LIST_ID_HEART, payload: getData});

          getData.forEach((val: any) => {
            let idProduct = val.idProduct;
            dispatch(changeHeart(idProduct, true));
          });
          console.log('load heart succes');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

export const minuesHeart =
  (item: any, token: any, id: any, idHeart: any) =>
  async (dispatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idUser: id,
      idHeart: idHeart,
      idProduct: item._id,
    });

    await axios({
      method: 'POST',
      url: API_URL + MINES_HEART,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data = res.data;
        if (data.message === 'Success') {
          console.log('min heart');
          dispatch(changeHeart(item._id, false));
          dispatch({type: RM_ITEM_ID_HEART, payload: idHeart});
          return true;
        } else {
          return false;
        }
      })
      .catch((err: any) => {
        console.log(err);
        return false;
      });
  };

export const countHeart =
  (item: any, token: any, id: any) => async (dispatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idUser: id,
      idProduct: item._id,
    });

    await axios({
      method: 'POST',
      url: API_URL + COUNT_HEART,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data: any = res.data;
        if (data.message === 'Success') {
          dispatch(changeHeart(item._id, true));
          dispatch({type: AD_ITEM_ID_HEART, payload: data.result});
          console.log('add heart');
          return true;
        } else {
          return false;
        }
      })
      .catch((err: any) => {
        console.log(err);
        return false;
      });
  };

export function changeHeart(id: any, val: boolean) {
  return {
    type: CHANGE_HEART,
    payload: {
      id,
      val,
    },
  };
}
export const countView = (id: any) => async (dispatch: AllDispatchProps) => {
  let data = JSON.stringify({
    mIdProduct: id,
  });
  await axios({
    method: 'POST',
    url: API_URL + BY_VIEW_PRODUCTS,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  })
    .then(res => {
      let data: any = res.data;
      if (data.message === 'Success') {
        return dispatch({type: COUNT_VIEW_PRODUCT, payload: id});
      }
      if (data.message === 'Error') {
        return;
      }
    })
    .catch(err => console.log(err));
};
export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS,
  };
}

export function clearAllCart() {
  return {
    type: CLEAR_ALL_PRODUTS,
  };
}
