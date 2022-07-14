import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import AppHeader from '../../components/header/AppHeader';
import IconHeader from '../../components/icons/IconHeader';
import sizes from '../../res/sizes/sizes';
import image from '../../res/require/Images';
import ButtonSub from '../../components/button/ButtonSub';
import {useSelector} from 'react-redux';
import Cart from '../../components/cart/Cart';
interface Props {}

const emptyData = null;
const renderEmpty = null;
const ScreenCart = (props: Props) => {
  const {carts, numberCart} = useSelector((state: any) => state.product);

  const ContentHeader = () => (
    <View style={styles.containerHeader}>
      <View style={styles.mContainer} />
      <IconHeader
        name="heart-outline"
        color={ArrayColors._color_black}
        sizes={sizes._24sdp}
        style={styles.iconHeaderRight}
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
      <Text style={styles.textSubLabelEmpty}>Đăng nhập để xem giỏ hàng</Text>
      <ButtonSub size="medium" value="Đăng nhập / Đăng ký" bgColor="black" />
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
  const renderContent = () => (
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
    fontFamily: 'OpenSans-Blod',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
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
});
