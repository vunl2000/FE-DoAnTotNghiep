import {StyleSheet, Text, View, Animated, Pressable} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  animatedValues?: any;
  setMarginRight?: any;
  marginRight?: any;
  setMarginLeft?: any;
  marginLeft?: any;
  textLeft?: string | any;
  textRight?: string | any;
  onPressLeft?: () => void;
  onPressRight?: () => void;
};

const AnimatedTab = (props: Props) => {
  return (
    <>
      <View style={styles.mContainFlashList}>
        <View>
          <Pressable
            onPress={props.onPressLeft}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? ArrayColors.light
                  : ArrayColors._color_white,
              },
              {
                justifyContent: 'center',
                alignItems: 'center',
                width: sizes._screen_width / 2,
                height: sizes._48sdp,
              },
            ]}>
            <Text
              style={{
                fontSize: sizes._18sdp,
                fontWeight: 'bold',
                fontFamily: 'OpenSans-SemiBold',
                color: ArrayColors._color_black,
              }}>
              {props.textLeft}
            </Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            // invisible1
            onPress={props.onPressRight}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? ArrayColors.light
                  : ArrayColors._color_white,
              },
              {
                justifyContent: 'center',
                alignItems: 'center',
                width: sizes._screen_width / 2,
                height: sizes._48sdp,
              },
            ]}>
            <Text
              style={{
                fontSize: sizes._18sdp,
                fontWeight: 'bold',
                fontFamily: 'OpenSans-SemiBold',
                color: ArrayColors._color_black,
              }}>
              {props.textRight}
            </Text>
          </Pressable>
        </View>
      </View>
      <Animated.View
        style={{
          backgroundColor: ArrayColors._color_black,
          height: sizes._5sdp,
          width: sizes._screen_width / 2,
          // marginHorizontal: sizes._screen_width / 4,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
        }}></Animated.View>
    </>
  );
};

export default AnimatedTab;

const styles = StyleSheet.create({
  mContainFlashList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sizes._screen_width,
  },
});
