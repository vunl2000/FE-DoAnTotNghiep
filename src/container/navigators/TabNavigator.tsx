import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AppContainer from '../navigators/AppContainer';
import DetailProduct from '../screens/product/DetailProduct';
import ScreenLogin from '../screens/account/screen-acc/ScreenLogin';
import ScreenRegister from '../screens/account/screen-acc/ScreenRegister';
import ScreenRegisterDetail from '../screens/account/screen-acc/ScreenRegisterDetail';
import ScreenVeryfiOTP from '../screens/account/screen-acc/ScreenVeryfiOTP';
import OnboardingFirst from '../../container/screens/onboarding/OnboardingFirst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenAdress from '../screens/address/ScreenAdress';
import ScreenOrder from '../screens/order/ScreenOrder';
import ScreenUserSpaper from '../screens/userspaper/ScreenUserSpaper';
import {useSelector} from 'react-redux';

export enum NameScreen {
  HOME = 'AppContainer',
  DETAIL_PRODUCT = 'DetailProduct',
  LOGIN_AND_REGISTER = 'ScreenLogin',
  ADDRESS = 'ScreenAddress',
  ORDER = 'ScreenOrder',
}

export default function TabNavigator() {
  const {firstOpen} = useSelector((state: any) => state.firstOpen);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={firstOpen ? 'AppContainer' : 'OnboardingFirst'}>
        <Stack.Screen
          name="OnboardingFirst"
          component={OnboardingFirst}
          options={{headerShown: false}}
        />
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
          name="ScreenLogin"
          component={ScreenLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenRegister"
          component={ScreenRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScreenVeryfiOTP"
          component={ScreenVeryfiOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenRegisterDetail"
          component={ScreenRegisterDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScreenAddress"
          component={ScreenAdress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenOrder"
          component={ScreenOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenUserSpaper"
          component={ScreenUserSpaper}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
