import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  onPress?: any;
  icon?: any;
  count?: any;
};

const BadgesIcon = (props: Props) => {
  const {onPress, icon, count} = props;
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? ArrayColors.light
            : ArrayColors._color_white,
        },
        styles.container,
      ]}>
      {() => (
        <View style={styles.badgeIconView}>
          {count === 0 ? null : (
            <Text
              style={[
                styles.badge,
                {
                  paddingVertical: sizes._5sdp,
                  paddingHorizontal: count < 10 ? sizes._9sdp : sizes._7sdp,
                },
              ]}>
              {count}
            </Text>
          )}
          <Image source={icon} style={styles.icons} />
        </View>
      )}
    </Pressable>
  );
};

export default BadgesIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeIconView: {
    position: 'relative',
  },
  badge: {
    color: ArrayColors._color_white,
    position: 'absolute',
    zIndex: 10,
    top: -sizes._20sdp,
    right: -sizes._14sdp,
    fontSize: sizes._font_size_medium_medium_medium,
    backgroundColor: ArrayColors._color_red,
    borderRadius: sizes._30sdp,
  },
  icons: {
    width: sizes._24sdp,
    height: sizes._24sdp,
  },
});
