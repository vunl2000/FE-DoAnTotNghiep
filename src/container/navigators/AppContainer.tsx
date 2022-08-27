import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageURISource,
  TouchableOpacity,
} from 'react-native';
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
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {clearRateComent} from '../../store/actions/invoiceActions';

// const Tab = createBottomTabNavigator();
const bottomTab = createBottomTabNavigator();

export enum HomeName {
  INDEX = 'ScreensHome',
  CATORY = 'ScreensProduct',
  CART = 'ScreenCart',
  BLOG = 'ScreenNewspaper',
  ACCOUNT = 'ScreenAccount',
}

const imageTabBar = [
  {active: image.ic_home_active, unactive: image.ic_home},
  {active: image.ic_product_active, unactive: image.ic_product},
  {active: image.ic_cart_active, unactive: image.ic_cart},
  {active: image.ic_account_active, unactive: image.ic_account},
];

function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: sizes._72sdp,
        backgroundColor: ArrayColors._color_white,
        elevation: 2,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const imageAction = imageTabBar[index];
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={1}
            key={route.key}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: sizes._26sdp,
                height: sizes._26sdp,
                resizeMode: 'contain',
                tintColor: isFocused
                  ? ArrayColors._color_black
                  : ArrayColors._color_un_active,
              }}
              source={isFocused ? imageAction.active : imageAction.unactive}
            />
            <View style={{height: sizes._8sdp}} />
            <Text
              style={{
                fontSize: sizes._16sdp,
                fontWeight: '700',
                fontFamily: 'OpenSans-Bold',
                color: isFocused
                  ? ArrayColors._color_black
                  : ArrayColors._color_un_active,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AppContainer: FC = () => {
  const {numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const initScreen = route.params?.screen;
  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        dispatch(clearRateComent());
        console.log('clear comment');
      };
    }, []),
  );

  return (
    <bottomTab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
      initialRouteName={initScreen}>
      <bottomTab.Screen
        name={HomeName.INDEX}
        component={ScreensHome}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <bottomTab.Screen
        name={HomeName.CATORY}
        component={ScreensProduct}
        options={{
          tabBarLabel: 'Sản phẩm',
        }}
      />
      <bottomTab.Screen
        name={HomeName.CART}
        component={ScreenCart}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: numberCart == 0 ? null : numberCart,
        }}
      />
      <bottomTab.Screen
        name={HomeName.ACCOUNT}
        component={ScreenAccount}
        options={{
          tabBarLabel: 'Tài khoản',
        }}
      />
    </bottomTab.Navigator>
  );
};

export default AppContainer;
