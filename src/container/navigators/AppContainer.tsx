import {StyleSheet, Text, View, Image, ImageURISource} from 'react-native';
import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {mTabBarOptions} from '../../res/styles/TabBarOptions';
import image from '../../res/require/Images';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
//Screens
import ScreensHome from '../screens/home/ScreensHome';
import ScreensProduct from '../screens/catory/ScreensProduct';
import ScreenCart from '../screens/cart/ScreenCart';
import ScreenNewspaper from '../screens/spaper/ScreenNewspaper';
import ScreenAccount from '../screens/account/ScreenAccount';
import {useRoute} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();
const bottomTab = createBottomTabNavigator();

export enum HomeName {
  INDEX = 'ScreensHome',
  CATORY = 'ScreensProduct',
  CART = 'ScreenCart',
  BLOG = 'ScreenNewspaper',
  ACCOUNT = 'ScreenAccount',
}

const tabBarIcon =
  (active: ImageURISource, inactive: ImageURISource) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) =>
    (
      <Image
        style={{
          width: sizes._26sdp,
          height: sizes._26sdp,
          resizeMode: 'contain',
          tintColor: focused
            ? ArrayColors._color_black
            : ArrayColors._color_un_active,
        }}
        source={focused ? active : inactive}
      />
    );
const tabBarLabel =
  (text: string) =>
  ({focused, color}: {focused: boolean; color: string}) =>
    (
      <Text
        style={{
          fontSize: sizes._16sdp,
          fontWeight: '700',
          fontFamily: 'OpenSans-Bold',
          color: focused
            ? ArrayColors._color_black
            : ArrayColors._color_un_active,
          marginBottom: sizes._14sdp,
        }}>
        {text}
      </Text>
    );

const AppContainer: FC = () => {
  const {numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const initScreen = route.params?.screen;
  return (
    <bottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          backgroundColor: ArrayColors._color_white,
          height: sizes._72sdp,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
      initialRouteName={initScreen != null ? initScreen : initScreen}>
      <bottomTab.Screen
        name={HomeName.INDEX}
        component={ScreensHome}
        options={{
          tabBarLabel: tabBarLabel('Trang chủ'),
          tabBarIcon: tabBarIcon(image.ic_home_active, image.ic_home),
        }}
      />
      <bottomTab.Screen
        name={HomeName.CATORY}
        component={ScreensProduct}
        options={{
          tabBarLabel: tabBarLabel('Sản phẩm'),
          tabBarIcon: tabBarIcon(image.ic_product_active, image.ic_product),
        }}
      />
      <bottomTab.Screen
        name={HomeName.CART}
        component={ScreenCart}
        options={{
          tabBarLabel: tabBarLabel('Giỏ hàng'),
          tabBarBadge: numberCart == 0 ? null : numberCart,
          tabBarIcon: tabBarIcon(image.ic_cart_active, image.ic_cart),
        }}
      />
      <bottomTab.Screen
        name={HomeName.ACCOUNT}
        component={ScreenAccount}
        options={{
          tabBarLabel: tabBarLabel('Tài khoản'),
          tabBarIcon: tabBarIcon(image.ic_account_active, image.ic_account),
        }}
      />
    </bottomTab.Navigator>
  );
};

export default AppContainer;
