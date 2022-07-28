import {makeId} from './../../utils/Utilities';
import axios from 'axios';
import {
  AllDispatchProps,
  GET_PROVINCE,
  SET_DEFAULT_ADDRESS,
  ADD_LIST_ADDRESS,
} from './types';
import {API_PROVINCE} from '@env';
import {returnErrors} from './errActions';

export const loadProvince = () => async (dispatch: AllDispatchProps) => {
  await axios({
    method: 'GET',
    url: API_PROVINCE,
    headers: {},
  })
    .then(res => {
      dispatch({type: GET_PROVINCE, payload: res.data});
    })
    .catch(err => {
      dispatch(
        returnErrors(err.respon.code, err.respon.message, 'LOAD_PROVINCE_FAIL'),
      );
    });
};

export const addAddress = (item: any, isDefault: boolean | any) => {
  return {
    type: ADD_LIST_ADDRESS,
    payload: {
      item,
      isDefault,
    },
  };
};
export const setDefaultAddress = (id: string | any) => {
  return {
    type: SET_DEFAULT_ADDRESS,
    payload: {
      id,
    },
  };
};
