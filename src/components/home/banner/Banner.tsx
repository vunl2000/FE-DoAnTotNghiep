import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';

interface Props {
  uri?: any;
}

const Banner = (props: Props) => {
  const {uri} = props;
  return (
    <>
      <Image source={{uri: uri}} style={styles.image} resizeMode="cover" />
    </>
  );
};

export default Banner;

const styles = StyleSheet.create({
  image: {
    height: sizes._165sdp,
    width: sizes._screen_width,
  },
});
