import {API_GET_BILL_USER, API_URL} from '@env';
import {AllDispatchProps} from './types';
import {
  LOADED_INVOICE_USER,
  LOADED_INVOICE_DETAIL_USER,
  LOADED_INVOICE_ERR,
  INVOICE_CLEAR,
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
