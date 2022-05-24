import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AppContainer from '../navigators/AppContainer';

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="AppContainer"
          component={AppContainer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
