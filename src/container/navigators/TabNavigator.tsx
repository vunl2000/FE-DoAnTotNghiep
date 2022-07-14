import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AppContainer from '../navigators/AppContainer';
import DetailProduct from '../screens/product/DetailProduct';
import ScreenLoginAndRegister from '../screens/account/screen-acc/ScreenLoginAndRegister';

export enum NameScreen {
  HOME = 'AppContainer',
  DETAIL_PRODUCT = 'DetailProduct',
}

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AppContainer"
          component={AppContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailProduct"
          component={DetailProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenLoginAndRegister"
          component={ScreenLoginAndRegister}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
