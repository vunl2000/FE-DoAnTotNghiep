import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import {formartMoney} from '../../utils/Utilities';

export interface Props {
  isShow?: any;
  onChangeShow?: any;
  item?: any;
}

const AddToCart = ({isShow, onChangeShow, item}: Props) => {
  const {image, name, price} = item;

  const addToCart = () => (
    <View style={styles.containerAddCart}>
      <TouchableOpacity>
        <Icons name="heart-outline" size={sizes._24sdp} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={onChangeShow}>
        <Text style={styles.textBtnAdd}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={isShow}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onChangeShow}>
          <View style={styles.emtyView} />
        </TouchableWithoutFeedback>
        <View style={styles.content}>
          {/* San pham */}
          <View>
            <Image source={image} resizeMode="contain" style={styles.img} />
            <Text style={styles.textLabel}>{name}</Text>
            <Text style={styles.textPriceProduct}>{formartMoney(price)}</Text>
          </View>
          <View>
            <Text style={styles.textLabel}>Kích thước</Text>
          </View>
          {addToCart()}
        </View>
      </View>
    </Modal>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_gray_translucen,
  },
  emtyView: {
    width: '100%',
    flex: 1,
    zIndex: 0,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: ArrayColors._color_white,
    paddingTop: sizes._16sdp,
  },
  img: {
    width: sizes._165sdp,
    height: sizes._220sdp,
  },
  containerAddCart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes._16sdp,
  },
  btnAddCart: {
    flex: 1,
    marginVertical: sizes._16sdp,
    marginLeft: sizes._16sdp,
    height: sizes._48sdp,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ArrayColors._color_black,
  },
  textBtnAdd: {
    color: ArrayColors._color_white,
    fontSize: sizes._font_size_big_large,
    fontWeight: '700',
    fontFamily: 'OpenSans-Blod',
  },
  textLabel: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    marginTop: sizes._8sdp,
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_large,
    color: ArrayColors._color_black,
  },
  textPriceProduct: {
    fontWeight: '700',
    width: '100%',
    fontFamily: 'OpenSans-Blod',
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_big,
    color: ArrayColors._color_black,
  },
});
