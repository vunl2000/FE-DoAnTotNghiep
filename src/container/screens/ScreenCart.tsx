import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';

const ScreenCart = () => {
  const {mContainer} = styles;
  return (
    <SafeAreaView style={mContainer}>
     
      <View style={{flex: 1, backgroundColor: ArrayColors.pink}}></View>
    </SafeAreaView>
  );
}

export default ScreenCart

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor:  ArrayColors._color_white,
  },
})