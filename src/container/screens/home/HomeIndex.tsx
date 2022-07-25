import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../res/sizes/sizes';
import TopCatory from '../../../components/home/catory/TopCatory';
import Banner from '../../../components/home/banner/Banner';
import Products from '../../../components/product/Products';
import {useSelector} from 'react-redux';

import HomeCatory from '../../../components/home/catory/HomeCatory';

interface Props {}

const renderContent = null;
const isEmty = null;

const HomeIndex: React.FC<Props> = props => {
  const [bannerSale, setBannerSale] = useState();
  const [bannerHeader, setBannerHeader] = useState();
  const {banner} = useSelector((state: any) => state.firstOpen);

  const renderView = (
    <View style={styles.container}>
      <Banner size="small" uri={bannerSale} mode="contain" />
      <TopCatory />
      <Banner size="medium" uri={bannerHeader} mode="cover" />

      <HomeCatory />
      <Products />
    </View>
  );

  useEffect(() => {
    if (banner) {
      banner.find((item: any) => {
        item.title_data === 'BannerSale' && setBannerSale(item.image_ads);
      });
      banner.find((item: any) => {
        item.title_data === 'Home' && setBannerHeader(item.image_ads);
      });
    }
  }, [banner]);

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
