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
    width: sizes._screen_width - 40,
    height: 48,
    borderWidth: 1,
  
    // borderRadius: 24,
    marginVertical: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ArrayColors._color_black,
    backgroundColor: ArrayColors._color_black,
  },
  mText: {
    color: ArrayColors._color_white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
  },
});
