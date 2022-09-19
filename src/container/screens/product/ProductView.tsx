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
  GET_PRODUCT_SREACH_TITLE_PRODUCTS_CATORY,
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
  const [listFilter, setListFilter] = useState<any>([]);

  const [isFilter, setIsFilter] = useState<boolean>(false);
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
    resetFilter();
  };

  const changeCatory = (text: any, index: any) => {
    setFilterValue({text, index});
  };

  const changeSize = (size: any, index: any) => {
    setSizeValue({size, index});

    if (index === -1) {
      setIsFilter(false);
    }

    if (index !== -1 && colorValue.index !== -1) {
      let newFilter = listSearch.filter(
        (val: any) =>
          val.size_product.indexOf(size) >= 0 &&
          val.color_product.indexOf(colorValue.color) >= 0,
      );
      console.log('size ' + newFilter.length);
      console.log(size + ' ' + colorValue.color);
      setListFilter(newFilter);
      setIsFilter(true);
      return;
    }

    if (index !== -1) {
      let newFilter = listSearch.filter(
        (val: any) => val.size_product.indexOf(size) >= 0,
      );
      console.log('size1 ' + newFilter.length);
      console.log(size);
      setListFilter(newFilter);
      setIsFilter(true);
      return;
    }
  };
  const changeColor = (color: any, index: any) => {
    setColorValue({color, index});

    if (index === -1) {
      setIsFilter(false);
    }

    if (index !== -1 && sizeValue.index !== -1) {
      let newFilter = listSearch.filter(
        (val: any) =>
          val.size_product.indexOf(sizeValue.size) >= 0 &&
          val.color_product.indexOf(color) >= 0,
      );
      setListFilter(newFilter);
      console.log('color ' + newFilter.length);
      console.log(color + ' ' + sizeValue.size);
      setIsFilter(true);
      return;
    }

    if (index !== -1) {
      let newFilter = listSearch.filter(
        (val: any) => val.color_product.indexOf(color) >= 0,
      );
      console.log('color1 ' + newFilter.length);
      console.log(color);
      setListFilter(newFilter);
      setIsFilter(true);
      return;
    }
  };

  const doneFilter = () => {
    setFilter(false);
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
    setFilter(false);
    setIsFilter(false);
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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDataByTitleId = async (params: any, url: string, types: any) => {
    let data =
      types !== 0
        ? JSON.stringify({
            titleCategoryProduct: params.toString(),
            status: types,
          })
        : JSON.stringify({
            titleCategoryProduct: params.toString(),
          });
    console.log(data);

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

    if (searchKey && classifyValue.index === 4) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS;
      getData(searchKey, url);
    }

    if (titleCategoryProduct && classifyValue.index === 0) {
      let url: string = API_URL + GET_PRODUCT_BY_ID;
      getDataByTitleId(titleCategoryProduct, url, 0);
    }
    if (titleCategoryProduct && classifyValue.index === 1) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_CATORY;
      getDataByTitleId(titleCategoryProduct, url, 1);
    }
    if (titleCategoryProduct && classifyValue.index === 2) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_CATORY;
      getDataByTitleId(titleCategoryProduct, url, 2);
    }
    if (titleCategoryProduct && classifyValue.index === 3) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_CATORY;
      getDataByTitleId(titleCategoryProduct, url, 4);
    }
    if (titleCategoryProduct && classifyValue.index === 4) {
      let url: string = API_URL + GET_PRODUCT_SREACH_TITLE_PRODUCTS_CATORY;
      getDataByTitleId(titleCategoryProduct, url, 3);
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
  const space = () => <View style={styles.spaceSmallY} />;
  const line = () => <Divider />;
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
      <View style={searchKey ? styles.contentHeaderBg : styles.contentHeader}>
        {searchKey ? (
          <>
            <TouchableWithoutFeedback>
              <Text style={[styles.textPlaholder, {flex: 1}]}>{searchKey}</Text>
            </TouchableWithoutFeedback>

            <Icon size={sizes._22sdp} name="close-circle" />
          </>
        ) : null}
        {titleCategoryProduct ? (
          <Text style={styles.textSub} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        ) : null}
      </View>
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
        ItemSeparatorComponent={space}
      />
    </View>
  );

  const FilterColor = () => (
    <View style={[styles.showClassify]}>
      <Text style={[styles.textLabel, {marginLeft: sizes._18sdp}]}>
        Màu săc
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
        ItemSeparatorComponent={space}
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
        <Text style={styles.textLabel}>
          {isFilter ? listFilter.length : listSearch.length}
        </Text>
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

        <ButtonSub
          bgColor="black"
          value="Sắp xếp"
          size="small"
          onPress={doneFilter}
        />
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
          data={isFilter ? listFilter : listSearch}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSpaceItem}
          listKey="result-search"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Exception />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <Filter />
      <Divider />
      <View style={styles.content}>
        <FlatList
          data={null}
          renderItem={null}
          listKey="search_screens"
          ListFooterComponent={renderContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          bounces={false}
        />
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
                bounces={false}
                ItemSeparatorComponent={line}
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
            {searchKey ? (
              <>
                <FilterCatory />
                <View
                  style={[
                    styles.spaceSmallY,
                    {backgroundColor: ArrayColors._color_white},
                  ]}
                />
              </>
            ) : null}
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
  itemFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.4,
    height: '100%',
  },
  contentHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHeaderBg: {
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
  },
  showClassify: {
    backgroundColor: ArrayColors._color_white,
  },
});
