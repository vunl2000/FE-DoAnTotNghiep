import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../../res/sizes/sizes';
import TopCatory from '../../../../components/home/catory/TopCatory';
import Banner from '../../../../components/home/banner/Banner';
import Products from '../../../../components/product/Products';
import {useSelector} from 'react-redux';
import HomeCatory from '../../../../components/home/catory/HomeCatory';
import ProductItem from '../../../../components/product/Product.Item';
import {Text} from 'react-native';
import ArrayColors from '../../../../res/colors/ArrayColors';

interface Props {}

const renderContent = null;
const isEmty = null;

const HomeIndex: React.FC<Props> = props => {
  const {products} = useSelector((state: any) => state.product);
  const {banner} = useSelector((state: any) => state.firstOpen);

  // let uri1 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/26/16588342618f4d1bf9f87bd45fa262ecdf8879987f.gif';
  // let uri2 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/22/1658482607b1d69c5a6142af86cd9c121364eb2048.jpg';
  // let uri3 =
  //   'https://img.ltwebstatic.com/images3_ach/2022/07/22/1658480623d145a14402391cfb8b3dad2e8d1316cd.webp';

  const searchUrl = (keySearch: any) => {
    return banner.filter((item: any) => item.title_ads === keySearch)[0]
      .image_ads;
  };
  const renderProDuct = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };
  const space = () => <View style={styles.spaceY} />;
  const keyItem = (item: any) => item._id;

  const renderView = (
    <View style={styles.container}>
      <Banner
        size="small"
        uri={searchUrl('Home_1')}
        mode="cover"
        key="top_banner"
      />
      <TopCatory />
      <Banner
        size="medium"
        uri={searchUrl('Home_2')}
        mode="cover"
        key="content_banner"
      />

      <HomeCatory />
      <Banner
        size="medium"
        uri={searchUrl('Home_3')}
        mode="cover"
        key="fooster_banner"
      />
      <View style={styles.label}>
        <Text style={styles.textLabel}>Đề xuất</Text>
      </View>

      <FlatList
        data={products.slice(0, 10)}
        renderItem={renderProDuct}
        numColumns={2}
        listKey={'home-index'}
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ItemSeparatorComponent={space}
        initialNumToRender={10}
        bounces={false}
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
});
