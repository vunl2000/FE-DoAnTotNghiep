import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  hint?: string | any;
  value?: string | any;
  onChangeText?: (val: any) => void;
  onPress?: () => void;
};

const InputText = ({hint, value, onChangeText, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textPlaholder}>{hint}</Text>
      <View style={styles.action}>
        <TextInput
          style={styles.textSub}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
          value={value}
        />
        {value ? (
          <TouchableOpacity onPress={onPress}>
            <Icon
              name="close-circle"
              size={sizes._24sdp}
              color={ArrayColors._color_un_active}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._16sdp,
  },
  textPlaholder: {
    fontSize: sizes._14sdp,
    marginTop: sizes._8sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
  },
  textSub: {
    flex: 1,
    fontSize: sizes._20sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: sizes._10sdp,
  },
  action: {
    flexDirection: 'row',
    marginTop: sizes._5sdp,
    borderBottomWidth: sizes._1sdp,
    borderBottomColor: ArrayColors.bg_inline,
    paddingBottom: sizes._5sdp,
  },
});
