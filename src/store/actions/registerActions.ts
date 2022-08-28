import {
  AllDispatchProps,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REG_LOADING,
  REGISTER_SUCCES,
  CLEAR_REGISTER,
} from './types';

import { API_URL_REGISTER_USERS } from '@env';
import axios from 'axios';
import { returnErrors } from './errActions';

export const userRegister =
  ({ name, croppedImage, phone, email, password, passwordConfirm }: any) =>
    async (dispatch: AllDispatchProps, getState: any) => {
      dispatch({ type: REG_LOADING, payload: null });
      const mFormData = new FormData();
      const mFormDataNoImg = new FormData();
      if (croppedImage != null) {
        mFormData.append('name', name);
        mFormData.append('croppedImage', {
          name: new Date() + '_profile',
          uri: croppedImage,
          type: 'image/jpg',
        });
        mFormData.append('phone', phone);
        mFormData.append('email', email);
        mFormData.append('password', password);
        mFormData.append('passwordConfirm', passwordConfirm);

        console.log('form data', mFormData);
      } else {
        mFormData.append('name', name);
        mFormData.append('phone', phone);
        mFormData.append('email', email);
        mFormData.append('password', password);
        mFormData.append('passwordConfirm', passwordConfirm);

        console.log('form data', mFormData);
      }

      await axios({
        method: 'POST',
        url: API_URL_REGISTER_USERS,
        //  url:  "http://192.168.254.1:3000/account-user/register-user",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: mFormData,
      })
        .then(response => {
          dispatch({ type: CLEAR_ERRORS, payload: null });
          dispatch({ type: REGISTER_SUCCES, payload: response.data });
          console.log('Cac', response.data);

          console.log('', 'Register Succes');
        })
        .catch(error => {
          dispatch({ type: REGISTER_FAIL, payload: null });
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              'REGISTER_FAIL',
            ),
          );
        });
    };

export function removerRegister() {
  return {
    type: CLEAR_REGISTER,
    payload: null,
  };
}
