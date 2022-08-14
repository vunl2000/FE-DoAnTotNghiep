import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import ArrayColors from '../../../res/colors/ArrayColors';
import AddToCart from '../../../components/modal/AddToCart';
import {formartMoney} from '../../../utils/Utilities';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import IconHeader from '../../../components/icons/IconHeader';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import image from '../../../res/require/Images';
import {NameScreen} from '../../navigators/TabNavigator';
import {TypeProductItem} from '../../../store/actions/types';
import axios from 'axios';
import {API_URL, BY_VIEW_PRODUCTS} from '@env';
import {addToCart} from '../../../store/actions/productsActions';
import {showToast} from '../../../components/modal/ToastCustom';

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

type DetailProps = {};

const renderContent = null;
const isEmty = null;

const DetailProduct = (props: DetailProps) => {
  const {carts, numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const {goBack, navigate}: any = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const dispatch: any = useDispatch();

  const item: TypeProductItem = route.params?.item;
  const {_id, imageProduct, titleProduct, price, size_product, color_product} =
    item;
  const [sizeSelected, setSizeSelected] = useState({
    size: '',
    onSelected: null,
  });

  const [colorSelected, setColorSelected] = useState({
    color: '',
    onSelected: null,
  });

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

  const countView = async () => {
    let data = JSON.stringify({
      mIdProduct: item._id,
    });
    await axios({
      method: 'POST',
      url: API_URL + BY_VIEW_PRODUCTS,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  const renderItem = ({item, index}: any) => (
    <FastImage
      source={{
        uri: item,
      }}
      style={styles.img}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
  const keyItem = (item: any, index: number) => index.toString();

  const onChangeShow = () => {
    if (sizeSelected.size !== '' && colorSelected.color !== '') {
      dispatch(addToCart(item, sizeSelected.size, colorSelected.color));
      clearOptions();
      return showToast('Đã thêm vào giỏ hàng!');
    } else if (sizeSelected.size !== '' && colorSelected.color === '') {
      return showToast('Vui lòng chọn màu!');
    } else if (sizeSelected.size === '' && colorSelected.color !== '') {
      return showToast('Vui lòng chọn size!');
    } else {
      return setIsShow(!isShow);
    }
  };

  const onBackPress = () => goBack();

  const goToCart = () => navigate(NameScreen.HOME, {screen: 'ScreenCart'});

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
        {item.size_product.map((_item: any, index: number) => {
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

  const renderView = () => (
    <View style={styles.content}>
      <View style={styles.listImg}>
        <FlatList
          data={item.imageProduct}
          listKey="image_product"
          keyExtractor={keyItem}
          renderItem={renderItem}
          horizontal
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>

      <View style={styles.rowContent}>
        <View style={styles.spaceLager}>
          <Text style={styles.textNameProduct}>{item.titleProduct}</Text>
          <Text style={styles.textPriceProduct}>
            {formartMoney(item.price)}
          </Text>
        </View>
        <View>
          <Text>Lượt xem {item.view}</Text>
        </View>
      </View>
      <ColorProduct />
      <SizeProduct />
    </View>
  );

  const ContentHeader = () => (
    <View style={styles.contentHeder}>
      <IconHeader
        name={'chevron-back'}
        sizes={sizes._24sdp}
        onPress={onBackPress}
        style={styles.iconLeft}
        color={ArrayColors._color_black}
      />
      <View style={[styles.content, {marginHorizontal: sizes._16sdp}]} />
      <BadgesIcon icon={image.ic_cart} count={numberCart} onPress={goToCart} />
    </View>
  );

  const BtnShowAddCart = () => (
    <View style={styles.containerAddCart}>
      <TouchableOpacity>
        <Icons
          name="heart-outline"
          size={sizes._24sdp}
          color={ArrayColors._color_black}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={onChangeShow}>
        <Text style={styles.textBtnAdd}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    countView();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <AppHeader content customContent={<ContentHeader />} />
      <View style={styles.content}>
        <FlatList
          data={isEmty}
          renderItem={renderContent}
          listKey="detail-product"
          ListFooterComponent={renderView}
          showsVerticalScrollIndicator={false}
        />
        <BtnShowAddCart />
      </View>
      <AddToCart
        isShow={isShow}
        onChangeShow={onChangeShow}
        item={route.params?.item}
      />
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  listImg: {},
  img: {
    width: sizes._screen_width,
    height: sizes._csreen_height * 0.6,
  },
  containerAddCart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
    borderColor: ArrayColors._color_gray,
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
    fontFamily: 'OpenSans-Bold',
  },
  textNameProduct: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    marginTop: sizes._8sdp,
    fontSize: sizes._font_size_large,
    color: ArrayColors._color_black,
  },
  textPriceProduct: {
    fontWeight: '700',
    width: '100%',
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._font_size_big,
    color: ArrayColors._color_black,
  },
  rowContent: {
    flexDirection: 'row',
    paddingHorizontal: sizes._10sdp,
    alignItems: 'center',
  },
  spaceLager: {
    flex: 1,
  },
  renderList: {
    flexDirection: 'row',
    padding: sizes._16sdp,
  },
  sizeText: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
  },
  sizeItem: {
    borderWidth: sizes._2sdp,
    borderRadius: sizes._50sdp,
    paddingHorizontal: sizes._24sdp,
    paddingVertical: sizes._16sdp,
    marginRight: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
  },
  textLabel: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    marginTop: sizes._8sdp,
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_big_large,
    color: ArrayColors._color_black,
  },
  colorItem: {
    width: sizes._30sdp,
    height: sizes._30sdp,
    borderRadius: sizes._32sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizes._16sdp,
  },
});
