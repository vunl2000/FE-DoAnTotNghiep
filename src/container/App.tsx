import {StyleSheet, StatusBar, View} from 'react-native';
import React from 'react';
import TabNavigator from '../container/navigators/TabNavigator';

export default function App() {
  const {mContainer}: any = styles;

  return (
    <View style={mContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
});
