import {StyleSheet, Image, View, Platform} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Images from '../../res/require/Images';
import IconHeader from '../../components/icons/IconHeader';
type Props = {};

const HeaderShown = ({navigation}: {navigation: any}) => {
  const isAndroid = Platform.OS === 'android';

  function onBackPress() {
    navigation.goBack();
  }
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: sizes._screen_width / 3.5,
          height: sizes._48sdp,
          marginTop: sizes._48sdp,
        }}
        source={Images.ic_logo}
      />
      <View style={{position: 'absolute', right: 0}}>
        <IconHeader
          sizes={sizes._32sdp}
          name={isAndroid ? 'close' : 'md-close-sharp'}
          style={styles.mStyleICons}
          onPress={onBackPress}
        />
      </View>
    </View>
  );
};

export default HeaderShown;

const styles = StyleSheet.create({
  mStyleICons: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
