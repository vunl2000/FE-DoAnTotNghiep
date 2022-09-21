import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import IconHeader from '../icons/IconHeader';
import {NameScreen} from '../../container/navigators/TabNavigator';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  item: any;
  index: any;
  onPress: any;
};

const ItemHeart = ({item, index, onPress}: Props) => {
  const {navigate}: any = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginLeft: index % 3 === 0 ? 0 : sizes._18sdp,
        },
      ]}
      onPress={() => navigate(NameScreen.DETAIL_PRODUCT, {item: item})}>
      <FastImage
        source={{
          uri: item?.imageProduct[0],
          // cache: FastImage.cacheControl.web,
          // priority: FastImage.priority.high,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.mockIcon}>
        <IconHeader
          name={'heart-outline'}
          sizes={sizes._26sdp}
          color={ArrayColors._color_black_gray12}
          style={styles.iconHear}
          onPress={() => onPress(item)}
        />
      </View>
      <Text style={styles.textPrice}>{formartMoney(item?.price)}</Text>
    </TouchableOpacity>
  );
};

export default ItemHeart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: (sizes._screen_width - sizes._18sdp * 4) / 3,
    height: sizes._142sdp,
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
    borderRadius: sizes._32sdp / 2,
    width: sizes._32sdp,
    height: sizes._32sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockIcon: {
    position: 'absolute',
    right: sizes._10sdp,
    bottom: '24%',
  },
});
