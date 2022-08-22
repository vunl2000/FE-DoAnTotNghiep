import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {useDispatch} from 'react-redux';
import {changeSelectCart} from '../../store/actions/productsActions';
type CheckBoxProps = {
  checked?: boolean;
  changeSelected?: () => void;
};

const CustomCheckBox = ({checked, changeSelected}: CheckBoxProps) => {
  const dispatch: any = useDispatch();

  return (
    <TouchableOpacity onPress={changeSelected}>
      <View style={styles.maxWidth} />
      <View
        style={[
          styles.containerCheckBox,
          {
            backgroundColor: checked ? ArrayColors._color_black : 'transparent',
          },
        ]}>
        {checked ? (
          <Icon
            name="check-bold"
            size={sizes._20sdp}
            color={ArrayColors._color_white}
          />
        ) : null}
      </View>
      <View style={styles.maxWidth} />
    </TouchableOpacity>
  );
};
export default CustomCheckBox;
const styles = StyleSheet.create({
  containerCheckBox: {
    width: sizes._26sdp,
    height: sizes._26sdp,
    borderRadius: sizes._26sdp / 2,
    borderWidth: sizes._2sdp,
    borderColor: ArrayColors._color_black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maxWidth: {
    flex: 1,
  },
});
