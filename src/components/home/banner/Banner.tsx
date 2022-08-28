import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import BetterImage from '../../images/BetterImage';
import FastImage from 'react-native-fast-image';

interface Props {
  uri?: any;
  size?: string;
  mode?: string;
}

const Banner = ({uri, size, mode}: Props) => {
  return (
    <>
      <FastImage
        source={{uri: uri, priority: FastImage.priority.high}}
        style={size === 'small' ? styles.imageSmall : styles.imageMedium}
        resizeMode={
          mode === 'cover'
            ? FastImage.resizeMode.cover
            : FastImage.resizeMode.contain
        }
      />
    </>
  );
};

export default Banner;

const styles = StyleSheet.create({
  imageSmall: {
    height: sizes._22sdp,
    width: sizes._screen_width,
  },
  imageMedium: {
    height: sizes._165sdp,
    width: sizes._screen_width,
  },
});
