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
import React, {useEffect, useState, useRef} from 'react';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
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
import {API_URL, BY_VIEW_PRODUCTS} from '@env';
import {
  addToCart,
  clearProducts,
  countHeart,
  countView,
  loadProducts,
  minuesHeart,
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

const ScreenComment = (props: DetailProps) => {
  const {numberCart, products, listIDHeart} = useSelector(
    (state: any) => state.product,
  );
  const auth = useSelector((state: any) => state.account);
  const {listAllComment, listAllStart, isStart, small, large, fit} =
    useSelector((state: any) => state.invoice);

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const route: any = useRoute();
  const {goBack, navigate}: any = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const dispatch: any = useDispatch();

  const item: any = route.params?.item;

  const onBackPress = () => goBack();
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
      <View style={styles.contentHeader}>
        <Text style={styles.textLabels}>Đánh giá sản phẩm</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );
  //Comment
  const renderComment = ({item, index}: any) => {
    return <CommentItem item={item} index={index} color="#000000" size="M" />;
  };

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
        data={listAllComment}
        extraData={listAllComment}
        listKey="comments-list"
        keyExtractor={keyExtractor}
        renderItem={renderComment}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={spaceComment}
      />
      <View style={styles.sapceSmallX} />
    </View>
  );

  //RenderView
  const renderView = (
    <View style={styles.content}>
      <Comment />
    </View>
  );

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
      </View>
    </SafeAreaView>
  );
};

export default ScreenComment;

const styles = StyleSheet.create({
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  textLabels: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    fontSize: sizes._22sdp,
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
