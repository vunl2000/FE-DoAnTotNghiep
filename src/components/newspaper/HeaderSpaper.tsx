import {
  StyleSheet,
  Platform,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import IconHeader from '../icons/IconHeader';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import TitleHome from '../../components/title/TitleHome';
import Images from '../../res/require/Images';

type Props = {
  onPressMessage?: () => void;
  onPressCart?: () => void;
};

const HeaderSpaper = (props: Props) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor:  ArrayColors._color_white,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
      }}>
      <TitleHome
        style={{
          fontSize: sizes._28sdp,
          fontWeight: 'bold',
          fontFamily: 'OpenSans-SemiBold',
          color: ArrayColors._color_black,
        }}
        title="Bảng tin Fashion"
      />
      <View style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
        <IconHeader
          sizes={sizes._24sdp}
          name={isAndroid ? 'cart-outline' : 'ios-cart-outline'}
          style={styles.mStyleICons}
          onPress={props.onPressCart}
        />
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? ArrayColors.light
                : ArrayColors._color_white,
            },
            {
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: sizes._42sdp / 2,
              width: sizes._42sdp,
              height: sizes._42sdp,
            },
          ]}
          onPress={props.onPressMessage}>
          <Image
            source={Images.icons8_facebook_messenger_32}
            style={styles.mStyleImg}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderSpaper;

const styles = StyleSheet.create({
  mStyleICons: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : ArrayColors.darkGrayAccount
  },

  mStyleImg: {
    borderRadius: sizes._24sdp / 2,
    width: sizes._24sdp,
    height: sizes._24sdp,

    // backgroundColor : ArrayColors.darkGrayAccount
  },
});
