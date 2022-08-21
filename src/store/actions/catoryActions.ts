import {AllDispatchProps, CLEAR_ERRORS, LOAD_COLORS, LOAD_SIZES} from './types';
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
import {API_URL, GET_CATORY, GET_CATORY_TYPE, GET_COLOR, GET_SIZE} from '@env';
import {returnErrors} from './errActions';

export const loadCatory = () => async (dispatch: AllDispatchProps) => {
  dispatch({type: LOADING_CATORY, payload: null});
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
};

export const loadAll =
  (id: string | any) => async (dispatch: AllDispatchProps) => {
    dispatch({type: LOADING_CATORY_ACCESSORY, payload: null});
    const data = JSON.stringify({
      idTypeProduct: id,
    });
    await axios({
      method: 'POST',
      url: API_URL + GET_CATORY_TYPE,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(response => {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({
          type: LOADING_CATORY_ACCESSORY_SUCCES,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({type: LOADING_CATORY_ACCESSORY_ERR, payload: null});
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            'LOADING_CATORY_ERR',
          ),
        );
      });
  };

export const loadMen =
  (id: string | any) => async (dispatch: AllDispatchProps, getState: any) => {
    dispatch({type: LOADING_CATORY_MEN, payload: null});
    if (!getState.men) {
      const data = JSON.stringify({
        idTypeProduct: id,
      });
      await axios({
        method: 'POST',
        url: API_URL + GET_CATORY_TYPE,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(response => {
          dispatch({type: CLEAR_ERRORS, payload: null});
          dispatch({type: LOADING_CATORY_MEN_SUCCES, payload: response.data});
        })
        .catch(error => {
          dispatch({type: LOADING_CATORY_MEN_ERR, payload: null});
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              'LOADING_CATORY_ERR',
            ),
          );
        });
    } else {
      dispatch({type: LOADING_CATORY_MEN_SUCCES, payload: getState.accessory});
    }
  };

export const loadWomen =
  (id: string | any) => async (dispatch: AllDispatchProps, getState: any) => {
    dispatch({type: LOADING_CATORY_WOMEN, payload: null});
    if (!getState.women) {
      const data = JSON.stringify({
        idTypeProduct: id,
      });
      await axios({
        method: 'POST',
        url: API_URL + GET_CATORY_TYPE,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(response => {
          dispatch({type: CLEAR_ERRORS, payload: null});
          dispatch({type: LOADING_CATORY_WOMEN_SUCCES, payload: response.data});
        })
        .catch(error => {
          dispatch({type: LOADING_CATORY_WOMEN_ERR, payload: null});
          dispatch(
            returnErrors(
              error.response.data,
              error.response.status,
              'LOADING_CATORY_ERR',
            ),
          );
        });
    } else {
      dispatch({
        type: LOADING_CATORY_WOMEN_SUCCES,
        payload: getState.accessory,
      });
    }
  };

export const loadSizes = () => async (dispatch: AllDispatchProps) => {
  await axios({
    method: 'GET',
    url: API_URL + GET_SIZE,
  })
    .then(res => {
      let data = res.data;
      dispatch({type: LOAD_SIZES, payload: data.result});
    })
    .catch(err => {
      console.log(err);
    });
};
export const loadColors = () => async (dispatch: AllDispatchProps) => {
  await axios({
    method: 'GET',
    url: API_URL + GET_COLOR,
  })
    .then(res => {
      let data = res.data;
      dispatch({type: LOAD_COLORS, payload: data.result});
    })
    .catch(err => {
      console.log(err);
    });
};
