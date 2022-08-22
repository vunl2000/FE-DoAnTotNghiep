import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScreensProduct = () => {
  const {mContainer} = styles;
  return (
    <SafeAreaView style={mContainer}>
      <View
        style={{
          flex: 1,
          backgroundColor: ArrayColors._color_blue_light,
        }}></View>
    </SafeAreaView>
  );
};

export default ScreensProduct;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
