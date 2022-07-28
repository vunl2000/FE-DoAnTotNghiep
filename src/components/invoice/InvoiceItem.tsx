import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import FastImage from 'react-native-fast-image';
import {TypeBill, TypeBillDetail} from '../../store/actions/types';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  index?: any;
  item?: any;
};

const InvoiceItem = ({index, item}: Props) => {
  const {navigate}: any = useNavigation();
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    item.billDetails.forEach((item: any) => {
      price += item.quantity * item.price;
    });
    setPrice(price);
  }, []);

  const Active = () => (
    <View
      style={[
        styles.container,
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: sizes._10sdp,
        },
      ]}>
      <Text style={styles.textDefault}>#{item?._id}</Text>
      <View style={[styles.container, {alignItems: 'center'}]}>
        <View
          style={[
            styles.color,
            {
              backgroundColor:
                item.status === 0
                  ? ArrayColors.red
                  : item.status === 1
                  ? ArrayColors.green
                  : item.status === 2
                  ? ArrayColors.skyBlue
                  : ArrayColors._color_orange,
            },
          ]}
        />
        <View style={styles.space} />
        <Text style={styles.textSub}>
          {item.status === 0
            ? 'Chờ xác nhận'
            : item.status === 1
            ? 'Đang xử lý'
            : item.status === 2
            ? 'Đang vận chuyển'
            : 'Đã mua'}
        </Text>
      </View>
    </View>
  );
  return (
    <TouchableOpacity style={styles.mContainer} onPress={() => {}}>
      <Active />
      <View style={styles.container}>
        <FastImage
          source={{
            uri: item.billDetails[0].imageProduct,
            cache: FastImage.cacheControl.cacheOnly,
          }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.space} />
        <View style={styles.content}>
          <View style={styles.topContent}>
            <View style={styles.maxWidth}>
              <Text
                style={styles.textNameProduct}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item.billDetails[0].titleProduct}
              </Text>
            </View>
            <Text style={styles.textSub}>
              {item.billDetails.length} sản phẩm
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.textDefault}>
              Tổng cộng:{' '}
              <Text style={styles.itemPrice}>{formartMoney(price)}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvoiceItem;

const styles = StyleSheet.create({
  mContainer: {
    padding: sizes._18sdp,
    backgroundColor: ArrayColors._color_white,
    marginTop: sizes._10sdp,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArrayColors.gray_bg_light,
    height: sizes._24sdp,
    borderRadius: sizes._24sdp / 2,
    marginTop: sizes._12sdp,
    paddingHorizontal: sizes._8sdp,
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
