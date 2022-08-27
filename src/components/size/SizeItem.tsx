import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  onPress?: any;
  isSelected?: any;
  item?: any;
  index?: number;
};

const SizeItem = ({onPress, isSelected, item, index}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(isSelected ? '' : item, isSelected ? -1 : index)}>
      <Animatable.View
        animation={isSelected ? 'bounceIn' : ''}
        style={[
          styles.sizeItem,
          {
            borderColor: isSelected
              ? ArrayColors._color_black
              : ArrayColors._color_white_black,
          },
        ]}>
        <Text style={styles.sizeText}>{item}</Text>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default SizeItem;

const styles = StyleSheet.create({
  sizeItem: {
    borderWidth: sizes._2sdp,
    borderRadius: sizes._50sdp,
    paddingHorizontal: sizes._24sdp,
    paddingVertical: sizes._16sdp,
    marginRight: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
  },
  sizeText: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
  },
});
