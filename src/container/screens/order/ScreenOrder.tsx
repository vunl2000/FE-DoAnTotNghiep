import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../components/header/AppHeader';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ColumView from '../../../components/order/ColumView';
import TranSport from '../../../components/order/TranSport';
import Pay from '../../../components/order/Pay';
import Location from '../../../components/order/Location';
import ListProductOrder from '../../../components/order/ListProductOrder';
import {useDispatch, useSelector} from 'react-redux';
import ButtonSub from '../../../components/button/ButtonSub';
import {formartMoney} from '../../../utils/Utilities';
import SaleProDuct from '../../../components/order/SaleProDuct';
import {Address} from '../../../store/reducer/addressReducer';
import {TypeCartItem, TypeProductItem} from '../../../store/actions/types';
import {
  createBill,
  createBillDetail,
  getTransportFee,
  resetBill,
} from '../../../store/actions/billActions';
import {showToast} from '../../../components/modal/ToastCustom';
import {deleteCart} from '../../../store/actions/productsActions';
import {NameScreen} from '../../navigators/TabNavigator';
import Geolocation from 'react-native-geolocation-service';
import Loading from '../../../components/modal/Loading';
import {HomeName} from '../../navigators/AppContainer';

type Props = {};

const ScreenOrder = (props: Props) => {
  const {goBack, navigate}: any = useNavigation();
  const dispatch: any = useDispatch();

  const {carts, numberCart} = useSelector((state: any) => state.product);
  const {listAddress} = useSelector((state: any) => state.address);
  const {bill, isFalse, isStep, transport} = useSelector(
    (state: any) => state.bill,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [cartSeleted, setCartSeleted] = useState(0);
  const [address, setAddress] = useState<Address>();
  const [sumPrice, setSumPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [dataCartSeleted, setDataCartSeleted] = useState([]);
  const [location, setLocation] = useState<any>(null);

  const onBackPress = () => goBack();
  console.log(transport);

  const goListAdress = () => {
    navigate(NameScreen.LIST_ADDRESS);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền ứng dụng vị trí',
          message:
            'Chúng tôi cần vị trí của bạn để kiểm toán phí dịch vụ vận chuyển!',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Thoát',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position: any) => {
            console.log(position.coords);
            setLocation(position.coords);

            let getShip = dispatch(
              getTransportFee(
                position.coords.latitude,
                position.coords.longitude,
              ),
            );

            if (!getShip) {
              showToast('Đã có lỗi xảy ra vui lòng thử lại sau!');
            }
          },
          error => {
            console.log(error);
            setLocation(null);
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
          },
        );
      } else {
        //console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPayMent = () => {
    let check: boolean = true;

    if (!address) {
      showToast('Bạn cần chọn địa chỉ để giao hàng');
      check = false;
    }

    if (!location) {
      showToast(
        'Chúng tôi cần vị trí chính xác của bạn để kiểm toán phí dịch vụ vận chuyển!',
      );
      requestCameraPermission();
      check = false;
    }

    if (check) {
      setIsLoading(true);
      dispatch(createBill(address, transport));
    }
  };

  useEffect(() => {
    if (isStep == 1 && bill != null && dataCartSeleted.length > 0) {
      dataCartSeleted.forEach((item: TypeCartItem, index: number) => {
        dispatch(createBillDetail(bill, item));
      });
    }

    if (isStep == 2 && !isFalse) {
      showToast('Đơn hàng đã được tạo thành công!');
      dispatch(resetBill());
      dataCartSeleted.forEach((item: TypeCartItem, index: number) => {
        dispatch(deleteCart(item.id));
      });
      setIsLoading(false);
      navigate(NameScreen.HOME, {screen: HomeName.ACCOUNT});
    }

    if (isFalse) {
      showToast('Đã có lỗi xảy ra.Vui lòng thử lại sau!');
      dispatch(resetBill());
      setIsLoading(false);
    }
  }, [isStep, bill, isFalse]);

  useEffect(() => {
    if (listAddress.length !== 0) {
      listAddress.find((_item: Address) => {
        _item.default && setAddress(_item);
      });
    }
  }, [listAddress]);

  useEffect(() => {
    let count = 0;
    let price = 0;
    let products: any = [];
    carts.forEach((item: TypeCartItem) => {
      if (item.selected) {
        count += item.qty;
        price += item.qty * item.price;
        products.push(item);
      }
    });
    setCartSeleted(count);
    setSumPrice(price);
    setDataCartSeleted(products);
  }, [cartSeleted, carts, sumPrice, numberCart]);

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={onBackPress}
      />
      <View style={styles.contentHeader}>
        <Text style={styles.textLabel}>Xác nhận đặt hàng</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );

  const renderContent = () => (
    <View>
      <Location address={address} iconLefts onPress={goListAdress} />
      <View style={styles.spaceMedium} />
      {/*Đơn vị giao hàng*/}
      <TranSport />
      <View style={styles.spaceMedium} />
      {/* Phương thức thanh toán*/}
      <Pay label="Thanh toán" />

      <View style={styles.spaceMedium} />

      {/* <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Áp dụng phiếu giảm giá"
        valueRight={formartMoney(0)}
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Điểm"
        valueRight="Tổng cộng: 0"
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Thẻ quà tặng"
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <View style={styles.spaceMedium} /> */}

      <ListProductOrder
        dataCartSeleted={dataCartSeleted}
        cartSeleted={cartSeleted}
        sumPrice={sumPrice}
      />

      <View style={styles.spaceMedium} />
      <SaleProDuct
        sumPrice={sumPrice}
        priceTranSport={transport ? transport : 0}
        salePrice={salePrice}
      />
      <View style={styles.spaceMedium} />
    </View>
  );
  const Button = () => (
    <View style={styles.btnCreatBill}>
      <View style={styles.allContent}>
        <Text style={[styles.textSub, styles.content]}>Tổng cộng:</Text>
        <Text style={styles.textSub}>
          {formartMoney(sumPrice + salePrice + (transport ? transport : 0))}
        </Text>
      </View>
      <ButtonSub
        size="lager"
        bgColor="black"
        value="Đặt hàng"
        onPress={onPayMent}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.content}>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="screen_oder"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
        <Button />
      </View>
      {isLoading ? <Loading /> : null}
    </SafeAreaView>
  );
};

export default ScreenOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
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
  columeMedium: {
    height: sizes._72sdp,
  },
  spaceMedium: {
    height: sizes._16sdp,
  },
  btnCreatBill: {
    backgroundColor: ArrayColors._color_white,
    padding: sizes._18sdp,
    shadowColor: ArrayColors._color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  allContent: {
    flexDirection: 'row',
    marginBottom: sizes._18sdp,
    justifyContent: 'space-between',
  },
});
