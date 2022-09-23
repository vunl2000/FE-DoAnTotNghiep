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
import {
  changeHeart,
  getHeartUser,
} from '../../../../store/actions/productsActions';
import {Link, useFocusEffect, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {FlashList} from '@shopify/flash-list';
import {HomeName} from '../../../navigators/AppContainer';
import ButtonSub from '../../../../components/button/ButtonSub';

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

const HomeIndex: React.FC<Props> = props => {
  const {listIDHeart, products} = useSelector((state: any) => state.product);
  const ITEM_HEIGHT = sizes._282sdp;
  const [isLoad, setIsLoad] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentItem, setCurrentItem] = useState(10);
  const dispatch: any = useDispatch();
  const {banner} = useSelector((state: any) => state.firstOpen);
  const accounts = useSelector((state: any) => state.account);
  const {jumpTo}: any = useNavigation();

  const goCatory = () => {
    jumpTo(HomeName.CATORY);
  };
  const handleOnEndReached = () => {
    setCurrentItem(currentItem + 10);
    if (currentItem > 100) {
      setIsLoad(false);
      setIsMore(true);
    } else {
      setIsMore(false);
      setIsLoad(true);

      setTimeout(() => {
        let newData = data.concat(products.slice(data.length, currentItem));
        setData(newData);
        setIsLoad(false);
      }, 3000);
    }
  };

  // let uri1 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/26/16588342618f4d1bf9f87bd45fa262ecdf8879987f.gif';
  // let uri2 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/22/1658482607b1d69c5a6142af86cd9c121364eb2048.jpg';
  // let uri3 =
  //   'https://img.ltwebstatic.com/images3_ach/2022/07/22/1658480623d145a14402391cfb8b3dad2e8d1316cd.webp';

  // useEffect(() => {
  //   setData(products.slice(0, 10));
  // }, []);

  useEffect(() => {
    const {isAuthenticated, token} = accounts;

    if (isAuthenticated) {
      dispatch(getHeartUser(`Bearer ${token}`, accounts.result[0]._id));
    }
  }, [accounts]);

  const loadMore = () => {
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
  const renderView = (
    <View style={styles.container}>
      <Banner
        size="small"
        uri={searchUrl('Home_1', banner)}
        mode="cover"
        key="top_banner"
      />
      {/* <TopCatory /> */}
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
      {products.length != 0 ? (
        <FlashList
          data={data}
          renderItem={renderProDuct}
          numColumns={2}
          // listKey={'home-index'}
          keyExtractor={keyItem}
          showsVerticalScrollIndicator={false}
          // removeClippedSubviews
          ListFooterComponent={loadMore}
          ItemSeparatorComponent={space}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.1}
          // bounces={false}
          estimatedItemSize={ITEM_HEIGHT}
        />
      ) : null}
      {isMore ? (
        <View style={styles.btnMore}>
          <ButtonSub
            size="large"
            bgColor="black"
            value="Xem thêm"
            onPress={goCatory}
          />
        </View>
      ) : null}
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={isEmty}
        renderItem={renderContent}
        ListFooterComponent={renderView}
        listKey="home_index"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
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
  btnMore: {
    width: sizes._screen_width,
    padding: sizes._18sdp,
  },
});
