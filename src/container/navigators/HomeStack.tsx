import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScreensHome from '../screens/ScreensHome';
import MenScreen from '../screens/men/MenScreen';
import WomenScreen from '../screens/women/WomenScreen';
import HomeIndex from '../screens/home/HomeIndex';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

const Tab = createMaterialTopTabNavigator();

type Props = {
  changeScoll?: any;
};

function MyTabBar({state, descriptors, navigation, position}: any) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

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

        const inputRange = state.routes.map((_: any, i: any) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: sizes._32sdp,
            }}>
            <View>
              <Text
                style={{
                  color: isFocused
                    ? ArrayColors._color_black
                    : ArrayColors._color_un_active,
                  fontSize: sizes._18sdp,
                  fontWeight: isFocused ? '600' : '400',
                  fontFamily: isFocused
                    ? 'OpenSans-SemiBold'
                    : 'OpenSans-Regular',
                }}>
                {label}
              </Text>
              <View
                style={{
                  marginTop: sizes._6sdp,
                  height: sizes._1sdp,
                  backgroundColor: isFocused
                    ? ArrayColors._color_black
                    : ArrayColors._color_white,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeStack = (props: Props) => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeIndex}
        options={{
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen
        name="Women"
        component={WomenScreen}
        options={{
          tabBarLabel: 'Nữ',
        }}
      />
      <Tab.Screen
        name="Men"
        component={MenScreen}
        options={{tabBarLabel: 'Nam'}}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
