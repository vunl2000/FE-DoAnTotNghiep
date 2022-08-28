import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import sizes from '../../../../res/sizes/sizes';
import TopCatory from '../../../../components/home/catory/TopCatory';
import Banner from '../../../../components/home/banner/Banner';
import {useDispatch, useSelector} from 'react-redux';
import HomeCatory from '../../../../components/home/catory/HomeCatory';
import ProductItem from '../../../../components/product/Product.Item';
import {Text} from 'react-native';
import ArrayColors from '../../../../res/colors/ArrayColors';
import {changeHeart} from '../../../../store/actions/productsActions';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

interface Props {}

const renderContent = null;
const isEmty = null;

const renderProDuct = ({item, index}: any) => {
  return <ProductItem item={item} index={index} />;
};

const space = () => <View style={styles.spaceY} />;

const keyItem = (item: any) => item._id;

const searchUrl = (keySearch: any, list: any) => {
  return list.filter((item: any) => item.title_ads === keySearch)[0].image_ads;
};

const loadMore = (isLoad: boolean) => {
  if (!isLoad) {
    return null;
  }
  return (
    <View style={styles.contentLoadMore}>
      <LottieView
        source={require('../../../../assets/lottie/fashion_app_loading.json')}
        autoPlay
        style={styles.imgLoadMore}
      />
    </View>
  );
};

const HomeIndex: React.FC<Props> = props => {
  const {listIDHeart, products} = useSelector((state: any) => state.product);

  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentItem, setCurrentItem] = useState(20);
  const dispatch: any = useDispatch();
  const {banner} = useSelector((state: any) => state.firstOpen);

  const Item = React.memo(({item, index}: any) => (
    <ProductItem item={item} index={index} />
  ));

  const renderProDuct = ({item, index}: any) => {
    return <Item item={item} index={index} />;
  };

  const handleOnEndReached = () => {
    setCurrentItem(currentItem + 20);
    setIsLoad(true);
  };

  // let uri1 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/26/16588342618f4d1bf9f87bd45fa262ecdf8879987f.gif';
  // let uri2 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/22/1658482607b1d69c5a6142af86cd9c121364eb2048.jpg';
  // let uri3 =
  //   'https://img.ltwebstatic.com/images3_ach/2022/07/22/1658480623d145a14402391cfb8b3dad2e8d1316cd.webp';

  useEffect(() => {
    let timer = setTimeout(() => {
      if (currentItem < products.length) {
        setData([...data, products.slice(data.length, currentItem)]);
      } else {
        setData([...data, products.slice(data.length, products.length)]);
      }
      setIsLoad(false);
    }, 2 * 1000);
    return () => {};
  }, [currentItem]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (listIDHeart.length !== 0) {
          listIDHeart.forEach((val: any) => {
            dispatch(changeHeart(val.idProduct, true));
          });
          console.log('load heart item');
        }
      };
    }, [listIDHeart]),
  );

  const renderView = (
    <View style={styles.container}>
      <Banner
        size="small"
        uri={searchUrl('Home_1', banner)}
        mode="cover"
        key="top_banner"
      />
      <TopCatory />
      <Banner
        size="medium"
        uri={searchUrl('Home_2', banner)}
        mode="cover"
        key="content_banner"
      />

      <HomeCatory />
      <Banner
        size="medium"
        uri={searchUrl('Home_3', banner)}
        mode="cover"
        key="fooster_banner"
      />
      <View style={styles.label}>
        <Text style={styles.textLabel}>Đề xuất</Text>
      </View>

      <FlatList
        data={products}
        extraData={products}
        renderItem={({item, index}: any) => <Item item={item} index={index} />}
        numColumns={2}
        listKey={'home-index'}
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        // removeClippedSubviews
        // ListFooterComponent={loadMore(isLoad)}
        ItemSeparatorComponent={space}
        // onEndReached={handleOnEndReached}
        // onEndReachedThreshold={0.1}
        // initialNumToRender={10}
        // inverted
        // maxToRenderPerBatch={20}
        // windowSize={data.length > 50 ? data.length / 4 : 21}
        // bounces={false}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={isEmty}
        renderItem={renderContent}
        ListFooterComponent={renderView}
        listKey="home_index"
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBanner: {
    height: sizes._48sdp,
    width: '100%',
  },
  spaceY: {
    height: sizes._16sdp,
  },
  label: {
    paddingVertical: sizes._16sdp,
  },
  textLabel: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    lineHeight: sizes._26sdp,
    color: ArrayColors._color_black,
    marginVertical: sizes._10sdp,
    textAlign: 'center',
  },
  imgLoadMore: {
    width: sizes._60sdp,
    height: sizes._60sdp,
  },
  contentLoadMore: {
    paddingVertical: sizes._10sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
