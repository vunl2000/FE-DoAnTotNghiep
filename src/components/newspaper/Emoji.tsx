import React from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import sizes from '../../res/sizes/sizes';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const Emoji = ({
  source,
  index,
  activeIndex,
}: {
  source: ImageSourcePropType;
  index: number;
  activeIndex: Animated.SharedValue<number>;
}) => {
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(
            interpolate(
              activeIndex.value,
              [index - 0.5, index, index + 0.5],
              [1, 1.75, 0.8],
              Extrapolate.CLAMP,
            ),
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image source={source} style={[styles.emoji, animationStyle]} />
  );
};

export default Emoji;

export const EMOJI_BAR_PADDING = sizes._6sdp;
export const EMOJI_BAR_BORDER_RADIUS = sizes._24sdp;
export const EMOJI_SIZE = sizes._36sdp;
export const EMOJI_MARGIN = sizes._6sdp;
const styles = StyleSheet.create({
  emoji: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    marginHorizontal: EMOJI_MARGIN,
  },
});
