import axios from 'axios';
import {
  AllDispatchProps,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_COMMUNE,
} from './types';
import {API_PROVINCE} from '@env';
import {returnErrors} from './errActions';

export const loadProvince = () => async (dispatch: AllDispatchProps) => {
  //dispatch({type: GET_PROVINCE, payload: null});

  //Load product form url
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
