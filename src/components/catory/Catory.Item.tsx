import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  item?: any;
  index?: any;
  onPress?: any;
};

const CatoryItem = ({item, index, onPress}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View
        style={[
          styles.container,
          {
            marginLeft: index % 2 == 0 ? sizes._12sdp : 0,
            marginRight: sizes._12sdp,
          },
        ]}>
        <FastImage
          source={{
            uri: item.imageProduct[0],
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.img}
        />
        <Text style={styles.textSub} numberOfLines={1} ellipsizeMode="tail">
          {item.titleProduct}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CatoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  img: {
    width: sizes._132sdp,
    height: sizes._190sdp,
  },
  textSub: {
    fontSize: sizes._15sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_black,
  },
});
