import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TypeBill} from '../../../store/actions/types';
import {API_GET_BILL_DETAIL_USER, API_URL} from '@env';
import axios from 'axios';

type Props = {};

const ScreenDone = (props: Props) => {
  const [listBill, setListBill] = useState<TypeBill[]>([]);
  const [listBillDetail, setListBillDetail] = useState<any[]>([]);
  const {listInvoice} = useSelector((state: any) => state.invoice);
  const accounts = useSelector((state: any) => state.account);

  useEffect(() => {
    if (listInvoice.length > 0) {
      let billHandle = listInvoice.filter(
        (item: TypeBill) => item.status === 2,
      );
      setListBill(billHandle);
    }
  }, [listInvoice]);

  useEffect(() => {
    if (listBill.length > 0 && accounts.token.length > 0) {
      let token = accounts.token;
      console.log(API_URL + API_GET_BILL_DETAIL_USER);

      listBill.forEach((item: TypeBill) => {
        let data = JSON.stringify({
          idBill: item._id,
        });

        axios({
          method: 'POST',
          url: API_URL + API_GET_BILL_DETAIL_USER,
          headers: {
            token: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data,
        })
          .then(res => {
            let resData = res.data;
            let itemDetail: any = resData.result;
            itemDetail['billDetails'] = resData.billDetails;

            setListBillDetail([...listBillDetail, itemDetail]);
            console.log(itemDetail);
          })
          .catch(err => console.log(err));
      });
    }
  }, [listBill, accounts]);

  return (
    <View>
      <Text>ScreenDone</Text>
    </View>
  );
};

export default ScreenDone;

const styles = StyleSheet.create({});
