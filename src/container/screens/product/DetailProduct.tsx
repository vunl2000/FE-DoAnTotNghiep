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
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
import ArrayColors from '../../../res/colors/ArrayColors';
import AddToCart from '../../../components/modal/AddToCart';
import {formartMoney, makeId} from '../../../utils/Utilities';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import IconHeader from '../../../components/icons/IconHeader';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import image from '../../../res/require/Images';
import {NameScreen} from '../../navigators/TabNavigator';
import {TypeProductItem} from '../../../store/actions/types';
import axios from 'axios';
import {API_URL, BY_VIEW_PRODUCTS, COUNT_HEART, MINES_HEART} from '@env';
import {
  addHeart,
  addToCart,
  changeHeart,
  countView,
  removeHeart,
} from '../../../store/actions/productsActions';
import {showToast} from '../../../components/modal/ToastCustom';
import TranSport from '../../../components/order/TranSport';
import ColumView from '../../../components/order/ColumView';
import {Divider, ProgressBar, Surface} from 'react-native-paper';
import LevelComment from '../../../components/product/LevelComment';
import CustomRatingBar from '../../../components/product/CustomRatingBar';
import ItemComment from '../../../components/product/Item.Comment';
import ProductItem from '../../../components/product/Product.Item';
import ProDucts from '../../../components/product/Products';
import ColorItem from '../../../components/size/ColorItem';
import SizeItem from '../../../components/size/SizeItem';
import {
  getAllRate,
  getAllRateStart,
} from '../../../store/actions/invoiceActions';
import CommentItem from '../../../components/size/CommentItem';
import {HomeName} from '../../navigators/AppContainer';
import Loading from '../../../components/modal/Loading';

type DetailProps = {};

const renderContent = null;
const isEmty = null;

const renderListSucces = ({item, index}: any) => (
  <ProductItem item={item} index={index} />
);

const keyItem = (item: any, index: number) => makeId(5);
const keyExtractor = (item: any, index: number) => item._id;
const keyDefault = (item: any, index: number) => index.toString();

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

// const ListSuggestions = () => (
//   <View style={styles.listSuggestions}>
//     <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
//       Cõ lẽ bạn sẽ thích
//     </Text>
//     <View style={styles.sapceMediumX} />
//     <ProDucts data={products} keyList="list_suggestions" />
//   </View>
// );

const spaceComment = () => <Divider style={styles.divider} />;

