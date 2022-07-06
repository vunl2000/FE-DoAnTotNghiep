import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';

type Props = {
  item?: any;
  index?: any;
};

const ContentCatoryItem = (props: Props) => {
  const {id, name, img} = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.coverImage}>
        <Image source={img} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.textLabel}>{name}</Text>
    </View>
  );
};

export default ContentCatoryItem;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._80sdp) / 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverImage: {
    backgroundColor: ArrayColors.catory_bg_home,
    width: sizes._56sdp,
    height: sizes._56sdp,
    borderRadius: sizes._56sdp / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: sizes._36sdp,
    height: sizes._48sdp,
  },
  textLabel: {
    color: ArrayColors._color_black,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
  },
});
