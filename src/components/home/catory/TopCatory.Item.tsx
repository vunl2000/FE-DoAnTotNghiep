import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';

type Props = {
  item?: any;
  index?: any;
};

const TopCatoryItem = (props: Props) => {
  const {icon, label, subLabel} = props.item;
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      {subLabel === '' ? null : <Text style={styles.subLabel}>{subLabel}</Text>}
    </View>
  );
};

export default TopCatoryItem;

const styles = StyleSheet.create({
  container: {
    width: sizes._110sdp,
    backgroundColor: ArrayColors.blue_item_catory,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sizes._10sdp,
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
