import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import image from '../../../res/require/Images';
import IconHeader from '../../../components/icons/IconHeader';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NameScreen} from '../../navigators/TabNavigator';
import {Divider} from 'react-native-paper';
import ButtonSub from '../../../components/button/ButtonSub';
import axios from 'axios';
import ItemHeart from '../../../components/heart/ItemHeart';
import {API_URL, COUNT_HEART, GET_HEART, MINES_HEART} from '@env';
import {
  addHeart,
  changeHeart,
  removeHeart,
} from '../../../store/actions/productsActions';
import ItemHeartShow from '../../../components/heart/ItemHearShow';
import {getRandomQuestionsArray} from '../../../utils/Utilities';
import LottieView from 'lottie-react-native';
import {showToast} from '../../../components/modal/ToastCustom';
import Loading from '../../../components/modal/Loading';
import {FlashList} from '@shopify/flash-list';

type Props = {};
const renderContent = null;
const isEmty = null;

const ProductHeart = (props: Props) => {
  const {listIDHeart, numberCart, products} = useSelector(
    (state: any) => state.product,
  );

  const [listHeart, setListHeart] = useState<any>([]);
  const [checked, setChecked] = useState<any>(null);
  const [isLoad, setIsLoad] = useState<any>(false);
  const [listNote, setListNote] = useState<any>(
    getRandomQuestionsArray(30, products),
  );

  const [heart, setHeart] = useState<any>({
    isHeart: false,
    item: null,
    index: -1,
  });

  const [minHeart, setMinHeart] = useState<any>({
    isStatus: false,
    item: null,
  });

  const {goBack, navigate}: any = useNavigation();

  const auth = useSelector((state: any) => state.account);

  const onBackPress = () => goBack();

  const goToCart = () => navigate(NameScreen.HOME, {screen: 'ScreenCart'});

  const navigateLogin = () => navigate(NameScreen.LOGIN);

  const dispatch: any = useDispatch();

  const keySuggestions = (item: any) => item._id;

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
          setListHeart(listHeart.filter((val: any) => val._id !== item._id));

          if (heart.item != null) {
            setHeart({
              isHeart: false,
              item: null,
              index: -1,
            });
          }

          if (minHeart.item != null) {
            setMinHeart({
              isStatus: false,
              item: null,
            });
          }
          setIsLoad(false);
        } else {
          showToast('Đã có lỗi trong quá trình xử lý');
          setIsLoad(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoad(false);
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
          //console.log('add heart');
          setListHeart([...listHeart, heart.item]);
          setListNote(listNote.filter((val: any) => val._id !== item._id));
          setHeart({
            ...heart,
            isHeart: false,
            item: null,
          });
          setIsLoad(false);
        } else {
          showToast('Đã có lỗi trong quá trình xử lý');
          setIsLoad(false);
        }
      })
      .catch((err: any) => {
        //console.log(err);
        setIsLoad(false);
      });
  };

  const changeHearts = (item: any, index: any) => {
    if (auth.isAuthenticated) {
      setHeart({isHeart: true, item, index});
    } else {
      navigateLogin();
    }
  };

  const changeMinHeart = (item: any) => {
    if (auth.isAuthenticated) {
      setMinHeart({isStatus: true, item});
    } else {
      navigateLogin();
    }
  };

  const renderItemSuggestions = ({item, index}: any) => (
    <ItemHeart
      item={item}
      index={index}
      onPress={changeHearts}
      itemSelected={heart}
    />
  );

  const renderItem = ({item, index}: any) => (
    <ItemHeartShow item={item} index={index} onPress={changeMinHeart} />
  );

  const renderSpace = () => <View style={styles.spaceHeightMedium} />;

  useEffect(() => {
    try {
      if (auth.isAuthenticated) {
        setIsLoad(true);
        let heart = products.filter((item: any) => item.heart_active);
        setListHeart(heart);
        products.find((item: any) =>
          item.heart_active ? setChecked(true) : setChecked(false),
        );

        if (listIDHeart.length > 0 && !checked) {
          listIDHeart.forEach((val: any) => {
            dispatch(changeHeart(val.idProduct, true));
          });
        } else {
          setIsLoad(false);
        }
        setIsLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth.isAuthenticated, checked]);

  useEffect(() => {
    try {
      if (auth.isAuthenticated) {
        if (heart.item != null) {
          let check = listHeart.find((val: any) =>
            val._id === heart.item._id ? true : false,
          );

          let heartId: any = listIDHeart.find(
            (val: any) => val.idProduct === heart.item._id,
          );

          if (check) {
            minuesHeart(
              heart.item,
              `Bearer ${auth.token}`,
              auth.result[0]._id,
              heartId._id,
            );
          } else {
            countHeart(heart.item, `Bearer ${auth.token}`, auth.result[0]._id);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [heart.isHeart]);

  useEffect(() => {
    try {
      if (auth.isAuthenticated) {
        if (minHeart.item != null && listIDHeart.length > 0) {
          let heartId: any = listIDHeart.find(
            (val: any) => val.idProduct === minHeart.item._id,
          );
          minuesHeart(
            minHeart.item,
            `Bearer ${auth.token}`,
            auth.result[0]._id,
            heartId._id,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [minHeart.isStatus]);

  const ContentHeader = () => (
    <View style={styles.contentHeder}>
      <IconHeader
        name={'chevron-back'}
        sizes={sizes._24sdp}
        onPress={onBackPress}
        style={styles.iconLeft}
        color={ArrayColors._color_black}
      />
      <View
        style={[
          styles.content,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.textLabel}>Yêu thích</Text>
      </View>
      <BadgesIcon icon={image.ic_cart} count={numberCart} onPress={goToCart} />
    </View>
  );

  const Suggestions = () => (
    <View style={styles.suggestions}>
      {listHeart.length > 0 ? null : (
        <>
          <View
            style={[styles.contentHeder, {paddingHorizontal: sizes._18sdp}]}>
            <Text style={[styles.textEmptyHeart, {flex: 1}]}>
              Lưu trữ mọi thứ bạn yêu thích trên một trang.
            </Text>
            <LottieView
              source={require('../../../assets/lottie/heart.json')}
              autoPlay
              style={styles.imgEmpty}
            />
          </View>
          <View style={styles.spaceHeightSmall} />
        </>
      )}
      <Text
        style={[
          styles.textLabel,
          {
            marginLeft: sizes._18sdp,
          },
        ]}>
        Có lẽ bạn sẽ thích
      </Text>
      <View style={styles.spaceHeightMedium} />
      <FlashList
        data={listNote}
        keyExtractor={keySuggestions}
        renderItem={renderItemSuggestions}
        numColumns={3}
        ItemSeparatorComponent={renderSpace}
        // listKey="heart-suggest"
        // columnWrapperStyle={{
        //   flex: 1,
        //   justifyContent: 'space-between',
        //   paddingHorizontal: sizes._18sdp,
        // }}
        estimatedItemSize={150}
      />
    </View>
  );

  const ContentProductHeart = () => (
    <View
      style={[
        styles.content,
        {
          backgroundColor: ArrayColors._color_white,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: sizes._32sdp,
        },
      ]}>
      {listHeart.length > 0 ? (
        <View style={{width: '100%'}}>
          <FlashList
            data={listHeart}
            extraData={listHeart}
            keyExtractor={keySuggestions}
            renderItem={renderItem}
            numColumns={2}
            //listKey="heart-all"
            ItemSeparatorComponent={renderSpace}
            // columnWrapperStyle={{
            //   flex: 1,
            //   justifyContent: 'space-between',
            //   paddingHorizontal: sizes._18sdp,
            // }}
            estimatedItemSize={280}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={image.heart_empty}
            resizeMode="contain"
            style={styles.imgEmpty}
          />
          <View style={styles.spaceHeightSmall} />
          <Text style={styles.textEmptyHeart}>Bạn chưa thích sản phẩm nào</Text>
          <View style={styles.spaceHeightMedium} />
          <View></View>
        </View>
      )}
      {auth.isAuthenticated ? null : (
        <>
          <Text style={styles.textLabelEmpty}>
            Đăng nhập để xem sản phẩm yêu thích
          </Text>
          <View style={styles.spaceHeightMedium} />
          <ButtonSub
            size="medium"
            value="Đăng nhập / Đăng ký"
            bgColor="black"
            onPress={navigateLogin}
          />
        </>
      )}
    </View>
  );

  const renderView = (
    <View>
      <Divider />
      <ContentProductHeart />
      <View style={styles.spaceHeightMedium} />
      <Suggestions />
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
          listKey="heart-product"
          ListFooterComponent={renderView}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {isLoad ? <Loading /> : null}
    </SafeAreaView>
  );
};

export default ProductHeart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ArrayColors.gray_bg_light,
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
  imgEmpty: {
    width: sizes._50sdp,
    height: sizes._50sdp,
  },
  containerAddCart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
    borderColor: ArrayColors._color_gray,
  },
  textBtnAdd: {
    color: ArrayColors._color_white,
    fontSize: sizes._font_size_big_large,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
  },
  textEmptyHeart: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
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
  sizeItem: {
    borderWidth: sizes._2sdp,
    borderRadius: sizes._50sdp,
    paddingHorizontal: sizes._24sdp,
    paddingVertical: sizes._16sdp,
    marginRight: sizes._16sdp,
    backgroundColor: ArrayColors._color_white,
  },
  textLabel: {
    fontWeight: '700',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: sizes._20sdp,
    color: ArrayColors._color_black,
  },
  textLabelEmpty: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  spaceHeightMedium: {
    height: sizes._18sdp,
  },
  spaceHeightSmall: {
    height: sizes._10sdp,
  },
  suggestions: {
    width: '100%',
    backgroundColor: ArrayColors._color_white,
    paddingVertical: sizes._18sdp,
  },
});
