import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import image from '../../res/require/Images';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {};

const Location = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textSub,
          {marginLeft: sizes._18sdp, marginBottom: sizes._8sdp},
        ]}>
        Địa chỉ
      </Text>
      <View style={styles.location}>
        <View style={styles.row}>
          <View style={styles.content}>
            <Text style={styles.textSub}>Nguyễn Văn A</Text>
            <Text style={[styles.textPlaholder, {marginLeft: sizes._12sdp}]}>
              098983938
            </Text>
          </View>
          <Text
            style={[
              styles.textPlaholder,
              {
                flex: 1,
                textAlignVertical: 'center',
                paddingTop: sizes._8sdp,
              },
            ]}>
            Ngõ 192
          </Text>
          <Text
            style={[
              styles.textPlaholder,
              {
                flex: 1,
                textAlignVertical: 'center',
                paddingVertical: sizes._8sdp,
              },
            ]}>
            Nam Từ Liêm, Hà Nội
          </Text>
        </View>

        <Icon
          name="chevron-forward"
          size={sizes._24sdp}
          color={ArrayColors._color_black}
          style={styles.icon}
        />
      </View>
      <Image
        source={image.airmail_envelope}
        style={styles.img}
        resizeMode="cover"
      />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    marginTop: sizes._16sdp,
    paddingTop: sizes._8sdp,
  },
  img: {
    height: sizes._7sdp,
    opacity: 0.5,
  },
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
    alignItems: 'center',
    paddingVertical: sizes._8sdp,
  },
  location: {
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
  },
});
