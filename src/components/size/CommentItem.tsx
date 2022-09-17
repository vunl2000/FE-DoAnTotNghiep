import {StyleSheet, Text, View, FlatList, ColorValue} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import CustomRatingBar from '../product/CustomRatingBar';
import Banner from '../home/banner/Banner';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  item?: any;
  index?: any;
  size?: any;
  color?: any;
};
const imageProduct = [
  'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1661154818860.jpeg',
  'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1661154819670.jpeg',
  'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1661154820172.jpeg',
  'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1661154820839.jpeg',
  'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1661154821597.jpeg',
];

const ColorAndSize = (color: ColorValue, size: string) => (
  <View style={styles.contentShow}>
    <Text style={styles.textDefault}>Màu sắc: </Text>
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
    <Text style={styles.textDefault}>Kích thước: </Text>
    <Text style={styles.textSize}>{size}</Text>
  </View>
);

const renderImage = ({item, index}: any) => (
  <FastImage
    source={{
      uri: item,
      // cache: FastImage.cacheControl.web,
      // priority: FastImage.priority.high,
    }}
    style={styles.img}
    resizeMode={FastImage.resizeMode.cover}
  />
);
const keyDefault = (item: any, index: number) => index.toString();
const space = () => <View style={styles.spaceMediumY} />;

const CommentItem = ({index, item, size, color}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.textLabel}>{item.userName}</Text>
        <CustomRatingBar
          defaultRating={
            item.fiveStars !== 0
              ? item.fiveStars
              : item.fourStars !== 0
              ? item.fourStars
              : item.threeStars !== 0
              ? item.threeStars
              : item.twoStars !== 0
              ? item.twoStars
              : item.oneStars !== 0
              ? item.oneStars
              : 0
          }
        />
      </View>
      {item.imageUserPush != 0 ? (
        <>
          <View style={styles.spaceMediumX} />
          <FlatList
            data={item.imageUserPush}
            renderItem={renderImage}
            horizontal
            ItemSeparatorComponent={space}
            keyExtractor={keyDefault}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </>
      ) : null}
      <View style={styles.spaceMediumX} />
      {ColorAndSize(color, size)}
      <View style={styles.spaceMediumX} />
      <Text style={styles.textDefault}>{item.content}</Text>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._10sdp,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textLabel: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  img: {
    width: sizes._112sdp,
    height: sizes._112sdp,
  },
  spaceMediumY: {
    width: sizes._10sdp,
  },
  spaceMediumX: {
    height: sizes._10sdp,
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
  contentShow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: sizes._24sdp,
    borderRadius: sizes._24sdp / 2,
  },
  spaceLager: {
    flex: 1,
  },
});
