import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import BetterImage from '../../images/BetterImage';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../../container/navigators/TabNavigator';
import FastImage from 'react-native-fast-image';

type Props = {
  item?: any;
  index?: any;
};

const ContentCatoryItem = (props: Props) => {
  const {navigate}: any = useNavigation();

  const {_id, titleCategoryProduct, categoryImgProduct} = props.item;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate(NameScreen.PRODUCT_VIEW, {
          titleCategoryProduct: _id,
          title: titleCategoryProduct,
        })
      }>
      <View style={styles.coverImage}>
        <FastImage
          source={{
            uri: categoryImgProduct,
            cache: FastImage.cacheControl.web,
            priority: FastImage.priority.high,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.textLabel} numberOfLines={2}>
        {titleCategoryProduct}
      </Text>
    </TouchableOpacity>
  );
};

export default ContentCatoryItem;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._80sdp) / 4,
    alignItems: 'center',
  },
  coverImage: {
    backgroundColor: ArrayColors.catory_bg_home,
    width: sizes._58sdp,
    height: sizes._58sdp,
    borderRadius: sizes._56sdp / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: sizes._58sdp,
    height: sizes._58sdp,
  },
  textLabel: {
    color: ArrayColors._color_black,
    fontWeight: '400',
    fontSize: sizes._12sdp,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
});
