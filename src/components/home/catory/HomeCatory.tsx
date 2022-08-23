import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import {useSelector} from 'react-redux';
import ContentCatory from './ContentCatory';
import {useNavigation} from '@react-navigation/native';
import {HomeName} from '../../../container/navigators/AppContainer';

type Props = {};

const HomeCatory = (props: Props) => {
  const {women, men, accessory} = useSelector((state: any) => state.catory);
  const {navigate}: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={[styles.textDefault, {marginBottom: sizes._8sdp}]}>
        Mua theo thể loại
      </Text>
      <TouchableWithoutFeedback onPress={() => navigate(HomeName.CATORY)}>
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
      </TouchableWithoutFeedback>

      {women.slice(0, 8).length === 8 ? (
        <>
          <ContentCatory data={women.slice(0, 8)} keyList="firts_catory_home" />
        </>
      ) : null}

      {men.slice(0, 8).length === 8 ? (
        <>
          <View style={styles.spaceHeight} />
          <ContentCatory data={men.slice(0, 8)} keyList="next_catory_home" />
        </>
      ) : null}

      {accessory.slice(0, 8).length === 8 ? (
        <>
          <View style={styles.spaceHeight} />
          <ContentCatory
            data={accessory.slice(0, 8)}
            keyList="second_catory_home"
          />
        </>
      ) : null}
    </View>
  );
};

export default HomeCatory;

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
