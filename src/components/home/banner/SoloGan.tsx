import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import FastImage from 'react-native-fast-image';

type Props = {
  uri?: any;
  title?: any;
  subtitle?: any;
  subBtn?: any;
  styleCustom?: any;
  resize?: any;
  reserve?: boolean;
};

const SoloGan = ({
  uri,
  title,
  subtitle,
  subBtn,
  styleCustom,
  resize,
  reserve,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: reserve ? 'row-reverse' : 'row',
          marginBottom: sizes._22sdp,
        },
      ]}>
      <FastImage
        source={{uri: uri}}
        style={[styleCustom, styles.img]}
        resizeMode={resize}
      />

      <View
        style={[
          styles.right,
          {
            left: reserve ? 0 : -sizes._22sdp,
          },
        ]}>
        <View style={styles.content}>
          <Text style={styles.textTitleSale}>{title}</Text>
          <View style={styles.space} />
          <Text style={styles.textDefault}>{subtitle}</Text>
          <View style={styles.space} />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: reserve
                  ? ArrayColors.pink
                  : ArrayColors.yellow,
              }}>
              <Text
                style={[
                  styles.textDefault,
                  {
                    marginVertical: sizes._10sdp,
                    marginHorizontal: sizes._18sdp,
                  },
                ]}>
                {subBtn}
              </Text>
            </TouchableOpacity>
            <View style={styles.space} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SoloGan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes._18sdp,
  },
  right: {
    flex: 1,
    justifyContent: 'space-around',
    position: 'relative',
  },
  content: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    width: sizes._csreen_width * 0.63,
    height: sizes._123sdp,
    backgroundColor: ArrayColors._color_white,
    position: 'absolute',
    bottom: -sizes._22sdp,
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._10sdp,
  },
  space: {
    flex: 1,
  },
  spaceHeight: {
    height: sizes._18sdp,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitleSale: {
    fontSize: sizes._16sdp,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    color: ArrayColors.pinkText,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  img: {
    height: sizes._143sdp,
    width: sizes._143sdp,
  },
});
