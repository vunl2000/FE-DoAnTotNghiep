import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import sizes from '../../res/sizes/sizes';

type Props = {
  item?: any;
  index?: any;
};

const CatoryItem = ({item, index}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginLeft: index % 2 == 0 ? sizes._12sdp : 0,
          marginRight: sizes._12sdp,
        },
      ]}>
      <FastImage
        source={{uri: item.imageProduct[0]}}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.img}
      />
      <Text>{item.titleProduct}</Text>
    </View>
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
});
