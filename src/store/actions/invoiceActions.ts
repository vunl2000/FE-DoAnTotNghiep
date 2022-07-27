import {API_GET_BILL_USER, API_URL} from '@env';
import {AllDispatchProps} from './types';
import {
  LOADED_INVOICE_USER,
  LOADED_INVOICE_DETAIL_USER,
  LOADED_INVOICE_ERR,
} from './../actions/types';
import axios from 'axios';
import store from '..';

const auth: any = store.getState().account.result[0];

const tokenCover: any = store.getState().account.token;

const token: string = `Bearer ${tokenCover}`;

export const loadInvoiceUser =
  (userID: any) => async (dishpatch: AllDispatchProps) => {
    let data = JSON.stringify({
      idUser: userID.toString(),
    });
    if (auth != null) {
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
