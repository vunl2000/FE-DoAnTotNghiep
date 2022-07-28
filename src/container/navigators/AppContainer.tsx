import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
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

const mTabBarOptions: any = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#fff',
  tabBarStyle: {
    position: 'absolute',
    elevation: 0,
    backgroundColor: '#fff',
    height: sizes._80sdp,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const AppContainer: FC = () => {
  const {numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const initScreen = route.params?.screen;

  return (
    <bottomTab.Navigator
      screenOptions={mTabBarOptions}
      initialRouteName={initScreen != null ? initScreen : 'HomeScreen'}>
      <bottomTab.Screen
        name="HomeScreen"
        component={ScreensHome}
        options={{
          tabBarIcon: ({focused}: any) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: sizes._3sdp,
              }}>
              <Image
                source={focused ? image.ic_home_active : image.ic_home}
                resizeMode="contain"
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,
                  tintColor: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontWeight: '700',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: sizes._15sdp,
                }}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <bottomTab.Screen
        name="ScreensProduct"
        component={ScreensProduct}
        options={{
          tabBarIcon: ({focused}: any) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: sizes._3sdp,
              }}>
              <Image
                source={focused ? image.ic_product_active : image.ic_product}
                resizeMode="contain"
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,

                  tintColor: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontWeight: '700',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: sizes._15sdp,
                }}>
                Sản phẩm
              </Text>
            </View>
          ),
        }}
      />
      <bottomTab.Screen
        name="ScreenCart"
        component={ScreenCart}
        options={{
          tabBarBadge: numberCart == 0 ? null : numberCart,
          tabBarIcon: ({focused}: any) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: sizes._3sdp,
              }}>
              <Image
                source={focused ? image.ic_cart_active : image.ic_cart}
                resizeMode="contain"
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,
                  tintColor: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontWeight: '700',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: sizes._15sdp,
                }}>
                Giỏ hàng
              </Text>
            </View>
          ),
        }}
      />
      <bottomTab.Screen
        name="ScreenNewspaper"
        component={ScreenNewspaper}
        options={{
          tabBarIcon: ({focused}: any) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: sizes._3sdp,
              }}>
              <Image
                source={focused ? image.ic_paper_active : image.ic_paper}
                resizeMode="contain"
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,
                  tintColor: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontWeight: '700',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: sizes._15sdp,
                }}>
                Xã hội
              </Text>
            </View>
          ),
        }}
      />
      <bottomTab.Screen
        name="ScreenAccount"
        component={ScreenAccount}
        options={{
          // headerShown: false,
          tabBarIcon: ({focused}: any) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: sizes._3sdp,
              }}>
              <Image
                source={focused ? image.ic_account_active : image.ic_account}
                resizeMode="contain"
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,
                  tintColor: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontWeight: '700',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: sizes._15sdp,
                }}>
                Tài khoản
              </Text>
            </View>
          ),
        }}
      />
    </bottomTab.Navigator>
  );
};

export default AppContainer;
const styles = StyleSheet.create({
  wrapperCustom: {},
});
