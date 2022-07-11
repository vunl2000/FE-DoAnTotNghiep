import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes/sizes';
import TopCatory from '../../../components/home/catory/TopCatory';
import Banner from '../../../components/home/banner/Banner';
import ContentCatory from '../../../components/home/catory/ContentCatory';
import Products from '../../../components/product/Products';

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
const topBanner = () => {
  let src =
    'https://img.ltwebstatic.com/images3_acp/2022/06/17/16554807169532cb4d71508bba3fc15beed0c46a6d.webp';
  return (
    <>
      <Image
        source={{uri: src}}
        style={styles.topBanner}
        resizeMode="contain"
      />
    </>
  );
};

const renderView = () => (
  <View style={styles.container}>
    {topBanner()}

    <TopCatory />

    <Banner
      uri={
        'https://img.ltwebstatic.com/images3_ach/2022/06/27/1656331072aa49c2b5baac61ed9ac163d364cefc79.webp'
      }
    />

    <ContentCatory />
    <Products />
  </View>
);

const HomeIndex: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <FlatList
        data={isEmty}
        renderItem={renderContent}
        ListFooterComponent={renderView()}
        listKey="home_index"
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
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
