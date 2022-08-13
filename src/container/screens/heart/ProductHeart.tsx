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
import {API_URL, COUNT_HEART, GET_HEART} from '@env';
import {changeHeart} from '../../../store/actions/productsActions';
import ItemHeartShow from '../../../components/heart/ItemHearShow';

type Props = {};

const renderContent = null;
const isEmty = null;

const ProductHeart = (props: Props) => {
  const [listHeart, setListHeart] = useState<any>([]);
  const [listIDHeart, setListIDHeart] = useState<any>([]);
  const [listNote, setListNote] = useState<any>([]);
  const auth = useSelector((state: any) => state.account);

  const {goBack, navigate}: any = useNavigation();
  const {carts, numberCart, products} = useSelector(
    (state: any) => state.product,
  );

  const onBackPress = () => goBack();
  const goToCart = () => navigate(NameScreen.HOME, {screen: 'ScreenCart'});
  const navigateLogin = () => navigate(NameScreen.LOGIN);
  const dispatch: any = useDispatch();
  const keySuggestions = (item: any) => item._id;

  const renderItemSuggestions = ({item, index}: any) => (
    <ItemHeart item={item} index={index} onPress={countHeart} />
  );

  const renderItem = ({item, index}: any) => (
    <ItemHeartShow item={item} index={index} onPress={minuesHeart} />
  );

  const getHeartUser = async () => {
    if (auth.isAuthenticated) {
      let token: string = `Bearer ${auth.token}`;

      let data = JSON.stringify({
        idUser: auth.result[0]._id,
      });

      await axios({
        method: 'POST',
        url: API_URL + GET_HEART,
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => {
          let data = res.data;
          let getData: any = data.results;
          let idHeart: any = [];
          getData.forEach((val: any) => {
            let idProduct = val.heart.idProduct;
            dispatch(changeHeart(idProduct));
            console.log('change ' + idProduct);
            idHeart.push({
              _id: val.heart._id,
              idProduct: val.heart.idProduct,
            });
          });
          setListIDHeart(idHeart);
          console.log(idHeart);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  const countHeart = async (idProduct: any) => {
    if (auth.isAuthenticated) {
      let token: string = `Bearer ${auth.token}`;

      let data = JSON.stringify({
        idUser: auth.result[0]._id,
        idProduct: idProduct,
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
          let data = res.data;
          dispatch(changeHeart(idProduct));
          console.log('change ' + idProduct);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const minuesHeart = async (idProduct: any) => {
    if (auth.isAuthenticated && listIDHeart.length > 0) {
      let idHeart;
      listIDHeart.forEach((element: any) => {
        if (element.idProduct === idProduct) {
          idHeart = element._id;
        }
      });
      console.log(idHeart);
      let token: string = `Bearer ${auth.token}`;

      let data = JSON.stringify({
        idUser: auth.result[0]._id,
        idHeart: idHeart,
        idProduct: idProduct,
      });

      await axios({
        method: 'POST',
        url: API_URL + GET_HEART,
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(res => {
          dispatch(changeHeart(idProduct));
          console.log('change ' + idProduct);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const renderSpace = () => <View style={styles.spaceHeightMedium} />;

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
      <Text
        style={[
          styles.textLabel,
          {
            marginLeft: sizes._18sdp,
          },
        ]}>
        {' '}
        Có lẽ bạn sẽ thích
      </Text>
      <View style={styles.spaceHeightMedium} />
      <FlatList
        data={listNote}
        extraData={listNote}
        keyExtractor={keySuggestions}
        renderItem={renderItemSuggestions}
        listKey="list-suggestions-heart"
        removeClippedSubviews
        numColumns={3}
        ItemSeparatorComponent={renderSpace}
        columnWrapperStyle={{
          flex: 1,
          paddingHorizontal: sizes._18sdp,
          justifyContent: 'flex-start',
        }}
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
          <FlatList
            data={listHeart}
            extraData={listHeart}
            keyExtractor={keySuggestions}
            renderItem={renderItem}
            listKey="list-heart"
            removeClippedSubviews
            numColumns={2}
            ItemSeparatorComponent={renderSpace}
            columnWrapperStyle={{
              flex: 1,
              paddingHorizontal: sizes._18sdp,
              justifyContent: 'flex-start',
            }}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={image.heart_empty} resizeMode="contain" />
          <View style={styles.spaceHeightSmall} />
          <Text style={styles.textEmptyHeart}>Bạn chưa thích sản phẩm nào</Text>
          <View style={styles.spaceHeightMedium} />
        </View>
      )}
      {auth ? null : (
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

  useEffect(() => {
    getHeartUser();
  }, [auth]);

  useEffect(() => {
    let heart = products.filter((item: any) => item.heart_active);
    let listNew = products.filter((item: any) => !item.heart_active);
    setListHeart(heart);
    setListNote(listNew);
  }, [products]);

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
