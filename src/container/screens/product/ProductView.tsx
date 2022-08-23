import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  GET_PRODUCT_SREACH_TITLE_PRODUCTS_DATE_HIGH,
  GET_PRODUCT_SREACH_TITLE_PRODUCTS_DATE_LOW,
} from '@env';
import ProductItemHeart from '../../../components/product/Product.ItemHeart';
import {useNavigation, useRoute} from '@react-navigation/native';
import MenuFilter from '../../../components/filter/MenuFilter';
import FilterItem from '../../../components/filter/FilterItem';
import ButtonSub from '../../../components/button/ButtonSub';

type Props = {};

const dataClassify = [
  'Đề xuất',
  'Mới nhất',
  'Cũ nhất',
  'Giá thấp đến cao',
  'Giá cao đến thấp',
];

const dataCatory = ['Nam', 'Nữ', 'Phụ kiện'];

const ProductView = (props: Props) => {
  const {listSizes, listColors} = useSelector((state: any) => state.catory);

  const [listSearch, setListSearch] = useState<any>([]);

  const [classify, setClassify] = useState<boolean>(false);
  const [classifyValue, setClassifyValue] = useState<any>({
    text: 'Đề xuất',
    index: 0,
  });

  const [filter, setFilter] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<any>({
    text: '',
    index: -1,
  });
  const [sizeValue, setSizeValue] = useState<any>({
    size: '',
    index: -1,
  });
  const [colorValue, setColorValue] = useState<any>({
    color: '',
    index: -1,
  });

  const {goBack}: any = useNavigation();
  const {params}: any = useRoute();

  const searchKey = params?.searchKey;
  const titleCategoryProduct = params?.titleCategoryProduct;
  const title = params?.title;

  const backPress = () => goBack();

  const renderSpaceItem = () => <View style={styles.spaceMediumY} />;

  const changeClassify = (text: any, index: any) => {
    setClassifyValue({text, index});
    setClassify(false);
  };
  const changeCatory = (text: any, index: any) => {
    setFilterValue({text, index});
  };
  const changeSize = (size: any, index: any) => {
    setSizeValue({size, index});
  };
  const changeColor = (color: any, index: any) => {
    setColorValue({color, index});
  };

  const resetFilter = () => {
    setFilterValue({
      text: '',
      index: -1,
    });
    setSizeValue({
      size: '',
      index: -1,
    });
    setColorValue({
      color: '',
      index: -1,
    });
  };

  const getData = async (params: any, url: string) => {
    let data = JSON.stringify({
      titleProduct: params.toString(),
    });

    await axios({
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        let data = res.data;
        setListSearch(data.result);
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchKey && classifyValue.index === 0) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS;
      getData(searchKey, url);
    }

    if (searchKey && classifyValue.index === 1) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_DATE_HIGH;
      getData(searchKey, url);
    }

    if (searchKey && classifyValue.index === 2) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_DATE_LOW;
      getData(searchKey, url);
    }

    if (searchKey && classifyValue.index === 3) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS;
      getData(searchKey, url);
    }

    if (searchKey && classifyValue.index === 3) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS;
      getData(searchKey, url);
    }

    if (titleCategoryProduct) {
      getDataByTitleId(titleCategoryProduct);
    }
  }, [classifyValue.index]);

  const {numberCart} = useSelector((state: any) => state.product);

  const renderCatory = ({item, index}: any) => {
    const check = index === filterValue.index;
    return (
      <FilterItem
        index={index}
        item={item}
        isSelected={check}
        onPress={changeCatory}
      />
    );
  };
  const renderColor = ({item, index}: any) => {
    const check = index === colorValue.index;
    return (
      <FilterItem
        index={index}
        item={item.titleColors}
        isSelected={check}
        color={item.colorCode}
        onPress={changeColor}
      />
    );
  };
  const renderSize = ({item, index}: any) => {
    const check = index === sizeValue.index;
    return (
      <FilterItem
        index={index}
        item={item.titleSize}
        isSelected={check}
        onPress={changeSize}
      />
    );
  };
  const keyExtractor = (item: any) => item._id;

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
      <TouchableWithoutFeedback
        onPress={() => {
          filter ? setFilter(!filter) : setClassify(!classify);
        }}>
        <View style={styles.itemFilter}>
          <Text style={styles.textSub}>Phân loại</Text>
          <View style={styles.spaceSmallX} />
          <Icon
            size={sizes._16sdp}
            name={classify ? 'chevron-down-outline' : 'chevron-up-outline'}
            color={ArrayColors._color_black}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          classify ? setClassify(!classify) : setFilter(!filter);
        }}>
        <View style={[styles.itemFilter, {justifyContent: 'flex-end'}]}>
          <Text style={styles.textDefault}>Lọc</Text>
          <View style={styles.spaceSmallX} />
          <IconSub
            size={sizes._16sdp}
            name={filter ? 'filter-menu-outline' : 'filter-outline'}
            color={ArrayColors._color_black}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const FilterCatory = () => (
    <View style={[styles.showClassify]}>
      <Text style={[styles.textLabel, {marginLeft: sizes._18sdp}]}>
        Doanh mục
      </Text>

      <View style={styles.spaceSmallY} />

      <FlatList
        data={dataCatory}
        extraData={dataCatory}
        keyExtractor={keyDefault}
        renderItem={renderCatory}
        listKey="catory-filter"
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
      />
    </View>
  );
  const FilterSize = () => (
    <View style={[styles.showClassify]}>
      <Text style={[styles.textLabel, {marginLeft: sizes._18sdp}]}>
        Kích thước
      </Text>
      <View style={styles.spaceSmallY} />
      <FlatList
        data={listSizes}
        extraData={listSizes}
        keyExtractor={keyExtractor}
        renderItem={renderSize}
        listKey="size-filter"
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        ItemSeparatorComponent={() => <View style={styles.spaceSmallY} />}
      />
    </View>
  );

  const FilterColor = () => (
    <View style={[styles.showClassify]}>
      <Text style={[styles.textLabel, {marginLeft: sizes._18sdp}]}>
        Kích thước
      </Text>
      <View style={styles.spaceSmallY} />
      <FlatList
        data={listColors}
        extraData={listColors}
        keyExtractor={keyExtractor}
        renderItem={renderColor}
        listKey="color-filter"
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: sizes._18sdp,
        }}
        ItemSeparatorComponent={() => <View style={styles.spaceSmallY} />}
      />
    </View>
  );

  const SumProduct = () => (
    <View
      style={[
        styles.showClassify,
        {
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
      ]}>
      <View
        style={[
          styles.showClassify,
          {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.3,
          },
        ]}>
        <Text style={styles.textLabel}>{listSearch.length}</Text>
        <Text style={styles.textDefault}>Sản phẩm</Text>
      </View>
      <View
        style={[
          styles.showClassify,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 0.5,
            flexDirection: 'row',
          },
        ]}>
        <TouchableOpacity onPress={resetFilter}>
          <Icon
            name="reload-outline"
            size={sizes._26sdp}
            color={ArrayColors._color_black}
          />
        </TouchableOpacity>

        <View style={styles.spaceSmallX} />

        <ButtonSub bgColor="black" value="Sắp xếp" size="small" />
        <View style={styles.spaceMediumX} />
      </View>
    </View>
  );

  //RenderItem Flatlist
  const renderItem = ({item, index}: {item: any; index: number}) => (
    <ProductItemHeart item={item} index={index} />
  );

  const keyDefault = (item: any, index: any) => index.toString();

  const renderClassify = ({item, index}: any) => {
    const check = index === classifyValue.index;
    return (
      <MenuFilter
        index={index}
        value={item}
        isSelected={check}
        onPress={changeClassify}
      />
    );
  };

  //View Content
  const renderContent = (
    <View style={styles.modeContent}>
      {listSearch.length > 0 ? (
        <FlatList
          data={listSearch}
          extraData={listSearch}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSpaceItem}
          listKey="result-search"
          bounces={false}
          removeClippedSubviews
          scrollEventThrottle={16}
        />
      ) : (
        <Exception />
      )}
      {classify ? (
        <View style={styles.overlay}>
          <View style={styles.showClassify}>
            <FlatList
              data={dataClassify}
              extraData={dataClassify}
              keyExtractor={keyDefault}
              renderItem={renderClassify}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              scrollEventThrottle={16}
              bounces={false}
              ItemSeparatorComponent={() => <Divider />}
              listKey="classify"
            />
          </View>
          <TouchableWithoutFeedback onPress={() => setClassify(false)}>
            <View style={styles.content} />
          </TouchableWithoutFeedback>
        </View>
      ) : null}
      {filter ? (
        <View style={styles.overlay}>
          <View
            style={[
              styles.spaceSmallY,
              {backgroundColor: ArrayColors._color_white},
            ]}
          />
          <FilterCatory />
          <View
            style={[
              styles.spaceSmallY,
              {backgroundColor: ArrayColors._color_white},
            ]}
          />
          <FilterSize />
          <View
            style={[
              styles.spaceSmallY,
              {backgroundColor: ArrayColors._color_white},
            ]}
          />
          <FilterColor />
          <View
            style={[
              styles.spaceMediumY,
              {backgroundColor: ArrayColors._color_white},
            ]}
          />
          <SumProduct />
          <View
            style={[
              styles.spaceSmallY,
              {backgroundColor: ArrayColors._color_white},
            ]}
          />
          <TouchableWithoutFeedback onPress={() => setFilter(false)}>
            <View style={styles.content} />
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />

      <View style={styles.content}>
        <Filter />

        <Divider />
        <FlatList
          data={null}
          renderItem={null}
          listKey="search_screens"
          ListFooterComponent={renderContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
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
    height: sizes._screen_height,
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
  itemFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.4,
    height: '100%',
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
    fontSize: sizes._18sdp,
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
    height: '100%',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    height: '100%',
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
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: ArrayColors._color_gray_translucen,
    width: sizes._screen_width,
    height: '100%',
  },
  modeContent: {
    flex: 1,
    height: sizes._screen_height - sizes._header_height - sizes._35sdp,
  },
  showClassify: {
    backgroundColor: ArrayColors._color_white,
  },
});
