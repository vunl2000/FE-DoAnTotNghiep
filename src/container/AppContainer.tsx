import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import ScreensHome from './screens/ScreensHome';
import ScreensProduct from './screens/ScreensProduct';
import ScreenCart from './screens/ScreenCart';
import ScreenNewspaper from './screens/ScreenNewspaper';
import ScreenAccount from './screens/ScreenAccount';

export enum ScreenName {
  HOME = 'HomeStack',
  HOMESCREEN = 'ScreensHome',
  SCREENPODUCT = 'ScreensProduct',
  SCREENCART = 'ScreenCart',
  SCREENNEWPAPER = 'ScreenNewspaper',
  SCREENACCOUNT = 'ScreenAccount',
}

const Tab = createBottomTabNavigator();
const bottomTab = createMaterialTopTabNavigator();

const AppContainer = () => {
  
  return (
    <View>
      <Text>AppContainer</Text>
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
