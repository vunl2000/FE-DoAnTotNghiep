import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import CustomCheckBox from '../cart/CheckBox';
import {Address} from '../../store/reducer/addressReducer';
import {useDispatch} from 'react-redux';
import {setDefaultAddress} from '../../store/actions/addressActions';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item?: Address;
  index?: number;
};

const ListAddressItem = ({item, index}: Props) => {
  const dispatch: any = useDispatch();
  const {goBack}: any = useNavigation();

  const onChangeDefault = () => {
    dispatch(setDefaultAddress(item?.id));
    goBack();
  };

  return (
    <View
      style={[styles.container, {marginTop: index == 0 ? 0 : sizes._10sdp}]}>
      <View style={styles.contentRow}>
        <Text style={styles.textSub}>
          {item?.firstName + ' ' + item?.lastName}
        </Text>
        <Text
          style={[
            styles.textPlaholder,
            styles.spaceMax,
            {marginLeft: sizes._18sdp},
          ]}>
          {item?.numberPhone}
        </Text>
      </View>
      <View style={styles.space} />
      <View style={styles.contentRow}>
        <View style={styles.spaceMax}>
          <Text
            style={styles.textDefault}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item?.fullAddress}
          </Text>
          <View style={styles.space} />
          <Text
            style={styles.textPlaholder}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item?.commune + ', ' + item?.district + ', ' + item?.cityProvince}
          </Text>
        </View>
        <View style={styles.space} />
        <CustomCheckBox
          checked={item?.default}
          changeSelected={onChangeDefault}
        />
      </View>
    </View>
  );
};

export default ListAddressItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes._18sdp,
    backgroundColor: ArrayColors._color_white,
  },
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textDefault: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  spaceMax: {
    flex: 1,
  },
  spaceMedium: {
    height: sizes._18sdp,
  },
  space: {
    height: sizes._10sdp,
    width: sizes._10sdp,
  },
});
