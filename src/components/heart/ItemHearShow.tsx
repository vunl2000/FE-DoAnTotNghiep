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
  onPress?: any;
};

const ItemHeartShow = ({item, index, onPress}: Props) => {
  const {navigate}: any = useNavigation();

  const goToDetail = () => navigate(NameScreen.DETAIL_PRODUCT, {item: item});
  return (
    <TouchableOpacity
      style={[
        styles.container,
        // {
        //   marginLeft: index % 2 === 0 ? 0 : sizes._18sdp,
        // },
      ]}
      onPress={goToDetail}>
      <FastImage
        source={{
          uri: item?.imageProduct[0],
          cache: FastImage.cacheControl.web,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.mockIcon}>
        <IconHeader
          name={'heart'}
          sizes={sizes._28sdp}
          color={ArrayColors._color_black_gray12}
          style={styles.iconHear}
          onPress={() => onPress(item)}
        />
      </View>
      <Text style={styles.textPrice}>{formartMoney(item?.price)}</Text>
    </TouchableOpacity>
  );
};

export default ItemHeartShow;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._18sdp * 3) / 2,
    justifyContent: 'center',
    paddingHorizontal: sizes._15sdp,
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
    bottom: '16%',
  },
});
