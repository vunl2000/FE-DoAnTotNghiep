import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import BetterImage from '../../images/BetterImage';

interface Props {
  uri?: any;
  size?: string;
  mode?: string;
}

const Banner = ({uri, size, mode}: Props) => {
  return (
    <>
      <BetterImage
        source={{uri: uri}}
        style={size === 'small' ? styles.imageSmall : styles.imageMedium}
        resizeMode={mode === 'cover' ? 'cover' : 'contain'}
      />
    </>
  );
};

export default Banner;

const styles = StyleSheet.create({
  imageSmall: {
    height: sizes._50sdp,
    width: sizes._screen_width,
  },
  imageMedium: {
    height: sizes._165sdp,
    width: sizes._screen_width,
  },
});
