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
import {useRoute, useNavigation} from '@react-navigation/native';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import ArrayColors from '../../../res/colors/ArrayColors';
import AddToCart from '../../../components/modal/AddToCart';
import {formartMoney} from '../../../utils/Utilities';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import IconHeader from '../../../components/icons/IconHeader';

type DetailProps = {};

const renderContent = null;
const isEmty = null;

const DetailProduct = (props: DetailProps) => {
  const {carts} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const {goBack} = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const {imageProduct, title_product, price} = route.params?.item;

  console.log(carts);
  const renderItem = ({item, index}: any) => (
    <FastImage
      source={{
        uri: item,
      }}
      style={styles.img}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
  const keyItem = (item: any, index: number) => index.toString();
  const onChangeShow = () => {
    setIsShow(!isShow);
  };

  const onBackPress = () => goBack();

  const renderView = () => (
    <View style={styles.content}>
      <View style={styles.listImg}>
        <FlatList
          data={imageProduct}
          listKey="image_product"
          keyExtractor={keyItem}
          renderItem={renderItem}
          horizontal
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>
      <Text style={styles.textNameProduct}>{title_product}</Text>
      <Text style={styles.textPriceProduct}>{formartMoney(price)}</Text>
    </View>
  );

  const contentHeader = () => (
    <View style={styles.contentHeder}>
      <IconHeader
        name={'chevron-back'}
        sizes={sizes._24sdp}
        onPress={onBackPress}
      />
      <View style={styles.contentHeder} />
    </View>
  );

  const BtnShowAddCart = () => (
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
      <AppHeader content customContent={contentHeader()} />
      <View style={styles.content}>
        <FlatList
          data={isEmty}
          renderItem={renderContent}
          listKey="detail-product"
          ListFooterComponent={renderView}
          showsVerticalScrollIndicator={false}
        />
        <BtnShowAddCart />
      </View>
      <AddToCart
        isShow={isShow}
        onChangeShow={onChangeShow}
        item={route.params?.item}
      />
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
  listImg: {},
  img: {
    width: sizes._screen_width,
    height: sizes._csreen_height * 0.6,
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
