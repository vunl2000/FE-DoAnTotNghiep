import {
  API_URL,
  API_CREATE_BILL,
  API_CREATE_BILL_DETAIL,
  GET_TRANSPORT_FEE,
} from '@env';
import {Address} from './../reducer/addressReducer';
import {
  AllDispatchProps,
  TypeBill,
  TypeProductItem,
  TypeCartItem,
} from './types';
import {
  CREATE_BILL,
  SENDING_DETAIL_BILL,
  RESET_BILL,
  CREATE_FAIL,
  GET_SHIP_COD,
} from './../actions/types';
import store from '..';
import axios from 'axios';

const auth: any = store.getState().account.result[0];
const token: any = store.getState().account.token;
const tokenCover: string = `Bearer ${token}`;
export const createBill =
  (item: Address | any, transportFee: any) =>
  async (dishpatch: AllDispatchProps) => {
    if (auth != null) {
      let data = JSON.stringify({
        numberPhone: item.numberPhone,
        lastName: item.lastName,
        firstName: item.firstName,
        fullAddress: item.fullAddress,
        cityProvince: item.cityProvince,
        district: item.district,
        commune: item.commune,
        codeZip: item.codeZip,
        payment: 'Ship COD',
        transportFee: transportFee.toString(),
        idUser: auth._id,
      });

      await axios({
        method: 'POST',
        url: API_URL + API_CREATE_BILL,
        headers: {
          token: tokenCover,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => dishpatch({type: CREATE_BILL, payload: res.data}))
        .catch(() => dishpatch({type: CREATE_FAIL, payload: null}));
    } else {
      dishpatch({type: CREATE_FAIL, payload: null});
    }
  };

export const createBillDetail =
  (bill: TypeBill, product: TypeCartItem) =>
  async (dishpatch: AllDispatchProps) => {
    if (auth != null) {
      let data = JSON.stringify({
        titleProduct: product.titleProduct.toString(),
        trademark: product.trademark.toString(),
        imageProduct: product.imageProduct.toString(),
        sizeProduct: product.size.toString(),
        colorProduct: product.color.toString(),
        code: product.code.toString(),
        price: product.price.toString(),
        quantity: product.qty.toString(),
        idBill: bill._id,
        idProduct: product._id.toString(),
      });
      //console.log(data);

      await axios({
        method: 'POST',
        url: API_URL + API_CREATE_BILL_DETAIL,
        headers: {
          token: tokenCover,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => dishpatch({type: SENDING_DETAIL_BILL, payload: res.data}))
        .catch(() => dishpatch({type: CREATE_FAIL, payload: null}));
    } else {
      dishpatch({type: CREATE_FAIL, payload: null});
    }
  };

export const getTransportFee =
  (latitude: any, longitude: any) => async (dishpatch: AllDispatchProps) => {
    if (auth != null) {
      let data = JSON.stringify({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });

      await axios({
        method: 'POST',
        url: API_URL + GET_TRANSPORT_FEE,
        headers: {
          token: tokenCover,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => {
          let datas: any = res.data;
          //console.log(res.data);
          if (datas.code === 200) {
            dishpatch({type: GET_SHIP_COD, payload: datas.prices});
          }
        })
        .catch(err => {
          //console.log(err);
        });
    } else {
      //console.log('err Token');
    }
  };

export const resetBill = () => {
  return {
    type: RESET_BILL,
    payload: null,
  };
};
