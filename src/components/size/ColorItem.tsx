import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  ColorValue,
} from 'react-native';
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

const colorRender = (isSelected: boolean, colors: ColorValue): ViewStyle => ({
  width: isSelected ? sizes._30sdp : sizes._26sdp,
  height: isSelected ? sizes._30sdp : sizes._26sdp,
  borderRadius: isSelected ? sizes._32sdp / 2 : sizes._28sdp / 2,
  backgroundColor: colors,
});

const ColorItem = ({onPress, isSelected, item, index}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(isSelected ? '' : item, isSelected ? -1 : index)}>
      <Animatable.View
        animation={isSelected ? 'bounce' : undefined}
        style={[
          styles.colorItem,
          {
            padding: isSelected ? sizes._2sdp : 0,
            borderWidth: isSelected ? sizes._2sdp : 0,
            borderColor: isSelected
              ? ArrayColors._color_black
              : ArrayColors._color_white,
          },
        ]}>
        <View style={colorRender(isSelected, item)} />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  colorItem: {
    width: sizes._30sdp,
    height: sizes._30sdp,
    borderRadius: sizes._32sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizes._16sdp,
  },
});
