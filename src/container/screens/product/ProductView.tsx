import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import AppHeader from '../../../components/header/AppHeader';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import {useSelector} from 'react-redux';
import IconHeader from '../../../components/icons/IconHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSub from 'react-native-vector-icons/MaterialCommunityIcons';
import image from '../../../res/require/Images';
import {Divider} from 'react-native-paper';
import axios from 'axios';
import {
  API_URL,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_SREACH_TITLE_PRODUCTS,
} from '@env';
import ProductItemHeart from '../../../components/product/Product.ItemHeart';
import {useNavigation, useRoute} from '@react-navigation/native';

type Props = {};

const ProductView = (props: Props) => {
  const [listSearch, setListSearch] = useState<any>([]);
  const {goBack}: any = useNavigation();
  const {params}: any = useRoute();

  const searchKey = params?.searchKey;
  const titleCategoryProduct = params?.titleCategoryProduct;
  const title = params?.title;

  const backPress = () => goBack();

  const renderSpaceItem = () => <View style={styles.spaceMediumY} />;

  const getData = async (params: any) => {
    let data = JSON.stringify({
      titleProduct: params.toString(),
    });

    await axios({
      method: 'POST',
      url: API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        let data = res.data;
        setListSearch(data.result);
        console.log(data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDataByTitleId = async (params: any) => {
    let data = JSON.stringify({
      titleCategoryProduct: params.toString(),
    });

    await axios({
      method: 'POST',
      url: API_URL + GET_PRODUCT_BY_ID,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        let data = res.data;
        setListSearch(data.result);
        console.log(data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchKey) {
      getData(searchKey);
    }

    if (titleCategoryProduct) {
      getDataByTitleId(titleCategoryProduct);
    }
  }, []);

  const {numberCart} = useSelector((state: any) => state.product);

  const Exception = () => (
    <View style={styles.exception}>
      <Image source={image.box_empty} style={styles.img} resizeMode="contain" />
      <View style={styles.spaceMediumY} />
      <Text style={styles.textPlaholders}>Không tìm thấy sản phẩm nào</Text>
    </View>
  );

  //Header Screen
  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back-outline"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={backPress}
      />
      {searchKey ? (
        <View style={styles.contentHeader}>
          <TouchableWithoutFeedback>
            <Text style={[styles.textPlaholder, {flex: 1}]}>{searchKey}</Text>
          </TouchableWithoutFeedback>

          <Icon size={sizes._22sdp} name="close-circle" />
        </View>
      ) : null}
      {titleCategoryProduct ? (
        <View
          style={[
            styles.content,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={styles.textSub} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      ) : null}
      <BadgesIcon icon={image.ic_cart} count={numberCart} onPress={() => {}} />
    </View>
  );
  //Filter san pham
  const Filter = () => (
    <View style={styles.contentSeach}>
      <View style={styles.itemSeach}>
        <Text style={styles.textSub}>Phân loại</Text>
        <View style={styles.spaceSmallX} />
        <Icon
          size={sizes._16sdp}
          name="chevron-up-outline"
          color={ArrayColors._color_black}
        />
      </View>
      <View style={styles.itemSeach}>
        <Text style={styles.textDefault}>Lọc</Text>
        <View style={styles.spaceSmallX} />
        <IconSub
          size={sizes._16sdp}
          name="filter-outline"
          color={ArrayColors._color_black}
        />
      </View>
    </View>
  );
  //RenderItem Flatlist
  const renderItem = ({item, index}: {item: any; index: number}) => (
    <ProductItemHeart item={item} index={index} />
  );

  const keyExtractor = (item: any) => item._id;
  //View Content
  const renderContent = (
    <View style={styles.content}>
      <Filter />
      <Divider />
      {listSearch.length > 0 ? (
        <FlatList
          data={listSearch}
          extraData={listSearch}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSpaceItem}
        />
      ) : (
        <Exception />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.content}>
        <FlatList
          data={null}
          renderItem={null}
          listKey="search_screens"
          ListFooterComponent={renderContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentSeach: {
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._10sdp,
    marginTop: sizes._10sdp,
    justifyContent: 'space-between',
  },
  itemSeach: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArrayColors.gray_custom_small,
    paddingHorizontal: sizes._10sdp,
    marginHorizontal: sizes._14sdp,
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    marginLeft: sizes._10sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  spaceSmallX: {
    width: sizes._10sdp,
  },
  spaceMediumX: {
    width: sizes._18sdp,
  },
  spaceSmallY: {
    height: sizes._10sdp,
  },
  spaceMediumY: {
    height: sizes._18sdp,
  },
  exception: {
    paddingVertical: sizes._18sdp,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textPlaholders: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  img: {
    width: sizes._80sdp,
    height: sizes._80sdp,
  },
});
