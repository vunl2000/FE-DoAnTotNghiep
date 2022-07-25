import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import ArrayColors from '../../res/colors/ArrayColors';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type BetterImage = FastImageProps;

const BetterImage: React.FC<BetterImage> = ({style, onLoad, ...rest}) => {
  const [isLoader, setIsLoader] = useState(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isLoader ? 1 : 0, {duration: 300}),
      transform: [{scale: withTiming(isLoader ? 1 : 0.7, {duration: 200})}],
    };
  });
  return (
    <View>
      <AnimatedFastImage
        onLoad={evt => {
          setIsLoader(true);
        }}
        {...rest}
        style={[...(Array.isArray(style) ? style : [style]), animatedStyle]}
      />
      {!isLoader && (
        <View style={[StyleSheet.absoluteFillObject, styles.spinner]}>
          <ActivityIndicator color={ArrayColors._color_black} />
        </View>
      )}
    </View>
  );
};
const AnimatedFastImage = Reanimated.createAnimatedComponent(
  FastImage as React.FC<FastImageProps>,
);
export default BetterImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
