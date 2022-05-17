import {StyleSheet, StatusBar, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './AppContainer';

export default function App() {
  const {mContainer}: any = styles;
  return (
    <View style={mContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
});
