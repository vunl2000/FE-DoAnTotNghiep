import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import ArrayColors from '../../res/colors/ArrayColors';

const ScreenAccount = () => {
  const {mContainer} = styles;
  return (
    <SafeAreaView style={mContainer}>
      <Header logo />
      <View style={{flex: 1, backgroundColor: ArrayColors.bag3Bg}}></View>
    </SafeAreaView>
  );
};

export default ScreenAccount;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
