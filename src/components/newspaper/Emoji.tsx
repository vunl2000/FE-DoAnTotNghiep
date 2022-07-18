import React from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';

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
              [index - 1, index, index + 1],
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

export const EMOJI_BAR_PADDING = 4;
export const EMOJI_BAR_BORDER_RADIUS = 16;
export const EMOJI_SIZE = 28;
export const EMOJI_MARGIN = 2;
const styles = StyleSheet.create({
  emoji: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    marginHorizontal: EMOJI_MARGIN,
  },
});
