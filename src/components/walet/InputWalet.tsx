import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
interface Props {
  placeholder?: any;
  onChange?: any;
  defaultValue?: any;
}
const InputWalet = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      />
    </View>
  );
};

export default InputWalet;

const styles = StyleSheet.create({
  container: {
    width: sizes._screen_width,
    padding: sizes._21sdp,
  },
  inputContainer: {
    borderBottomColor: ArrayColors.gray,
    borderBottomWidth: sizes._1sdp,
    fontSize: sizes._15sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
  },
});
