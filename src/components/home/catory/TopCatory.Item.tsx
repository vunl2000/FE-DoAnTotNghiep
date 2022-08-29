import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';

type Props = {
  item?: any;
  index?: any;
  onPress?: any;
};

const TopCatoryItem = ({item, index, onPress}: Props) => {
  const {icon, label} = item;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(index)}>
      <View
        style={[
          styles.container,
          {
            marginLeft: sizes._18sdp,
          },
        ]}>
        <Image source={icon} style={styles.icon} />
        <View style={{height: sizes._10sdp}} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopCatoryItem;

const styles = StyleSheet.create({
  container: {
    width: (sizes._screen_width - sizes._18sdp * 4.8) / 4,
    backgroundColor: ArrayColors.blue_item_catory,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: sizes._10sdp,
    padding: sizes._10sdp,
  },
  icon: {
    width: sizes._18sdp,
    height: sizes._18sdp,
  },
  label: {
    fontSize: sizes._14sdp,
    color: ArrayColors._color_black,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  subLabel: {
    fontSize: sizes._12sdp,
    color: ArrayColors._color_black,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
  },
});
