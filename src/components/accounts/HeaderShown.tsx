import {StyleSheet, Text, Image, View, Platform} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Images from '../../res/require/Images';
import IconHeader from '../../components/icons/IconHeader';

interface Props {
  titleScreen?: any;
  onBackPress?: () => void;
}

const HeaderShown = (props: Props) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: sizes._24sdp,
            fontWeight: 'bold',
            color: ArrayColors._color_black,
          }}>
          {props.titleScreen}
        </Text>
      </View>

      <View style={{position: 'absolute', left: 0}}>
        <IconHeader
          sizes={sizes._32sdp}
          name={isAndroid ? 'arrow-back' : 'ios-arrow-back-outline'}
          style={styles.mStyleICons}
          onPress={props.onBackPress}
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
