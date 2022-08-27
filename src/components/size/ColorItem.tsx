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

const ColorItem = ({onPress, isSelected, item, index}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(isSelected ? '' : item, isSelected ? -1 : index)}>
      <Animatable.View
        animation={isSelected ? 'bounceIn' : undefined}
        style={styles.colorItem}>
        <View
          style={{
            width: isSelected ? sizes._30sdp : sizes._26sdp,
            height: isSelected ? sizes._30sdp : sizes._26sdp,
            borderRadius: isSelected ? sizes._32sdp / 2 : sizes._28sdp / 2,
            backgroundColor: item,
          }}
        />
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
