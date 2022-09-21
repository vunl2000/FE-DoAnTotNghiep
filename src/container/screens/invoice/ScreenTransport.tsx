import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TypeBill} from '../../../store/actions/types';
import {API_GET_BILL_DETAIL_USER, API_URL} from '@env';
import axios from 'axios';
import InvoiceItem from '../../../components/invoice/InvoiceItem';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import image from '../../../res/require/Images';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';

type Props = {};

const ScreenTransport = (props: Props) => {
  const [error, setError] = useState<any>(false);
  const [listBill, setListBill] = useState<TypeBill[]>([]);
  const [listBillDetail, setListBillDetail] = useState<any[]>([]);
  const {listInvoice} = useSelector((state: any) => state.invoice);
  const accounts = useSelector((state: any) => state.account);
  const {goBack, navigate}: any = useNavigation();

  const gotoDetail = (data: any) => {
    navigate(NameScreen.DETAIL_INVOICE, {
      billDetail: data,
    });
  };
  const getData = async (token: string, idBill: any) => {
    let data = JSON.stringify({
      idBill: idBill.toString(),
    });

    await axios({
      method: 'POST',
      url: API_URL + API_GET_BILL_DETAIL_USER,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(res => {
        let resData = res.data;
        let itemDetail: any = {};
        itemDetail = resData.result;
        itemDetail['billDetails'] = resData.billDetails;
        setListBillDetail(prev => [...prev, itemDetail]);
        setError(false);
      })
      .catch(err => {
        setError(true);
        console.log(err);
      });
  };

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

      listBill.forEach((item: TypeBill) => {
        getData(`Bearer ${token}`, item._id);
      });
    }
  }, [listBill]);
  const renderItem = ({item, index}: any) => (
    <InvoiceItem
      item={item}
      index={index}
      onPress={gotoDetail}
      onpenDialog={() => {}}
      type={false}
    />
  );

  const keyExtractor = (item: any) => item._id;

  const Exception = () => (
    <View style={styles.exception}>
      <Text style={styles.textPlaholder}>
        {error ? 'Đã xảy ra lỗi, vui lòng thử lại sau' : 'Không có đơn nào'}
      </Text>
      <View style={styles.spaceY} />
      <Image
        source={error ? image.error : image.box_empty}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );
  return (
    <View style={styles.container}>
      {listBillDetail.length > 0 ? (
        <FlatList
          data={listBillDetail}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          scrollEventThrottle={32}
          listKey="transport-bill"
        />
      ) : (
        <Exception />
      )}
    </View>
  );
};

export default ScreenTransport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '35%',
    height: '45%',
  },
  exception: {
    paddingVertical: sizes._18sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  spaceY: {
    height: sizes._18sdp,
  },
});
