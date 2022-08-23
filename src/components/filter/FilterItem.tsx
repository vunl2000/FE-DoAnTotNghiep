import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  item?: any;
  color?: any;
  index?: any;
  isSelected?: boolean;
  onPress?: any;
};

const FilterItem = ({item, color, index, isSelected, onPress}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(isSelected ? '' : item, isSelected ? -1 : index)}>
      <View
        style={[
          styles.container,
          {
            justifyContent: color ? 'space-evenly' : 'center',
            borderColor: isSelected
              ? ArrayColors._color_black
              : ArrayColors._color_white_black,
            width: color
              ? undefined
              : (sizes._screen_width - 5 * sizes._18sdp) / 4,
          },
        ]}>
        {color ? (
          <>
            <View
              style={[
                styles.rectColor,
                {
                  backgroundColor: color,
                },
              ]}
            />
            <View style={{width: sizes._10sdp}} />
          </>
        ) : null}
        {isSelected ? (
          <>
            <View style={styles.cancel} />
            <Text style={styles.textCancel}>x</Text>
          </>
        ) : null}
        <Text style={styles.textSub}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    padding: sizes._10sdp,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: sizes._1sdp,
  },
  textSub: {
    color: ArrayColors._color_black,
    fontSize: sizes._16sdp,
  },
  cancel: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRightWidth: sizes._18sdp,
    borderBottomWidth: sizes._18sdp,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: ArrayColors._color_un_active,
  },
  textCancel: {
    position: 'absolute',
    color: ArrayColors._color_white,
    top: 0,
    right: 1,
    fontSize: sizes._12sdp,
    lineHeight: sizes._12sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
  },
  rectColor: {
    width: sizes._12sdp,
    height: sizes._12sdp,
    elevation: 1,
  },
});
