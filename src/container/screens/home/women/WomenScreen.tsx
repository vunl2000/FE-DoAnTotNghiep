import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Banner from '../../../../components/home/banner/Banner';
import WomenCatory from '../../../../components/home/catory/WomenCatory';
import ArrayColors from '../../../../res/colors/ArrayColors';
import SoloGan from '../../../../components/home/banner/SoloGan';
import sizes from '../../../../res/sizes/sizes';
import ProDucts from '../../../../components/product/Products';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL, GET_PRODUCT_BY_ID_OBJECT} from '@env';
import ProductItem from '../../../../components/product/Product.Item';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {HomeName} from '../../../navigators/AppContainer';
import ButtonSub from '../../../../components/button/ButtonSub';
import AnimatedLottieView from 'lottie-react-native';

type Props = {};
const renderEmty = null;
const isEmty = null;
const WomenScreen = (props: Props) => {
  const [listWomen, setListWomen] = useState<any>([]);
  const [isLoader, setIsLoader] = useState<any>(true);
  const {typeCatory} = useSelector((state: any) => state.catory);
  const {banner} = useSelector((state: any) => state.firstOpen);

  const [isLoad, setIsLoad] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentItem, setCurrentItem] = useState(10);
  const {jumpTo}: any = useNavigation();

  const goCatory = () => {
    jumpTo(HomeName.CATORY);
  };
  const ITEM_HEIGHT = sizes._282sdp;
  // let srcTop =
  //   'https://img.ltwebstatic.com/images3_ach/2022/06/27/1656331239bb13f9f9e24d58c9e7866049e9380e96_thumbnail_840x.webp';
  // let srcHeader =
  //   'https://img.ltwebstatic.com/images3_ach/2022/06/16/1655364091a4d5f726f9ec3abe66e64a0283484685.webp';
  // let sale = 'https://imgaz1.chiccdn.com/os/202207/20220706215325_934.jpg.webp';

  const searchUrl = (keySearch: any) => {
    return banner.filter((item: any) => item.title_data === keySearch);
  };

  const renderProDuct = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };
  const keyItem = (item: any) => item._id;
  const space = () => <View style={styles.spaceY} />;

  const handleOnEndReached = () => {
    setCurrentItem(currentItem + 10);
    if (currentItem > listWomen.length) {
      setIsLoad(false);
      setIsMore(true);
    } else {
      setIsMore(false);
      setIsLoad(true);

      setTimeout(() => {
        let newData = data.concat(listWomen.slice(data.length, currentItem));
        setData(newData);
        setIsLoad(false);
      }, 3000);
    }
  };
  const loadMore = () => {
    if (!isLoad) {
      return null;
    }
    return (
      <View style={styles.contentLoadMore}>
        <AnimatedLottieView
          source={require('../../../../assets/lottie/fashion_app_loading.json')}
          autoPlay
          style={styles.imgLoadMore}
        />
      </View>
    );
  };
  useEffect(() => {
    typeCatory.forEach((item: any) => {
      if (item.titleTypeProduct === 'Nữ') {
        let data = JSON.stringify({
          idTypeProduct: item._id,
        });
        axios({
          method: 'POST',
          url: API_URL + GET_PRODUCT_BY_ID_OBJECT,
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        })
          .then(res => {
            let resData = res.data;
            setListWomen(resData.result);
            setIsLoader(false);
          })
          .catch(err => {
            setIsLoader(false);
            //console.log(err);
          });
      }
    });
  }, [typeCatory]);

  const HotDays = () => (
    <View style={styles.hotDays}>
      <Text style={styles.labelHotDay}>
        Hôm nay có gì <Text style={{color: ArrayColors.red}}>Hots</Text>
      </Text>
      <View style={styles.space} />
      <SoloGan
        uri={searchUrl('Women')[2].image_ads}
        resize="cover"
        reserve={false}
        title="7 ngày mua sắm"
        subtitle="Thỏa sức mua sắm"
        subBtn="20%"
      />
      <View style={styles.space} />
      <SoloGan
        uri={searchUrl('Women')[3].image_ads}
        resize="cover"
        reserve
        title="New Fashion"
        subtitle="Trải nghiệm những sản phẩm tuyệt vời với Fashion"
        subBtn="Xem ngay"
      />
    </View>
  );

  const renderContent = (
    <>
      <Banner
        size="medium"
        uri={searchUrl('Women')[0].image_ads}
        mode="cover"
      />
      <WomenCatory />
      <Banner
        size="medium"
        uri={searchUrl('Women')[1].image_ads}
        mode="cover"
      />
      <HotDays />
      <View style={styles.label}>
        <Text style={styles.textLabel}>Tại sao không thử!</Text>
      </View>
      {listWomen.length != 0 ? (
        <FlashList
          data={data}
          renderItem={renderProDuct}
          numColumns={2}
          //listKey={'women-index'}
          keyExtractor={keyItem}
          showsVerticalScrollIndicator={false}
          // removeClippedSubviews={false}
          ItemSeparatorComponent={space}
          ListFooterComponent={loadMore}
          onEndReachedThreshold={0.1}
          onEndReached={handleOnEndReached}
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
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={isEmty}
        renderItem={renderEmty}
        ListFooterComponent={renderContent}
        listKey="home_women"
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WomenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
  space: {
    height: sizes._18sdp,
  },
  hotDays: {
    paddingTop: sizes._18sdp,
  },
  labelHotDay: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    lineHeight: sizes._24sdp,
    textAlign: 'center',
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
  btnMore: {
    width: sizes._screen_width,
    padding: sizes._18sdp,
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
