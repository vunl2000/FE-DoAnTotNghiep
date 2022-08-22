import {StyleSheet, Platform, View} from 'react-native';
import React from 'react';
import IconHeader from '../../components/icons/IconHeader';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  onPressSetting?: () => void;
  onPressCart?: () => void;
};

const HeaderAccounts = (props: Props) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'transparent',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <IconHeader
        sizes={sizes._24sdp}
        name={isAndroid ? 'settings-outline' : 'ios-settings-outline'}
        style={styles.mStyleICons}
        onPress={props.onPressSetting}
      />

      <IconHeader
        sizes={sizes._24sdp}
        name={isAndroid ? 'cart-outline' : 'ios-cart-outline'}
        style={styles.mStyleICons}
        onPress={props.onPressCart}
      />
    </View>
  );
};

export default HeaderAccounts;

const styles = StyleSheet.create({
  mStyleICons: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : ArrayColors.darkGrayAccount
  },
});
