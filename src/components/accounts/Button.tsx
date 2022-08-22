import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  title?: string;
  onPress?: () => void;
};

const Button = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{alignItems: 'center'}}>
      <View style={styles.mContainer}>
        <Text style={styles.mText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  mContainer: {
    width: sizes._screen_width - sizes._40sdp,
    height: sizes._58sdp,
    borderWidth: sizes._1sdp,
    marginVertical: sizes._32sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ArrayColors._color_black,
    backgroundColor: ArrayColors._color_black,
  },
  mText: {
    color: ArrayColors._color_white,
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
  },
});
