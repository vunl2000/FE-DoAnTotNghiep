import {API_URL, API_GET_ALL_BANNER} from '@env';
import axios from 'axios';
import {OPEN_APP, AllDispatchProps, BANNER_APP} from './types';

export const openApp = () => {
  return {
    type: OPEN_APP,
  };
};

export const getBanner = () => async (dishpatch: AllDispatchProps) => {
  await axios({
    method: 'GET',
    url: API_URL + API_GET_ALL_BANNER,
    headers: {},
  })
    .then(res => dishpatch({type: BANNER_APP, payload: res.data}))
    .catch(err => {});
};
