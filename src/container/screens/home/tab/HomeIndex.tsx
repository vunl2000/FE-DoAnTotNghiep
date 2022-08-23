import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../../res/sizes/sizes';
import TopCatory from '../../../../components/home/catory/TopCatory';
import Banner from '../../../../components/home/banner/Banner';
import Products from '../../../../components/product/Products';
import {useSelector} from 'react-redux';
import HomeCatory from '../../../../components/home/catory/HomeCatory';

interface Props {}

const renderContent = null;
const isEmty = null;

const HomeIndex: React.FC<Props> = props => {
  const {products} = useSelector((state: any) => state.product);
  // let uri1 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/26/16588342618f4d1bf9f87bd45fa262ecdf8879987f.gif';
  // let uri2 =
  //   'https://img.ltwebstatic.com/images3_acp/2022/07/22/1658482607b1d69c5a6142af86cd9c121364eb2048.jpg';
  // let uri3 =
  //   'https://img.ltwebstatic.com/images3_ach/2022/07/22/1658480623d145a14402391cfb8b3dad2e8d1316cd.webp';
  const {banner} = useSelector((state: any) => state.firstOpen);

  const searchUrl = (keySearch: any) => {
    return banner.filter((item: any) => item.title_ads === keySearch).image_ads;
  };

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
      <Products
        title={'Đề xuất'}
        data={products}
        keyList="Home_index_screens"
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
        removeClippedSubviews
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
});
