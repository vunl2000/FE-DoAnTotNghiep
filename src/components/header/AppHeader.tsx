import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import sizes from '../../res/sizes/sizes';
import image from '../../res/require/Images';
import ArrayColors from '../../res/colors/ArrayColors';

export interface Props {
  iconLeft?: boolean;
  onPessIconLeft?: any;
  iconRight?: boolean;
  onPessIconRight?: any;
  logo?: boolean;
  content?: boolean;
  customContent?: any;
}

const AppHeader = (props: Props) => {
  const {
    iconRight,
    onPessIconRight,
    logo,
    content,
    customContent,
    iconLeft,
    onPessIconLeft,
  } = props;
  return (
    <View style={styles.container}>
      {/* Icon Back */}
      {iconLeft ? (
        <TouchableOpacity onPress={() => onPessIconLeft()}>
          <Icons name="chevron-back" size={sizes._24sdp} />
        </TouchableOpacity>
      ) : null}
      {/* Logo */}
      {logo ? (
        <View style={styles.logo}>
          <Image source={image.ic_logo} style={styles.logoImage} />
        </View>
      ) : null}
      {/* Custom */}
      {content ? customContent : null}
      {/* Icon Bag */}
      {iconRight ? (
        <TouchableOpacity onPress={() => onPessIconRight()}>
          <Image source={image.ic_cart} style={styles.iconRight} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height:
      Platform.OS === 'android'
        ? sizes._header_height
        : sizes._header_height - sizes._statusbar_height,
    paddingTop: Platform.OS === 'android' ? sizes._statusbar_height : 0,
    paddingHorizontal: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
  },
  iconRight: {
    width: sizes._24sdp,
    height: sizes._24sdp,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: sizes._100sdp,
    height: sizes._40sdp,
  },
});
