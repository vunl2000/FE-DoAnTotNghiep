import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import CatoryWomen from '../screens/catory/tab/CatoryWomen';
import CatoryMen from '../screens/catory/tab/CatoryMen';

const Tab = createMaterialTopTabNavigator();
type Props = {};

export enum NameCatory {
  WOMEN = 'CatoryWomen',
  MEN = 'CatoryMen',
}
const MyTabBar = ({state, descriptors, navigation, position}: any) => {
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
              marginTop: sizes._10sdp,
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
};

const TopTabCatory = (props: Props) => {
  return (
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tab.Screen
        name={NameCatory.WOMEN}
        component={CatoryWomen}
        options={{tabBarLabel: 'Nữ'}}
      />
      <Tab.Screen
        name={NameCatory.MEN}
        component={CatoryMen}
        options={{tabBarLabel: 'Nam'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabCatory;

const styles = StyleSheet.create({});
