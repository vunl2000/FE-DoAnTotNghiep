import {
  API_GET_BILL_USER,
  API_URL,
  RATE_PRODUCT,
  RATE_START_PRODUCT,
} from '@env';
import {AllDispatchProps, RATE_CLEAR} from './types';
import {
  LOADED_INVOICE_USER,
  LOADED_INVOICE_DETAIL_USER,
  LOADED_INVOICE_ERR,
  INVOICE_CLEAR,
  RATE_ALL_PRODUCT,
  RATE_STARTS_PRODUCT,
  RATE_COMENTS_PRODUCT,
} from './../actions/types';
import axios from 'axios';

export const loadInvoiceUser =
  (userID: any, token: any) => async (dishpatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idUser: userID.toString(),
    });
    if (token != null) {
      await axios({
        method: 'POST',
        url: API_URL + API_GET_BILL_USER,
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => {
          dishpatch({type: LOADED_INVOICE_USER, payload: res.data});
        })
        .catch(err => {
          dishpatch({type: LOADED_INVOICE_ERR, payload: null});
        });
    } else {
      dishpatch({type: LOADED_INVOICE_ERR, payload: null});
    }
  };

export const clearInvoice = () => {
  return {
    type: INVOICE_CLEAR,
  };
};

//Rate Actions
export const getAllRate =
  (idPd: any) => async (dishpatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idProduct: idPd,
    });

    await axios({
      method: 'POST',
      url: API_URL + RATE_PRODUCT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data: any = res.data;
        if (data.message === 'Success') {
          dishpatch({type: RATE_ALL_PRODUCT, payload: data.result});
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      });
  };

export const getAllRateStart =
  (idPd: any) => async (dishpatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idProduct: idPd,
    });

    await axios({
      method: 'POST',
      url: API_URL + RATE_START_PRODUCT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data: any = res.data;
        if (data.message === 'Success') {
          let sumStar,
            lengthStar,
            isStar,
            small,
            larger,
            fit = 0;

          sumStar =
            data.results.lengthStarts_1 * 1 +
            data.results.lengthStarts_2 * 2 +
            data.results.lengthStarts_3 * 3 +
            data.results.lengthStarts_4 * 4 +
            data.results.lengthStarts_5 * 5;

          lengthStar =
            data.results.lengthStarts_1 +
            data.results.lengthStarts_2 +
            data.results.lengthStarts_3 +
            data.results.lengthStarts_4 +
            data.results.lengthStarts_5;

          isStar = Math.round((sumStar / lengthStar) * 10) / 10;

          small =
            (data.results.lengthStarts_1 + data.results.lengthStarts_2) /
            lengthStar;
          larger =
            (data.results.lengthStarts_3 + data.results.lengthStarts_3) /
            lengthStar;
          fit = data.results.lengthStarts_5 / lengthStar;

          dishpatch({
            type: RATE_STARTS_PRODUCT,
            payload: {
              data: data.results,
              isStart: isStar,
              small: small,
              large: larger,
              fit: fit,
            },
          });

          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      });
  };

export const clearRateComent = () => {
  return {
    type: RATE_CLEAR,
  };
};
