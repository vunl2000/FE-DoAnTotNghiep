import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {Badge} from 'react-native-paper';

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
            <Badge size={sizes._18sdp} style={styles.badge}>
              {count}
            </Badge>
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
    position: 'absolute',
    top: -sizes._16sdp,
    right: -sizes._10sdp,
  },
  icons: {
    width: sizes._24sdp,
    height: sizes._24sdp,
  },
});
