import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import sizes from '../../../res/sizes/sizes';
import TopCatory from '../../../components/home/catory/TopCatory';
import Banner from '../../../components/home/banner/Banner';
import ContentCatory from '../../../components/home/catory/ContentCatory';
import Products from '../../../components/product/Products';
import {useDispatch, useSelector} from 'react-redux';
import {loadCatory} from '../../../store/actions/catoryActions';
import {ActivityIndicator} from 'react-native-paper';
import ArrayColors from '../../../res/colors/ArrayColors';
import Loading from '../../../components/modal/Loading';
import {loadProducts} from '../../../store/actions/productsActions';
import HomeCatory from '../../../components/home/catory/HomeCatory';

interface Props {}

const renderContent = null;
const isEmty = null;

const renderItem = ({item, index}: {item: any; index: any}) => {
  return (
    <View
      style={{
        height: sizes._58sdp,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#000',
      }}>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            lineHeight: sizes._26sdp,
            fontSize: sizes._font_size_big_large,
            fontWeight: '400',
            color: '#fff',
          }}>
          {item?.mission}
        </Text>
      </View>
    </View>
  );
};

const HomeIndex: React.FC<Props> = props => {
  const {pending, accessory} = useSelector((state: any) => state.catory);
  const {isLoading} = useSelector((state: any) => state.product);

  let src =
    'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1658507911010.jpeg';
  let srcContent =
    'https://profile-picture-upload-shop.s3.ap-southeast-1.amazonaws.com/image-1658508008813.jpeg';

  const renderView = (
    <View style={styles.container}>
      <Banner size="small" uri={src} mode="contain" />
      <TopCatory />
      <Banner size="medium" uri={srcContent} mode="cover" />

      <HomeCatory />
      <Products />
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
