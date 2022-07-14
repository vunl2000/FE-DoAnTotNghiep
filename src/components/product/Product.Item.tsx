import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../container/navigators/TabNavigator';
import image from '../../res/require/Images';
import FastImage from 'react-native-fast-image';
import BetterImage from '../images/BetterImage';

type Props = {
  item?: any;
  index?: any;
};

const formartMoney = (val: any) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ';
};

const ProductItem = (props: Props) => {
  const {imageProduct, title_product, price} = props.item;

  const {navigate}: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate(NameScreen.DETAIL_PRODUCT, {item: props.item})}>
      <BetterImage
        source={{
          uri: imageProduct[0],
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.textPrice}>{formartMoney(price)}</Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._48sdp) / 2,
    justifyContent: 'center',
  },
  image: {
    width: (sizes._screen_width - sizes._48sdp) / 2,
    height: sizes._243sdp,
  },
  textPrice: {
    fontSize: sizes._font_size_large,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    marginVertical: sizes._10sdp,
  },
});
