import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../container/navigators/TabNavigator';
import FastImage from 'react-native-fast-image';
import BetterImage from '../images/BetterImage';
import {TypeProductItem} from '../../store/actions/types';
import {formartMoney, makeId} from '../../utils/Utilities';
import {Image} from 'react-native';

type Props = {
  item?: TypeProductItem;
  index?: number | any;
};

const ProductItem = ({item, index}: Props) => {
  const {navigate}: any = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginLeft: index % 2 == 0 ? sizes._18sdp : 0,
          marginRight: sizes._18sdp,
        },
      ]}
      onPress={() => navigate(NameScreen.DETAIL_PRODUCT, {item: item})}>
      <FastImage
        source={{
          uri: item?.imageProduct[0],
          cache: FastImage.cacheControl.web,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
        fallback
      />
      <Text style={styles.textPrice}>{formartMoney(item?.price)}</Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: (sizes._screen_width - sizes._54sdp) / 2,
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
