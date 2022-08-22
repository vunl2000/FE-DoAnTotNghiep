import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import HeaderSpaper from '../../../components/newspaper/HeaderSpaper';
import Thinking from '../../../components/newspaper/Thinking';
import NewsData from '../../../components/newspaper/NewsData';
import {getDataUser} from '../../../utils/GetToken';
import sizes from '../../../res/sizes/sizes';

type Props = {
  navigation?: any;
};

const ScreenNewspaper = ({navigation}: {navigation: any}) => {

  function eventNewSpaper_1() {
    console.log('Đăng tin');
  }

  function eventNewSpaper_2() {
    console.log('Đăng tin');
  }

  function eventQA() {
    console.log('Đăng tin');
  }

  function onPressHome() {
    navigation.navigate('ScreenUserSpaper');
  }
  return (
    <SafeAreaView style={styles.mContainer}>
      <View style={{width: '100%', backgroundColor: ArrayColors._color_white}}>
        <AppHeader
          content
          customContent={
            <HeaderSpaper onPressHome={onPressHome} />
          }></AppHeader>
      </View>

      <View style={styles.mLineStyle}></View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Thinking 
          
          onPress={eventNewSpaper_2}
          onPressQA={eventQA}
          viewImportThinking={eventNewSpaper_1} />
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
    backgroundColor: ArrayColors.catory_bg_home,
  },
  mLineStyle: {
    width: sizes._screen_width,
    height: 0.3,
    backgroundColor: ArrayColors._color_gray_sombre,
  },
});
