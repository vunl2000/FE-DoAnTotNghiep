import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InvoiceItem from '../../../components/invoice/InvoiceItem';
import {TypeBill} from '../../../store/actions/types';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  API_GET_BILL_DETAIL_USER,
  API_URL,
  GET_CANCEL_BILL,
  GET_CATORY,
} from '@env';
import image from '../../../res/require/Images';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Chip,
} from 'react-native-paper';
import {showToast} from '../../../components/modal/ToastCustom';
import Loading from '../../../components/modal/Loading';
import {
  clearInvoice,
  loadInvoiceUser,
} from '../../../store/actions/invoiceActions';

type Props = {};

const ScreenHandle = (props: Props) => {
  const [listBill, setListBill] = useState<TypeBill[]>([]);
  const [listBillDetail, setListBillDetail] = useState<any[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [isLoad, setIsLoad] = useState<any>(false);
  const [reson, setReson] = React.useState<any>(null);
  const [idBill, setIdBill] = React.useState<any>(null);
  const [error, setError] = useState<any>(false);
  const {listInvoice} = useSelector((state: any) => state.invoice);
  const accounts = useSelector((state: any) => state.account);
  const dispatch: any = useDispatch();
  const showDialog = (idBill: any) => {
    setVisible(true);
    setIdBill(idBill);
  };

  const hideDialog = (type: number) => {
    switch (type) {
      case 0:
        setVisible(false);
        setIdBill(null);
        setReson(null);
        break;

      default:
        let check: boolean = true;

        if (!idBill) {
          showToast('Đã có lỗi trong quá trình xử lý!');
          check = false;
        }
        if (!reson) {
          showToast(
            'Chúng tôi cần lý do của bạn để cải thiện dịch vụ! Vui lòng không bỏ trống trường này!',
          );
          check = false;
        }

        if (check) {
          clearBill(
            `Bearer ${accounts.token}`,
            accounts.result[0]._id,
            idBill,
            reson,
          );
        }
        break;
    }
  };

  const {goBack, navigate}: any = useNavigation();

  const gotoDetail = (data: any) => {
    navigate(NameScreen.DETAIL_INVOICE, {
      billDetail: data,
    });
  };

  const clearBill = async (
    token: string,
    idUser: any,
    idBill: any,
    reson: any,
  ) => {
    setIsLoad(true);
    let data = JSON.stringify({
      idUser: idUser.toString(),
      idBill: idBill.toString(),
      reason: reson.toString(),
    });

    await axios({
      method: 'POST',
      url: API_URL + GET_CANCEL_BILL,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          setVisible(false);
          setIdBill(null);
          setReson(null);
          showToast('Hủy đơn hàng thành công!');
          setListBillDetail(
            listBillDetail.filter((val: any) => val._id !== idBill),
          );

          dispatch(
            loadInvoiceUser(accounts.result[0]._id, `Bearer ${accounts.token}`),
          );
        } else {
          setVisible(false);
          setIdBill(null);
          setReson(null);
          showToast('Đã có lỗi xảy ra vui lòng thử lại sau!');
        }
        setIsLoad(false);
      })
      .catch(err => {
        setVisible(false);
        setIdBill(null);
        setReson(null);
        showToast('Đã có lỗi xảy ra vui lòng thử lại sau!');
        setIsLoad(true);
      });
  };

  const getData = async (token: string, idBill: any) => {
    setIsLoad(true);
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
        setIsLoad(false);
      })
      .catch(err => {
        setError(true);
        setIsLoad(false);
        //console.log(err);
      });
  };

  useEffect(() => {
    if (listInvoice.length > 0) {
      let billHandle = listInvoice.filter(
        (item: TypeBill) => item.status === 0,
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
      type={true}
      onpenDialog={showDialog}
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
    <Provider>
      <View style={styles.container}>
        {listBillDetail.length > 0 ? (
          <>
            <FlatList
              data={listBillDetail}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              scrollEventThrottle={32}
              listKey="handle-bill"
            />
            <Portal>
              <Dialog visible={visible} dismissable={false}>
                <Dialog.Title style={styles.textLabel}>Thông báo</Dialog.Title>
                <Dialog.Content>
                  <Text style={styles.textSub}>
                    Bạn có chắc chắn muốn hủy đơn này không?
                  </Text>
                  <View style={styles.spaceY} />
                  <View style={styles.border}>
                    <TextInput
                      placeholder="Lý do bạn muốn hủy đơn"
                      style={styles.textInput}
                      value={reson}
                      autoCapitalize="none"
                      autoCorrect={false}
                      spellCheck={false}
                      multiline
                      placeholderTextColor={ArrayColors._color_un_active}
                      underlineColorAndroid="transparent"
                      onChangeText={(val: any) => setReson(val)}
                    />
                  </View>
                  <View style={styles.spaceY} />
                  <Chip
                    icon="information"
                    onPress={() => setReson('Tôi muốn đặt lại hàng.')}>
                    Tôi muốn đặt lại hàng.
                  </Chip>
                  <View style={styles.spaceY} />
                  <Chip
                    icon="information"
                    onPress={() =>
                      setReson('Tôi không thích màu của sản phẩm này nữa.')
                    }>
                    Tôi không thích màu của sản phẩm này nữa.
                  </Chip>
                  <View style={styles.spaceY} />
                  <Chip
                    icon="information"
                    onPress={() =>
                      setReson(
                        'Tôi rất bận! Có lẽ lần tới tôi sẽ mua nhiều hơn.',
                      )
                    }>
                    Tôi rất bận! Có lẽ lần tới tôi sẽ mua nhiều hơn.
                  </Chip>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => hideDialog(0)}>Hủy bỏ</Button>
                  <Button onPress={() => hideDialog(1)}>Đồng ý</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        ) : (
          <Exception />
        )}
        {isLoad ? <Loading /> : null}
      </View>
    </Provider>
  );
};

export default ScreenHandle;

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
  border: {
    borderWidth: sizes._1sdp,
    borderColor: ArrayColors._color_un_active,
    borderRadius: sizes._5sdp,
  },
  textLabel: {
    fontSize: sizes._22sdp,
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
  textInput: {
    paddingHorizontal: sizes._10sdp,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: sizes._18sdp,
    textAlignVertical: 'top',
  },
});
