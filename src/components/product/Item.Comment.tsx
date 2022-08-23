import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomRatingBar from './CustomRatingBar';
import {Divider} from 'react-native-paper';
type Props = {
  data?: any;
};

const ItemComment = ({data}: Props) => {
  const {userName, comment, imgUrl, color, size, defaultRating} = data;
  const ColorAndSize = () => (
    <View style={styles.contentShow}>
      <Text style={styles.textPlahoder}>Màu sắc: </Text>
      <View
        style={[
          styles.color,
          {
            backgroundColor: color,
          },
        ]}
      />
      <Icon
        name="slash-forward"
        size={sizes._18sdp}
        color={ArrayColors._color_black}
      />
      <Text style={styles.textPlahoder}>
        Kích thước: <Text style={styles.textSize}>{size}</Text>
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.spaceMedium} />
      <View style={styles.content}>
        <Text style={styles.textLabel}>{userName}</Text>
        <CustomRatingBar defaultRating={defaultRating} />
      </View>
      <View style={styles.spaceMedium} />
      <ColorAndSize />
      <View style={styles.spaceMedium} />
      <Text style={styles.textDefault}>{comment}</Text>
      <View style={styles.spaceMedium} />
      {imgUrl ? null : null}
      <Divider />
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: sizes._18sdp,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    backgroundColor: ArrayColors.white,
    height: sizes._10sdp,
    width: undefined,
  },
  label: {
    flex: 1.5,
  },
  spaceMax: {
    flex: 3.5,
    elevation: 4,
  },
  spaceMedium: {
    height: sizes._18sdp,
  },
  textLabel: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  textDefault: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  textPlahoder: {
    fontSize: sizes._14sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  contentShow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArrayColors.white,
    height: sizes._24sdp,
    borderRadius: sizes._24sdp / 2,
  },
  color: {
    width: sizes._12sdp,
    height: sizes._12sdp,
    borderRadius: sizes._12sdp / 2,
  },
  textSize: {
    fontWeight: '700',
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
  },
});
