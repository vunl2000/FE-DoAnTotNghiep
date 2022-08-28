import {
  AllDispatchProps,
  LOG_LOADING,
  CLEAR_ERRORS,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT_SUCCES,
} from './types';

import { API_URL_LOGIN_USERS } from '@env';
import axios from 'axios';
import { returnErrors } from './errActions';
// Load products
export const userLogins =
  ({ email, password }: any) =>
    async (dispatch: AllDispatchProps, getState: any) => {
      dispatch({ type: LOG_LOADING, payload: null });

      //Load user form url

      const mFormData = JSON.stringify({ email, password });
      console.log(API_URL_LOGIN_USERS);
      axios({
        method: 'POST',
        url: API_URL_LOGIN_USERS,
        data: mFormData,
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => {
          dispatch({ type: CLEAR_ERRORS, payload: null });
          dispatch({ type: LOGIN_SUCCES, payload: response.data });
          console.log(response.data + 'okii');
        })
        .catch(error => {
          dispatch({ type: LOGIN_FAIL, payload: null });
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

export const userLoginsGoogle =
  (mTokenGoogle: any) => async (dispatch: AllDispatchProps, getState: any) => {
    dispatch({ type: LOG_LOADING, payload: null });

    //Load user form url

    const mFormData = JSON.stringify({ tokenUserGoogle: mTokenGoogle });

    axios({
      method: 'POST',
      url: "http://52.141.50.48:3000/account-user/login-user-google",
      data: mFormData,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        dispatch({ type: CLEAR_ERRORS, payload: null });
        dispatch({ type: LOGIN_SUCCES, payload: response.data });
        console.log(response.data);

      })
      .catch(error => {
        dispatch({ type: LOGIN_FAIL, payload: null });
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
export const userLoginsFaceBook =
  (mTokenFaceBook: any) =>
    async (dispatch: AllDispatchProps, getState: any) => {
      dispatch({ type: LOG_LOADING, payload: null });

      //Load user form url
      const mFormData = JSON.stringify({ mTokenUserFacebook: mTokenFaceBook });

      axios({
        method: 'POST',
        url: "http://52.141.50.48:3000/account-user/login-user-facebook",
        data: mFormData,
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          dispatch({ type: CLEAR_ERRORS, payload: null });
          dispatch({ type: LOGIN_SUCCES, payload: response.data });
          console.log(response.data);

        })
        .catch(error => {
          dispatch({ type: LOGIN_FAIL, payload: null });
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

export const logOut = () => async (dispatch: AllDispatchProps) => {
  console.log('goi den chua');

  return dispatch({
    type: LOGOUT_SUCCES,
    payload: null,
  });
};




// keytool -exportcert -alias YOUR_RELEASE_KEY_ALIAS -keystore YOUR_RELEASE_KEY_PATH | openssl sha1 -binary | openssl base64

// keytool -exportcert -alias my-key-alias -keystore myKey.keystore | C:\Users\Admin\Downloads\bin\openssl.exe sha1 -binary | C:\Users\Admin\Downloads\bin\openssl.exe base64


// keytool -exportcert -alias my-key-alias -keystore myKey.keystore | C:\Users\Admin\Downloads\bin\openssl.exe sha1 -binary | C:\Users\Admin\Downloads\bin\openssl.exe base64

