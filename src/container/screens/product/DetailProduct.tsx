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
  ImageURISource,
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
import TranSport from '../../../components/order/TranSport';
import ColumView from '../../../components/order/ColumView';
import {Divider, ProgressBar, Surface} from 'react-native-paper';
import LevelComment from '../../../components/product/LevelComment';
import CustomRatingBar from '../../../components/product/CustomRatingBar';
import ItemComment from '../../../components/product/Item.Comment';
import ProductItem from '../../../components/product/Product.Item';

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

const dataComent = [
  {
    userName: 'AnhHoa',
    comment: 'Hàng chất lượng lắm nha mn!',
    color: ArrayColors._color_black,
    size: 'M',
    defaultRating: 5,
  },
  {
    userName: 'AnhHoa2',
    comment: 'Hàng chất lượng!',
    color: ArrayColors._color_black,
    size: 'M',
    defaultRating: 5,
  },
  {
    userName: 'AnhHoa3',
    comment: 'Ủng hộ shop dài lun :3',
    color: ArrayColors._color_black,
    size: 'X',
    defaultRating: 5,
  },
];

const DetailProduct = (props: DetailProps) => {
  const {carts, numberCart, products} = useSelector(
    (state: any) => state.product,
  );
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
  const renderListSucces = ({item, index}: any) => (
    <ProductItem item={item} index={index} />
  );
  const keyItem = (item: any, index: number) => index.toString();

  const keyExtractor = (item: any) => item._id;

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
        <View style={{backgroundColor: ArrayColors.white}}>
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

  const viewLeft = (img: ImageURISource, text: string) => (
    <View style={styles.customLeftView}>
      <Image source={img} resizeMode="contain" style={styles.icon} />
      <View style={styles.spaceSmallY} />
      <Text
        style={[styles.textDefault, {flex: 1}]}
        numberOfLines={2}
        ellipsizeMode="tail">
        {text}
      </Text>
      <View style={styles.spaceSmallY} />
    </View>
  );
  const MoreOther = () => (
    <View style={styles.customLeftView}>
      <Text style={styles.textDefault}>Xem thêm</Text>
      <Icons
        name="chevron-forward"
        size={sizes._24sdp}
        color={ArrayColors._color_black}
      />
    </View>
  );
  const SizeProduct = () => (
    <View style={{backgroundColor: ArrayColors.white}}>
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

  const TranSportDetail = () => (
    <View style={styles.tranSport}>
      <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
        Vận chuyển
      </Text>
      <View style={styles.sapceMediumX} />
      <ColumView
        customLeft={viewLeft(
          image.ic_car_green,
          'Miễn phí vận chuyển cho các đơn hàng trên 500.000đ',
        )}
        styleContainer={styles.columeMedium}
        iconRight
      />
      <Divider />
      <ColumView
        customLeft={viewLeft(image.ic_private_green, 'Chính sách bảo vệ')}
        styleContainer={styles.columeMedium}
        iconRight
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        valueLeft="Hướng dẫn kích thước"
        iconRight
      />
    </View>
  );
  const Comment = () => (
    <View style={styles.commentContent}>
      <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
        Nhận xét (4)
      </Text>

      <Surface style={styles.levelComment}>
        <View style={styles.contentLeft}>
          <Text style={styles.textPriceProduct}>4.6</Text>
          <CustomRatingBar defaultRating={4} />
        </View>
        <Text>Kích thước đặt mua?</Text>
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Nhỏ'} progress={0.5} />
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Kích thước chính xác'} progress={1} />
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Lớn'} progress={0} />
        <View style={styles.sapceSmallX} />
      </Surface>
      {dataComent.length > 0 ? (
        <>
          {dataComent.map((item: any, index: any) => (
            <ItemComment data={item} key={index.toString()} />
          ))}
          <View style={styles.sapceSmallX} />
          <MoreOther />
        </>
      ) : null}
    </View>
  );

  const ListSuggestions = () => (
    <View style={styles.listSuggestions}>
      <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
        Cõ lẽ bạn sẽ thích
      </Text>
      <View style={styles.sapceMediumX} />
      <FlatList
        data={products}
        extraData={products}
        keyExtractor={keyExtractor}
        renderItem={renderListSucces}
        numColumns={2}
        listKey="List_Suggestions"
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
      />
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

      <View style={styles.sapceMediumX} />

      <TranSportDetail />

      <View style={styles.sapceMediumX} />

      <Comment />

      <View style={styles.sapceMediumX} />

      <ListSuggestions />
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
    backgroundColor: ArrayColors.darkGrayAccount,
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
  listImg: {
    backgroundColor: ArrayColors.white,
  },
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
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._font_size_big,
    color: ArrayColors._color_black,
  },
  rowContent: {
    flexDirection: 'row',
    paddingHorizontal: sizes._10sdp,
    alignItems: 'center',
    backgroundColor: ArrayColors.white,
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
  sapceSmallX: {
    height: sizes._10sdp,
  },
  sapceMediumX: {
    height: sizes._18sdp,
  },
  spaceSmallY: {
    width: sizes._10sdp,
  },
  spaceMediumY: {
    width: sizes._18sdp,
  },
  columeMedium: {
    height: sizes._72sdp,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  tranSport: {
    backgroundColor: ArrayColors._color_white,
    paddingVertical: sizes._18sdp,
  },
  icon: {
    width: sizes._26sdp,
    height: sizes._26sdp,
  },
  customLeftView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes._72sdp,
  },
  commentContent: {
    backgroundColor: ArrayColors.white,
    paddingVertical: sizes._18sdp,
  },
  levelComment: {
    margin: sizes._18sdp,
    backgroundColor: ArrayColors.darkGrayLight,
    padding: sizes._18sdp,
    elevation: 4,
  },
  contentLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  listSuggestions: {
    backgroundColor: ArrayColors.white,
    paddingVertical: sizes._18sdp,
  },
});
