import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import {sin} from 'react-native-reanimated';
import sizes from '../../res/sizes/sizes';
import image from '../../res/require/Images';
import {Divider} from 'react-native-paper';

type Props = {};

const TranSport = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSub}>Vận chuyển</Text>
      <View style={styles.content}>
        <Image
          source={image.delivery}
          style={styles.iconDelivery}
          resizeMode="contain"
        />
        <Text style={styles.textDefault}>Giao hàng tiết kiệm</Text>
      </View>
      <Divider />
      <View style={styles.content}>
        <Image
          source={image.schedule}
          style={styles.iconDelivery}
          resizeMode="contain"
        />
        <Text style={styles.textDefault}>
          Dự kiến thời gian nhận hàng là 3 ngày kể từ khi đơn vị vận chuyển tiếp
          nhận hàng.
        </Text>
      </View>
    </View>
  );
};

export default TranSport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._8sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  iconDelivery: {
    width: sizes._22sdp,
    height: sizes._22sdp,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    marginLeft: sizes._16sdp,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: sizes._8sdp,
    height: sizes._72sdp,
    alignItems: 'center',
  },
});
