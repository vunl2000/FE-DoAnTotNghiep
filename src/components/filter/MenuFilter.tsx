import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Icons from 'react-native-vector-icons/Ionicons';

type Props = {
  index?: any;
  value?: any;
  isSelected?: boolean;
  onPress?: any;
};

const MenuFilter = ({index, value, isSelected, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(value, index)}>
      <View
        style={[
          styles.container,
          {
            justifyContent: isSelected ? 'space-between' : 'flex-start',
          },
        ]}>
        <Text
          style={[
            styles.textSub,
            {
              fontWeight: isSelected ? '600' : '400',
              fontFamily: isSelected ? 'OpenSans-SemiBold' : 'OpenSans-Regular',
              fontSize: isSelected ? sizes._17sdp : sizes._16sdp,
            },
          ]}>
          {value}
        </Text>
        {isSelected ? (
          <Icons
            name="checkmark-outline"
            size={sizes._18sdp}
            color={ArrayColors._color_black}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default MenuFilter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._10sdp,
    paddingHorizontal: sizes._18sdp,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textSub: {
    color: ArrayColors._color_black,
  },
});
