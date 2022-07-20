import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import HeaderSpaper from '../../../components/newspaper/HeaderSpaper';
import Thinking from '../../../components/newspaper/Thinking';
import NewsData from '../../../components/newspaper/NewsData';

import sizes from '../../../res/sizes/sizes';
const ScreenNewspaper = ({navigation}: {navigation: any}) => {
  function eventNewSpaper() {
    console.log('Đăng tin');
  }
  return (
    <SafeAreaView style={styles.mContainer}>
      <View style={{width: '100%', backgroundColor: ArrayColors._color_white}}>
        <AppHeader content customContent={<HeaderSpaper />}></AppHeader>
      </View>

      <View style={styles.mLineStyle}></View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Thinking viewImportThinking={eventNewSpaper} />
        </View>

        <View style={{flex: 10, marginTop: sizes._10sdp}}>
          <NewsData />
          {/* <NewsData />
          <NewsData />
          <NewsData /> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenNewspaper;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white_sombre_,
  },
  mLineStyle: {
    width: sizes._screen_width,
    height: 0.3,
    backgroundColor: ArrayColors._color_gray_sombre,
  },
});
