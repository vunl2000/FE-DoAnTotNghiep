import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../container/navigators/TabNavigator';
import image from '../../res/require/Images';
import FastImage from 'react-native-fast-image';
import BetterImage from '../images/BetterImage';
import {TypeProductItem} from '../../store/actions/types';
import IconHeader from '../icons/IconHeader';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  item?: TypeProductItem;
  index?: number | any;
};

const ProductItemHeart = ({item, index}: Props) => {
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
      <BetterImage
        source={{
          uri: item?.imageProduct[0],
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.mockIcon}>
        <IconHeader
          name={'heart-outline'}
          sizes={sizes._24sdp}
          color={ArrayColors._color_black_gray12}
          style={styles.iconHear}
          onPress={() => {}}
        />
      </View>
      <Text style={styles.textPrice}>{formartMoney(item?.price)}</Text>
      <View style={{flex: 1, paddingRight: sizes._10sdp}}>
        <Text style={styles.textLabel} ellipsizeMode="tail" numberOfLines={1}>
          {item?.titleProduct}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemHeart;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._18sdp * 3) / 2,
    justifyContent: 'center',
  },
  image: {
    width: (sizes._screen_width - sizes._18sdp * 3) / 2,
    height: sizes._243sdp,
  },
  textPrice: {
    fontSize: sizes._font_size_large,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    marginVertical: sizes._10sdp,
  },
  textLabel: {
    fontSize: sizes._font_size_large,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    color: ArrayColors._color_black,
    marginBottom: sizes._10sdp,
  },
  iconHear: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockIcon: {
    position: 'absolute',
    right: sizes._10sdp,
    bottom: '23%',
  },
});
