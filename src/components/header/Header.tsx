import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import IconHeader from '../icons/IconHeader';
import IconHeaderAnimated from '../icons/IconHeaderAnimated';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import images from '../../res/require/Images';
interface Props {
  onPressEmail?: () => void;
  onPressHeart?: () => void;
  onPressSearch?: () => void;
  onPressCart?: () => void;
  logo?: boolean;
  activeIndexAnimation?: any;
}
const Header: React.FC<Props> = (props: Props) => {
  const {
    mContainer,
    mStyle,
    iconStyle_1,
    iconStyle_2,
    iconStyle_3,
    iconStyle_4,
    mStyleImg,
  } = styles;

  //Kiểm tra thiết bị
  const isAndroid = Platform.OS === 'android';
  return (
    <View style={mContainer}>
      <View style={mStyle}>
        <View style={{flexDirection: 'row'}}>
          <IconHeader
            name={isAndroid ? 'mail-outline' : 'ios-mail-outline'}
            sizes={sizes._24sdp}
            color={ArrayColors._color_black_gray12}
            style={iconStyle_1}
            onPress={props.onPressEmail}
          />
          <IconHeader
            name={isAndroid ? 'heart-outline' : 'ios-heart-outline'}
            sizes={sizes._24sdp}
            color={ArrayColors._color_black_gray12}
            style={iconStyle_2}
            onPress={props.onPressHeart}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: sizes._screen_width / 2.5,
            right: sizes._screen_width / 2.5,
            bottom: 0,
          }}>
          {props.logo && (
            <Image
              source={images.ic_logo}
              style={styles.mStyleImg}
              resizeMode="contain"
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            // left: 0,
            right: sizes._16sdp,
          }}>
          <IconHeaderAnimated
            activeIndexAnimation={props.activeIndexAnimation}
            name={isAndroid ? 'search-outline' : 'ios-search-outline'}
            sizes={sizes._24sdp}
            color={ArrayColors._color_black_light}
            style={iconStyle_3}
            onPress={props.onPressSearch}
          />
          <IconHeader
            name={isAndroid ? 'cart-outline' : 'ios-cart-outline'}
            sizes={sizes._24sdp}
            color={ArrayColors._color_black_gray12}
            style={iconStyle_4}
            onPress={props.onPressCart}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mContainer: {
    height:
      Platform.OS === 'android'
        ? sizes._header_height
        : sizes._header_height - sizes._statusbar_height,
    width: '100%',
    // backgroundColor: 'green',
    paddingTop: Platform.OS === 'android' ? sizes._statusbar_height : 0,
    justifyContent: 'center',
  },
  mStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle_1: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    marginLeft: sizes._16sdp,
  },
  iconStyle_2: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle_3: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconStyle_4: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    // marginRight: sizes._10sdp,
  },
  mStyleImg: {
    width: sizes._100sdp,
    height: sizes._40sdp,
    // s
  },
});
