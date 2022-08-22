import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
import {useSelector} from 'react-redux';
import ButtonSub from '../../../components/button/ButtonSub';
import {formartMoney} from '../../../utils/Utilities';
import SaleProDuct from '../../../components/order/SaleProDuct';

type Props = {};

const ScreenOrder = (props: Props) => {
  const {goBack}: any = useNavigation();
  const {carts, numberCart} = useSelector((state: any) => state.product);
  const [cartSeleted, setCartSeleted] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [priceTranSport, setPriceTranSport] = useState(30000);
  const [salePrice, setSalePrice] = useState(0);
  const [dataCartSeleted, setDataCartSeleted] = useState([]);
  const onBackPress = () => goBack();

  useEffect(() => {
    let count = 0;
    let price = 0;
    let products: any = [];
    carts.forEach((item: any) => {
      if (item.selected) {
        count += item.quantity;
        price += item.quantity * item.price;
        products.push(item);
      }
    });
    setCartSeleted(count);
    setSumPrice(price);
    setDataCartSeleted(products);
  }, [cartSeleted, carts, sumPrice, numberCart]);
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
      <Location />
      <View style={styles.spaceMedium} />
      {/*Đơn vị giao hàng*/}
      <TranSport />
      <View style={styles.spaceMedium} />
      {/* Phương thức thanh toán*/}
      <Pay />

      <View style={styles.spaceMedium} />
      <ColumView
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
      <View style={styles.spaceMedium} />
      <ListProductOrder
        dataCartSeleted={dataCartSeleted}
        cartSeleted={cartSeleted}
        sumPrice={sumPrice}
      />

      <View style={styles.spaceMedium} />
      <SaleProDuct
        sumPrice={sumPrice}
        priceTranSport={priceTranSport}
        salePrice={salePrice}
      />
      <View style={styles.spaceMedium} />
    </View>
  );
  const Button = () => (
    <View style={styles.btnCreatBill}>
      <View style={styles.allContent}>
        <Text style={[styles.textSub, styles.content]}>Tổng cộng:</Text>
        <Text style={styles.textSub}>{formartMoney(sumPrice)}</Text>
      </View>
      <ButtonSub size="lager" bgColor="black" value="Đặt hàng" />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.content}>
        <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="screen_oder"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
        <Button />
      </View>
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
