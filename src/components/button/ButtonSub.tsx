import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  size?: string;
  onPress?: () => void;
  value?: string;
  bgColor?: string;
};

const ButtonSub = ({size, onPress, value, bgColor}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        size === 'small'
          ? styles.subContainerSmall
          : size === 'medium'
          ? styles.subContainerMedium
          : styles.subContainerLager,
        {
          backgroundColor:
            bgColor === 'black'
              ? ArrayColors._color_black
              : ArrayColors._color_white,
          borderColor:
            bgColor === 'black'
              ? ArrayColors._color_white
              : ArrayColors._color_black,
          borderWidth: bgColor === 'black' ? 0 : sizes._2sdp,
        },
      ]}>
      <Text
        style={[
          styles.textLabel,
          {
            color:
              bgColor === 'black'
                ? ArrayColors._color_white
                : ArrayColors._color_black,
          },
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSub;

const styles = StyleSheet.create({
  container: {
    height: sizes._48sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainerSmall: {
    width: sizes._screen_width / 3,
  },
  subContainerMedium: {
    width: sizes._screen_width / 2,
    height: sizes._48sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainerLager: {
    width: '100%',
  },
  textLabel: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._20sdp,
  },
});
