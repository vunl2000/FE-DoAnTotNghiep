import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScreensProduct = () => {
  React.useEffect(() => {
    // try {
    //   const value = AsyncStorage.getItem('@user_token')

    //   if (value !== null) {
    //     // value previously stored
    //     console.log(value);
    //   }
    // } catch (e) {
    //   // error reading value
    //   console.log(e);
    // }
    getData('@user_token')
      .then(data => data)
      .then(value => {
        console.log('yourKey Value:  ' + value);
      })
      .catch(err => console.log(err));
  }, []);

  const getData = async (key: any) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
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
