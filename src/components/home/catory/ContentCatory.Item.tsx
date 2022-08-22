import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import BetterImage from '../../images/BetterImage';

type Props = {
  item?: any;
  index?: any;
};

const ContentCatoryItem = (props: Props) => {
  const {_id, titleCategoryProduct, categoryImgProduct} = props.item;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.coverImage}>
        <BetterImage
          source={{
            uri: categoryImgProduct,
            priority: 'normal',
          }}
          style={styles.image}
          resizeMode="contain"
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
