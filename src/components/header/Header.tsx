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
import TitleHome from '../title/TitleHome';
import LogoFashion from '../icons/LogoFashion';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import images from '../../res/require/Images';
interface Props {
  onPressEmail?: () => void;
  onPressHeart?: () => void;
  onPressSearch?: () => void;
  onPressCart?: () => void;
  logo?: boolean;
}
const Header: React.FC<Props> = props => {
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
    <SafeAreaView style={mContainer}>
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

        {props.logo && (
          <Image
            source={images.ic_logo}
            style={styles.mStyleImg}
            resizeMode="contain"
          />
        )}

        {/* {props.logo && (
          <Image
            source={images.ic_logo}
            style={styles.mStyleImg}
            resizeMode="contain"
          />
        )} */}

        <View style={{flexDirection: 'row'}}>
          <IconHeader
            name={isAndroid ? 'search-outline' : 'ios-search-outline'}
            sizes={sizes._24sdp}
            color={ArrayColors._color_black_gray12}
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
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  mContainer: {
    height: sizes._header_height,
    width: '100%',
    // backgroundColor: 'green',
    paddingTop: sizes._statusbar_height,
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
    marginLeft: sizes._10sdp,
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
  },
  iconStyle_4: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    marginRight: sizes._10sdp,
  },
  mStyleImg: {
    width: sizes._100sdp,
    height: sizes._40sdp,
  },
});
