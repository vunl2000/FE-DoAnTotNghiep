import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {Divider} from 'react-native-paper';
type Props = {};

const Pay = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textSub, {marginBottom: sizes._8sdp}]}>
        Thanh toán
      </Text>
      <View style={styles.rowContent}>
        <View
          style={[
            styles.containerCheckbox,
            {backgroundColor: ArrayColors._color_black},
          ]}>
          <MaterialCommunityIcons
            name="check-bold"
            size={sizes._20sdp}
            color={ArrayColors._color_white}
          />
        </View>
        <View style={[styles.rowContent, {marginLeft: sizes._16sdp}]}>
          <Image
            source={image.ship_cod}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={[styles.textDefault, {marginLeft: sizes._16sdp}]}>
            Thanh toán khi nhận hàng
          </Text>
        </View>
      </View>
      <Divider />
      <View style={[styles.rowContent, {opacity: 0.5}]}>
        <View
          style={[
            styles.containerCheckbox,
            {backgroundColor: ArrayColors._color_white},
          ]}>
          <MaterialCommunityIcons
            name="check-bold"
            size={sizes._20sdp}
            color={ArrayColors._color_white}
          />
        </View>
        <View style={[styles.rowContent, {marginLeft: sizes._16sdp}]}>
          <Image
            source={image.credit_card}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={[styles.textDefault, {marginLeft: sizes._16sdp}]}>
            Thẻ tín dụng/ghi nợ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._8sdp,
  },
  containerCheckbox: {
    width: sizes._26sdp,
    height: sizes._26sdp,
    borderRadius: sizes._26sdp / 2,
    borderWidth: sizes._2sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes._72sdp,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  img: {
    width: sizes._50sdp,
    height: sizes._50sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
});
