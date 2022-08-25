import {StyleSheet, StatusBar, View} from 'react-native';
import React from 'react';
import TabNavigator from '../container/navigators/TabNavigator';
import {useDispatch} from 'react-redux';
import {clearProducts} from '../store/actions/productsActions';

export default function App() {
  const {mContainer}: any = styles;
  const dispatch: any = useDispatch();

  return (
    <View style={mContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <TabNavigator />
      {/* <ServicersNotification /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
});
