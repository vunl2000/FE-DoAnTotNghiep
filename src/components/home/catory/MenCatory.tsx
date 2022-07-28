import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import {useSelector} from 'react-redux';
import ContentCatory from './ContentCatory';

type Props = {};

const MenCatory = (props: Props) => {
  const {men} = useSelector((state: any) => state.catory);
  return (
    <View style={styles.container}>
      <Text style={[styles.textDefault, {marginBottom: sizes._8sdp}]}>
        Mua theo thể loại
      </Text>
      <Text
        style={[
          styles.textPlaholder,
          {
            alignSelf: 'flex-end',
            marginBottom: sizes._8sdp,
            marginRight: sizes._10sdp,
          },
        ]}>
        Xem tất cả {'>'}
      </Text>
      {men.slice(0, 8).length > 0 ? (
        <ContentCatory data={men.slice(0, 8)} />
      ) : null}
      <View style={styles.spaceHeight} />
      {men.slice(8, 16).length > 0 ? (
        <ContentCatory data={men.slice(8, 16)} />
      ) : null}
    </View>
  );
};

export default MenCatory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._16sdp,
  },
  space: {
    width: sizes._18sdp,
  },
  spaceHeight: {
    height: sizes._18sdp,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPlaholder: {
    fontSize: sizes._14sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    marginLeft: sizes._8sdp,
    fontWeight: '700',
  },
});
