import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import ArrayColors from '../../res/colors/ArrayColors';
const ScreensProduct = () => {
  const {mContainer} = styles;
  return (
    <SafeAreaView style={mContainer}>
      <Header logo={false} />
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
