import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import {formartMoney} from '../../utils/Utilities';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../store/actions/productsActions';
import BetterImage from '../images/BetterImage';

export interface Props {
  isShow?: any;
  onChangeShow?: any;
  item?: any;
}

const colorRender = (
  positions: any,
  index: number,
  color: string,
): ViewStyle => ({
  width: positions != index ? sizes._30sdp : sizes._26sdp,
  height: positions != index ? sizes._30sdp : sizes._26sdp,
  borderRadius: positions == index ? sizes._32sdp / 2 : sizes._28sdp / 2,
  backgroundColor:
    color == '#ffffff'
      ? ArrayColors._color_blue_light
      : color == '#00000'
      ? ArrayColors._color_white_black
      : color,
});

const AddToCart = ({isShow, onChangeShow, item}: Props) => {
  const dispatch: any = useDispatch();

  const {_id, imageProduct, title_product, price, size_product, color_product} =
    item;

  const [sizeSelected, setSizeSelected] = useState({
    size: '',
    onSelected: null,
  });
  const [colorSelected, setColorSelected] = useState({
    color: '',
    onSelected: null,
  });
  const clearOptions = () => {
    setColorSelected({
      color: '',
      onSelected: null,
    });
    setSizeSelected({
      size: '',
      onSelected: null,
    });
  };
  const showToastWithGravityAndOffset = (msg: string | any) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const spaceItem = () => <View style={styles.space} />;
  const addCart = () => {
    if (sizeSelected.size !== '' && colorSelected.color !== '') {
      dispatch(addToCart(item, sizeSelected.size, colorSelected.color));
      clearOptions();
      onChangeShow();
      return showToastWithGravityAndOffset('Đã thêm vào giỏ hàng!');
    }
    return showToastWithGravityAndOffset('Vui lòng chọn size và màu!');
  };

  const onSelectedSize = (val: any, index: any) => {
    index != sizeSelected.onSelected
      ? setSizeSelected({size: val, onSelected: index})
      : setSizeSelected({size: '', onSelected: null});
  };
  const onSelectedColor = (val: any, index: any) => {
    index != colorSelected.onSelected
      ? setColorSelected({color: val, onSelected: index})
      : setColorSelected({color: '', onSelected: null});
  };

  const keyItem = (item: any, index: number) => index.toString();

  const renderItem = ({item, index}: any) => (
    <BetterImage
      source={{
        uri: item,
      }}
      style={styles.img}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
  const AddToCart = () => (
    <View style={styles.containerAddCart}>
      <TouchableOpacity>
        <Icons name="heart-outline" size={sizes._24sdp} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={addCart}>
        <Text style={styles.textBtnAdd}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  const ColorProduct = () => (
    <>
      {color_product != null ? (
        <View>
          <Text style={styles.textLabel}>Màu sắc</Text>
          <View style={styles.renderList}>
            {color_product.map((_item: any, index: number) => {
              return (
                <TouchableWithoutFeedback
                  key={index.toString()}
                  onPress={() => onSelectedColor(_item, index)}>
                  <View
                    style={[
                      styles.colorItem,
                      {
                        borderWidth:
                          colorSelected.onSelected == index ? sizes._2sdp : 0,
                        borderColor:
                          colorSelected.onSelected == index
                            ? ArrayColors._color_black
                            : ArrayColors._color_white,
                      },
                    ]}>
                    <View
                      style={colorRender(
                        colorSelected.onSelected,
                        index,
                        _item,
                      )}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      ) : null}
    </>
  );

  const SizeProduct = () => (
    <View>
      <Text style={styles.textLabel}>Kích thước</Text>
      <View style={styles.renderList}>
        {size_product.map((_item: any, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={index.toString()}
              onPress={() => onSelectedSize(_item, index)}>
              <View
                style={[
                  styles.sizeItem,
                  {
                    borderColor:
                      index === sizeSelected.onSelected
                        ? ArrayColors._color_black
                        : ArrayColors._color_white_black,
                  },
                ]}>
                <Text style={styles.sizeText}>{_item}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
  return (
    <Modal
      visible={isShow}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onChangeShow}>
          <View style={styles.emtyView} />
        </TouchableWithoutFeedback>
        <View style={styles.content}>
          {/* San pham */}
          <View>
            <FlatList
              data={imageProduct}
              keyExtractor={keyItem}
              renderItem={renderItem}
              removeClippedSubviews
              horizontal
              listKey="modal_product"
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={spaceItem}
              contentContainerStyle={styles.contentImage}
            />
            <Text style={styles.textLabel}>{title_product}</Text>
            <Text style={styles.textPriceProduct}>{formartMoney(price)}</Text>
          </View>
          <ColorProduct />
          <SizeProduct />
          <AddToCart />
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
    fontFamily: 'OpenSans-Bold',
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_big,
    color: ArrayColors._color_black,
  },
  renderList: {
    flexDirection: 'row',
    padding: sizes._16sdp,
  },
  colorItem: {
    width: sizes._30sdp,
    height: sizes._30sdp,
    borderRadius: sizes._32sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizes._16sdp,
  },
  sizeItem: {
    borderWidth: sizes._2sdp,
    borderRadius: sizes._50sdp,
    paddingHorizontal: sizes._24sdp,
    paddingVertical: sizes._16sdp,
    marginRight: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
  },
  sizeText: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
  },
  space: {
    width: sizes._10sdp,
  },
  contentImage: {
    paddingHorizontal: sizes._10sdp,
  },
});
