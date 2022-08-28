import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import FastImage from 'react-native-fast-image';
import {formartMoney} from '../../utils/Utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  index?: any;
  item?: any;
  render?: any;
};

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

const InvoiceItemDetail = ({index, item, render}: Props) => {
  return (
    <View style={styles.mContainer}>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: item.imageProduct,
            cache: FastImage.cacheControl.web,
            priority: FastImage.priority.high,
          }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.contain}
          fallback
        />
        <View style={styles.space} />
        <View style={styles.content}>
          <View style={styles.topContent}>
            <View style={styles.maxWidth}>
              <Text
                style={styles.textNameProduct}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item.titleProduct}
              </Text>
            </View>
            <Text style={styles.textSub}>{item.quantity} sản phẩm</Text>
          </View>
          {ColorAndSize(item.colorProduct, item.sizeProduct)}
          <View style={styles.bottomContent}>
            <Text style={styles.textDefault}>
              Đơn giá:{' '}
              <Text style={styles.itemPrice}>{formartMoney(item.price)}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvoiceItemDetail;

const styles = StyleSheet.create({
  mContainer: {
    padding: sizes._18sdp,
    backgroundColor: ArrayColors._color_white,
  },
  container: {
    flexDirection: 'row',
  },
  img: {
    width: sizes._110sdp,
    height: sizes._140sdp,
  },
  content: {
    flex: 1,
  },
  textNameProduct: {
    fontSize: sizes._16sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_un_active,
  },
  textSub: {
    fontSize: sizes._14sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_black,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_black,
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: sizes._8sdp,
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: sizes._12sdp,
  },
  maxWidth: {
    flex: 1,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemPrice: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
  },
  contentShow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes._24sdp,
    borderRadius: sizes._24sdp / 2,
    marginTop: sizes._18sdp,
  },
  spaceLager: {
    flex: 1,
  },
  color: {
    width: sizes._12sdp,
    height: sizes._12sdp,
    borderRadius: sizes._12sdp / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSize: {
    fontWeight: '700',
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
  },
  space: {
    width: sizes._16sdp,
  },
});
