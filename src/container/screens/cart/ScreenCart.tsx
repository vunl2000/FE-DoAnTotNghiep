import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import image from '../../../res/require/Images';
import ButtonSub from '../../../components/button/ButtonSub';
import {useDispatch, useSelector} from 'react-redux';
import Cart from '../../../components/cart/Cart';
import CustomCheckBox from '../../../components/cart/CheckBox';
import {formartMoney} from '../../../utils/Utilities';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';
import {showToast} from '../../../components/modal/ToastCustom';
import {slectedAllCart} from '../../../store/actions/productsActions';
import {TypeCartItem} from '../../../store/actions/types';

interface Props {}

const emptyData = null;
const renderEmpty = null;

const ScreenCart = (props: Props) => {
  const {carts, numberCart, allSelected} = useSelector(
    (state: any) => state.product,
  );

  const auth = useSelector((state: any) => state.account);

  const [cartSeleted, setCartSeleted] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const {navigate}: any = useNavigation();
  const dispatch: any = useDispatch();

  const selectedAll = () => {
    dispatch(slectedAllCart());
  };

  const navigateLogin = () => navigate(NameScreen.LOGIN);
  const navigateHeart = () => navigate(NameScreen.HEART_PRODUCT);

  useEffect(() => {
    let count = 0;
    let price = 0;
    carts.forEach((item: TypeCartItem) => {
      if (item.selected) {
        count += item.qty;
        price += item.qty * item.price;
      }
    });
    setCartSeleted(count);
    setSumPrice(price);
  }, [cartSeleted, carts, sumPrice, numberCart]);
  console.log(auth);

  const addToBill = () => {
    if (auth.isAuthenticated) {
      if (!auth.result[0].authentication) {
        showToast('Bạn cần xác thực tài khoản để thanh toán!');
      } else {
        cartSeleted > 0
          ? navigate(NameScreen.ORDER)
          : showToast('Vui lòng chọn sản phẩm đặt hàng!');
      }
    } else {
      showToast('Bạn chưa đăng nhập!');
      navigate(NameScreen.LOGIN);
    }
  };

  const ContentHeader = () => (
    <View style={styles.containerHeader}>
      <View style={styles.spaceIcon} />
      <View style={styles.titleScreen}>
        <Text style={styles.textLabelScreen}>Giỏ hàng</Text>
      </View>
      <IconHeader
        name="heart-outline"
        color={ArrayColors._color_black}
        sizes={sizes._24sdp}
        style={styles.iconHeaderRight}
        onPress={navigateHeart}
      />
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Image
        source={image.empty_cart}
        style={styles.imgEmptyCart}
        resizeMode="contain"
      />
      <Text style={styles.textLabelEmpty}>Giỏ hàng của bạn trống</Text>
      {auth.isAuthenticated ? null : (
        <>
          <Text style={styles.textSubLabelEmpty}>
            Đăng nhập để xem giỏ hàng
          </Text>
          <ButtonSub
            size="medium"
            value="Đăng nhập / Đăng ký"
            bgColor="black"
            onPress={navigateLogin}
          />
        </>
      )}
      <View style={styles.space} />
      <ButtonSub size="medium" value="Mua ngay" bgColor="white" />
      <View style={[styles.space, {marginBottom: sizes._50sdp}]} />
    </View>
  );
  const BoxCard = () => (
    <View style={styles.boxCartContent}>
      {numberCart == 0 ? <EmptyCart /> : <Cart />}
    </View>
  );
  const BtnPay = () => (
    <View style={styles.containerPay}>
      <View style={styles.payLeft}>
        <CustomCheckBox checked={allSelected} changeSelected={selectedAll} />
        <Text style={styles.textLabelAll}>Tất cả</Text>
        <View style={[styles.maxSpace, {paddingHorizontal: sizes._8sdp}]}>
          <Text style={styles.textLabelEmpty}>{formartMoney(sumPrice)}</Text>
        </View>
      </View>
      <View style={styles.maxSpace}>
        <ButtonSub
          value={
            cartSeleted === 0 ? 'Thanh toán' : `Thanh toán (${cartSeleted})`
          }
          bgColor="black"
          size="lager"
          onPress={addToBill}
        />
      </View>
    </View>
  );
  const renderContent = (
    <>
      <BoxCard />
    </>
  );

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<ContentHeader />} />
      <View style={styles.content}>
        <FlatList
          data={emptyData}
          renderItem={renderEmpty}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderContent}
          removeClippedSubviews
        />
        {numberCart != 0 ? <BtnPay /> : null}
      </View>
    </SafeAreaView>
  );
};

export default ScreenCart;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  containerHeader: {
    flexDirection: 'row',
  },
  spaceIcon: {
    width: sizes._42sdp,
  },
  titleScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabelScreen: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Blod',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  content: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
  },
  iconHeaderRight: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._42sdp / 2,
    marginLeft: sizes._16sdp,
  },
  boxCartContent: {
    marginHorizontal: sizes._8sdp,
    marginVertical: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
    justifyContent: 'center',
    alignContent: 'center',

    shadowColor: ArrayColors._color_black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  emptyCartContainer: {
    alignItems: 'center',
  },
  imgEmptyCart: {
    width: sizes._screen_width / 3,
  },
  textLabelEmpty: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  textSubLabelEmpty: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    marginVertical: sizes._16sdp,
  },
  space: {
    height: sizes._16sdp,
  },
  containerPay: {
    backgroundColor: ArrayColors._color_white,
    flexDirection: 'row',
    padding: sizes._16sdp,
    shadowColor: ArrayColors._color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    alignItems: 'center',
  },
  textLabelAll: {
    fontSize: sizes._18sdp,
    fontWeight: '400',
    marginLeft: sizes._8sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
  },
  payLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  maxSpace: {
    flex: 1,
  },
});
