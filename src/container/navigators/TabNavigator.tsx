import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AppContainer from '../navigators/AppContainer';
import DetailProduct from '../screens/product/DetailProduct';
import ScreenLoginAndRegister from '../screens/account/screen-acc/ScreenLoginAndRegister';
import OnboardingFirst from '../../container/screens/onboarding/OnboardingFirst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenAdress from '../screens/address/ScreenAdress';
import ScreenOrder from '../screens/order/ScreenOrder';
import {useSelector} from 'react-redux';

export enum NameScreen {
  HOME = 'AppContainer',
  DETAIL_PRODUCT = 'DetailProduct',
  LOGIN_AND_REGISTER = 'ScreenLoginAndRegister',
  ADDRESS = 'ScreenAddress',
  ORDER = 'ScreenOrder',
}

export default function TabNavigator() {
  const {firstOpen} = useSelector((state: any) => state.firstOpen);

  // const [isFirstTimeLoad, setIsFirstTimeLoad] = React.useState<any>(() => {
  //   try {
  //     const data = AsyncStorage.getItem('@is_check');
  //     if (data != null) {
  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // const checkForFirstTimeLoaded = async () => {
  //   const result = await AsyncStorage.getItem('@is_check');
  //   if (result === null) {
  //     // return true;
  //     setIsFirstTimeLoad(true);
  //     // console.log(result);
  //   } else {
  //     // return false;
  //     setIsFirstTimeLoad(false);
  //   }
  // };

  // console.log(isFirstTimeLoad);

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
          name="ScreenLoginAndRegister"
          component={ScreenLoginAndRegister}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