const DetailProduct = (props: DetailProps) => {
  const {numberCart, products, listIDHeart} = useSelector(
    (state: any) => state.product,
  );
  const auth = useSelector((state: any) => state.account);
  const {listAllComment, listAllStart, isStart, small, large, fit} =
    useSelector((state: any) => state.invoice);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const isFocused = useIsFocused();
  const route: any = useRoute();
  const {goBack, navigate}: any = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const dispatch: any = useDispatch();

  const item: any = products.find(
    (item: any) => item._id === route.params?.item._id,
  );

  const [heartItem, setHeartItem] = useState<boolean>(false);

  const {
    _id,
    imageProduct,
    titleProduct,
    price,
    size_product,
    color_product,
    heart,
    heart_active,
  } = item;
  const [isLoad, setIsLoad] = useState<any>(false);

  const [sizeSelected, setSizeSelected] = useState({
    size: '',
    index: -1,
  });

  const [colorSelected, setColorSelected] = useState({
    color: '',
    index: -1,
  });

  const onSelectedSize = (size: any, index: any) => {
    setSizeSelected({size, index});
  };

  const onSelectedColor = (color: any, index: any) => {
    setColorSelected({color, index});
  };

  const navigateLogin = () => navigate(NameScreen.LOGIN);

  const clearOptions = () => {
    setColorSelected({
      color: '',
      index: -1,
    });
    setSizeSelected({
      size: '',
      index: -1,
    });
  };

  const minuesHeart = async (item: any, token: any, id: any, idHeart: any) => {
    setIsLoad(true);
    let data = JSON.stringify({
      idUser: id,
      idHeart: idHeart,
      idProduct: item._id,
    });
    await axios({
      method: 'POST',
      url: API_URL + MINES_HEART,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data = res.data;
        if (data.code === 200) {
          console.log('min heart');
          dispatch(changeHeart(item._id, false));
          dispatch(removeHeart(idHeart));
          setHeartItem(false);
        } else {
          showToast('Đã có lỗi trong quá trình xử lý');
        }
        setIsLoad(false);
      })
      .catch((err: any) => {
        setIsLoad(false);
        console.log(err);
      });
  };

  const countHeart = async (item: any, token: any, id: any) => {
    setIsLoad(true);

    let data = JSON.stringify({
      idUser: id,
      idProduct: item._id,
    });
    await axios({
      method: 'POST',
      url: API_URL + COUNT_HEART,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data: any = res.data;
        if (data.message === 'Success') {
          dispatch(changeHeart(item._id, true));
          dispatch(addHeart(data.result));
          console.log('add heart');
          setHeartItem(true);
        } else {
          showToast('Đã có lỗi trong quá trình xử lý');
        }
        setIsLoad(false);
      })
      .catch((err: any) => {
        setIsLoad(false);
        console.log(err);
      });
  };

  const vieableItemChanged: any = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
  }).current;

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

  const goHeart = () => {
    if (auth.isAuthenticated) {
      let check = listIDHeart.find((val: any) =>
        val.idProduct === _id ? true : false,
      );
      let heartId: any = listIDHeart.find((val: any) => val.idProduct === _id);

      if (check) {
        minuesHeart(
          item,
          `Bearer ${auth.token}`,
          auth.result[0]._id,
          heartId._id,
        );
      } else {
        countHeart(item, `Bearer ${auth.token}`, auth.result[0]._id);
      }
    } else {
      navigateLogin();
    }
  };

  const onBackPress = () => goBack();

  const goToCart = () => navigate(NameScreen.HOME, {screen: HomeName.CART});

  const TranSportDetail = () => (
    <View style={styles.tranSport}>
      <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
        Vận chuyển
      </Text>
      <View style={styles.sapceMediumX} />
      <ColumView
        customLeft={viewLeft(image.ic_car_green, 'Vận chuyển nhanh chóng')}
        styleContainer={styles.columeMedium}
        iconRight
        onPressIconRight={() => navigate(NameScreen.SCREEN_SHIPPING)}
      />
      <Divider />
      <ColumView
        customLeft={viewLeft(image.ic_private_green, 'Chính sách bảo vệ')}
        styleContainer={styles.columeMedium}
        iconRight
        onPressIconRight={() => navigate(NameScreen.ANSWERQUESTIONS)}
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        valueLeft="Hướng dẫn kích thước"
        iconRight
        onPressIconRight={() => navigate(NameScreen.SCREENRULERSIZE)}
      />
    </View>
  );
  //Modal
  const BtnShowAddCart = () => (
    <View style={styles.containerAddCart}>
      <TouchableOpacity onPress={goHeart}>
        <Icons
          name={heartItem ? 'heart' : 'heart-outline'}
          size={sizes._24sdp}
          color={ArrayColors._color_black}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAddCart} onPress={onChangeShow}>
        <Text style={styles.textBtnAdd}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  //Header
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
  //Color
  const renderColor = ({item, index}: any) => {
    let check: boolean = colorSelected.index === index;
    return (
      <ColorItem
        item={item}
        index={index}
        isSelected={check}
        onPress={onSelectedColor}
      />
    );
  };

  const ColorProduct = () => (
    <>
      {color_product.length !== 0 ? (
        <View style={{backgroundColor: ArrayColors.white}}>
          <Text style={styles.textLabel}>Màu sắc</Text>
          <View style={styles.renderList}>
            <FlatList
              data={color_product}
              extraData={color_product}
              keyExtractor={keyDefault}
              renderItem={renderColor}
              listKey="select_colors"
              numColumns={5}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      ) : null}
    </>
  );

  //Size

  const renderSize = ({item, index}: any) => {
    let isSeleted = sizeSelected.index === index;
    return (
      <SizeItem
        item={item}
        index={index}
        isSelected={isSeleted}
        onPress={onSelectedSize}
      />
    );
  };

  const SizeProduct = () => (
    <>
      {size_product.length !== 0 ? (
        <View style={{backgroundColor: ArrayColors.white}}>
          <Text style={styles.textLabel}>Kích thước</Text>
          <View style={styles.renderList}>
            <FlatList
              data={size_product}
              extraData={size_product}
              keyExtractor={keyItem}
              renderItem={renderSize}
              listKey="size_products"
              numColumns={5}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      ) : null}
    </>
  );
  //Render Image
  const renderItem = ({item, index}: any) => (
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
  //Comment

  const renderComment = ({item, index}: any) => {
    return <CommentItem item={item} index={index} color="#000000" size="M" />;
  };

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

  const Comment = () => (
    <View style={styles.commentContent}>
      <Text style={[styles.textPriceProduct, {marginLeft: sizes._18sdp}]}>
        Nhận xét ({listAllComment.length})
      </Text>

      <Surface style={styles.levelComment}>
        <View style={styles.contentLeft}>
          <Text style={styles.textPriceProduct}>{isStart}</Text>
          <CustomRatingBar defaultRating={isStart} />
        </View>
        <View style={styles.sapceSmallX} />
        <Text style={styles.textDefault}>Kích thước đặt mua?</Text>
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Nhỏ'} progress={small} />
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Kích thước chính xác'} progress={fit} />
        <View style={styles.sapceSmallX} />
        <LevelComment label={'Lớn'} progress={large} />
        <View style={styles.sapceSmallX} />
      </Surface>

      <View style={styles.sapceSmallX} />

      <FlatList
        data={listAllComment.slice(0, 3)}
        extraData={listAllComment.slice(0, 3)}
        listKey="comments-list"
        keyExtractor={keyExtractor}
        renderItem={renderComment}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={spaceComment}
      />
      <View style={styles.sapceSmallX} />
      <Divider />
      <MoreOther />
    </View>
  );

  //RenderView
  const renderView = (
    <View style={styles.content}>
      <View style={styles.listImg}>
        <FlatList
          data={imageProduct}
          listKey="image_product"
          keyExtractor={keyItem}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        {/* <View style={styles.currentImg}>
          <Text style={styles.textBtnAdd}>
            {currentIndex}/{imageProduct.length}
          </Text>
        </View> */}
      </View>

      <View style={styles.rowContent}>
        <View style={styles.spaceLager}>
          <Text style={styles.textNameProduct}>{item.titleProduct}</Text>
          <Text style={styles.textPriceProduct}>
            {formartMoney(item.price)}
          </Text>
        </View>
        <View>
          <Text style={styles.textNameProduct}>Lượt xem {item.view}</Text>
        </View>
      </View>

      <ColorProduct />

      <SizeProduct />

      <View style={styles.sapceMediumX} />

      <TranSportDetail />

      <View style={styles.sapceMediumX} />

      {listAllComment.length !== 0 && listAllStart.length !== 0 ? (
        <Comment />
      ) : null}

      <View style={styles.sapceMediumX} />

      {/* <ListSuggestions /> */}
    </View>
  );

  useLayoutEffect(() => {
    try {
      if (isFocused) {
        if (item) {
          dispatch(countView(_id));
          dispatch(getAllRate(_id));
          dispatch(getAllRateStart(_id));
          setHeartItem(heart_active);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      {isLoad ? <Loading /> : null}
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
    width: '100%',
  },
  currentImg: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: sizes._18sdp,
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
  textLabel: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    marginTop: sizes._8sdp,
    marginLeft: sizes._8sdp,
    fontSize: sizes._font_size_big_large,
    color: ArrayColors._color_black,
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
    height: sizes._50sdp,
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
  divider: {
    marginVertical: sizes._6sdp,
  },
});
