import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import sizes from '../../res/sizes/sizes';
import BetterImage from '../images/BetterImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrayColors from '../../res/colors/ArrayColors';
import {formartMoney} from '../../utils/Utilities';
import ButtonQty from './ButtonQty';
import CustomCheckBox from './CheckBox';
import {useDispatch} from 'react-redux';
import {changeSelectCart} from '../../store/actions/productsActions';

type Props = {
  item?: any;
};

const CartItem = ({item}: Props) => {
  const dispatch: any = useDispatch();

  const changeSelected = () => {
    dispatch(changeSelectCart(item.id));
  };

  const ColorAndSize = () => (
    <View style={styles.contentShow}>
      <View
        style={[
          styles.color,
          {
            backgroundColor:
              item.color === '#00000'
                ? ArrayColors._color_black
                : item.color === '#fffff'
                ? ArrayColors.white
                : item.color,
          },
        ]}
      />
      <Icon
        name="slash-forward"
        size={sizes._18sdp}
        color={ArrayColors._color_black}
      />
      <Text style={styles.textSize}>{item.size}</Text>
      <Icon
        name="chevron-down"
        size={sizes._18sdp}
        color={ArrayColors._color_black}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomCheckBox checked={item.selected} changeSelected={changeSelected} />
      <View style={styles.space} />
      <BetterImage
        source={{
          uri: item.image,
        }}
        style={styles.img}
        resizeMode="contain"
      />
      <View style={styles.space} />
      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.maxWidth}>
            <Text
              style={styles.textNameProduct}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <ColorAndSize />
              <View style={styles.spaceLager} />
            </View>
          </View>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="heart-plus-outline"
              size={sizes._24sdp}
              color={ArrayColors._color_black}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContent}>
          <Text style={styles.itemPrice}>{formartMoney(item.price)}</Text>
          <ButtonQty value={item.quantity} id={item.id} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: sizes._16sdp,
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
    fontSize: sizes._font_size_large,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    width: '100%',
    flexWrap: 'wrap',
    color: ArrayColors._color_un_active,
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: sizes._8sdp,
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
    fontSize: sizes._font_size_big_large,
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
