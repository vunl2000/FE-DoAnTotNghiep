import {
  AllDispatchProps,
  LOG_LOADING,
  CLEAR_ERRORS,
  LOGIN_SUCCES,
  REGISTER_FAIL,
} from './types';

import { API_URL_LOGIN_USERS } from '@env';
import axios from 'axios';
import {returnErrors} from './errActions';
// Load products
export const userLogins =
  ({email, password}: any) =>
  async (dispatch: AllDispatchProps, getState: any) => {
    dispatch({type: LOG_LOADING, payload: null});

    //Load user form url

    const mFormData = JSON.stringify({email, password});

    axios({
      method: 'POST',
      url: API_URL_LOGIN_USERS,
      data: mFormData,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({type: LOGIN_SUCCES, payload: response.data});
        // console.log('Cac', response.data);

        // console.log('', 'Login Succes');
      })
      .catch(error => {
        dispatch({type: REGISTER_FAIL, payload: null});
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            'LOGIN_FAIL',
          ),
        );
        // console.log('Lỗi', error.response.data);
      });
  };
