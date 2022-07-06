import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import ArrayColors from '../../../res/colors/ArrayColors';
import AddToCart from '../../../components/modal/AddToCart';

type Props = {};

const renderContent = null;
const isEmty = null;

const formartMoney = (val: any) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ';
};

const DetailProduct = (props: Props) => {
  const route: any = useRoute();
  const [isShow, setIsShow] = useState(false);

  const onChangeShow = () => {
    setIsShow(!isShow);
  };

  const {image, name, price} = route.params?.item;

  const renderView = () => (
    <View style={styles.content}>
      <Image source={image} style={styles.img} />
      <Text style={styles.textNameProduct}>{name}</Text>
      <Text style={styles.textPriceProduct}>{formartMoney(price)}</Text>
    </View>
  );

  const contentHeader = () => <View style={styles.contentHeder} />;

  const addToCart = () => (
    <View style={styles.containerAddCart}>
      <TouchableOpacity>
        <Icons name="heart-outline" size={sizes._24sdp} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={onChangeShow}>
        <Text style={styles.textBtnAdd}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <AppHeader iconRight content customContent={contentHeader()} iconLeft />
      <View style={styles.content}>
        <FlatList
          data={isEmty}
          renderItem={renderContent}
          listKey="detail-products"
          ListFooterComponent={renderView}
          showsVerticalScrollIndicator={false}
        />
        {addToCart()}
      </View>
      <AddToCart isShow={isShow} onChangeShow={onChangeShow} />
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentHeder: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  img: {
    width: '100%',
  },
  containerAddCart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
    borderColor: ArrayColors._color_gray,
  },
  btnAddCart: {
    flex: 1,
    marginVertical: sizes._16sdp,
    marginLeft: sizes._16sdp,
    height: sizes._48sdp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ArrayColors._color_black,
  },
  textBtnAdd: {
    color: ArrayColors._color_white,
    fontSize: sizes._font_size_big_large,
    fontWeight: '700',
    fontFamily: 'OpenSans-Blod',
  },
  textNameProduct: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    marginTop: sizes._8sdp,
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_large,
    color: ArrayColors._color_black,
  },
  textPriceProduct: {
    fontWeight: '700',
    width: '100%',
    fontFamily: 'OpenSans-Blod',
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_big,
    color: ArrayColors._color_black,
  },
});
