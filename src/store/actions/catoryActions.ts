import {AllDispatchProps, CLEAR_ERRORS} from './types';
import {
  LOADING_CATORY,
  LOADING_CATORY_SUCCES,
  LOADING_CATORY_ERR,
  LOADING_CATORY_MEN,
  LOADING_CATORY_MEN_SUCCES,
  LOADING_CATORY_MEN_ERR,
  LOADING_CATORY_WOMEN,
  LOADING_CATORY_WOMEN_SUCCES,
  LOADING_CATORY_WOMEN_ERR,
  LOADING_CATORY_ACCESSORY,
  LOADING_CATORY_ACCESSORY_SUCCES,
  LOADING_CATORY_ACCESSORY_ERR,
} from '../actions/types';
import axios from 'axios';
import {API_URL, GET_CATORY} from '@env';
import {returnErrors} from './errActions';

export const loadCatory =
  () => async (dispatch: AllDispatchProps, getState: any) => {
    dispatch({type: LOADING_CATORY, payload: null});
    if (!getState.accessory) {
      await axios({
        method: 'GET',
        url: API_URL + GET_CATORY,
        headers: {},
      })
        .then(response => {
          dispatch({type: CLEAR_ERRORS, payload: null});
          dispatch({type: LOADING_CATORY_SUCCES, payload: response.data});
        })
        .catch(error => {
          dispatch({type: LOADING_CATORY_ERR, payload: null});
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              'LOADING_CATORY_ERR',
            ),
          );
        });
    } else {
      dispatch({type: LOADING_CATORY_SUCCES, payload: getState.accessory});
    }
  };
