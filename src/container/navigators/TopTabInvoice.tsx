import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MenScreen from '../screens/men/MenScreen';
import WomenScreen from '../screens/women/WomenScreen';
import HomeIndex from '../screens/home/HomeIndex';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import ScreenHandle from '../screens/invoice/ScreenHandle';
import ScreenProcessed from '../screens/invoice/ScreenProcessed';
import ScreenTransport from '../screens/invoice/ScreenTransport';
import ScreenDone from '../screens/invoice/ScreenDone';

const Tab = createMaterialTopTabNavigator();

type Props = {};
export enum InvoiceName {
  HANDLE = 'ScreenHandle',
  PROCESS = 'ScreenProcessed',
  DONE = 'ScreenDone',
  TRANSPORT = 'ScreenTransport',
}

const TopTabInvoice = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: sizes._4sdp,
          backgroundColor: ArrayColors._color_black,
        },
        tabBarItemStyle: {width: 'auto', minWidth: sizes._100sdp},
        tabBarShowIcon: false,
        tabBarLabelStyle: {
          textTransform: 'none',
          fontFamily: 'OpenSans-Bold',
          fontWeight: '700',
          fontSize: sizes._18sdp,
        },
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: ArrayColors._color_black,
      }}>
      <Tab.Screen
        name={InvoiceName.HANDLE}
        component={ScreenHandle}
        options={{tabBarLabel: 'Chờ xác nhận'}}
      />
      <Tab.Screen
        name={InvoiceName.PROCESS}
        component={ScreenProcessed}
        options={{tabBarLabel: 'Đang xử lý'}}
      />
      <Tab.Screen
        name={InvoiceName.TRANSPORT}
        component={ScreenTransport}
        options={{tabBarLabel: 'Đang vận chuyển'}}
      />
      <Tab.Screen
        name={InvoiceName.DONE}
        component={ScreenDone}
        options={{tabBarLabel: 'Đã mua'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabInvoice;

const styles = StyleSheet.create({
  contentHeader: {
    flexDirection: 'column',
    height: sizes._48sdp,
    paddingHorizontal: sizes._10sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline: {
    height: sizes._4sdp,
    borderRadius: sizes._2sdp,
  },
});
