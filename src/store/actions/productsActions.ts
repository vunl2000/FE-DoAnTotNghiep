import {AllDispatchProps, lOADING_PRODUCT, LOADED_PRODUCT} from './types';
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
