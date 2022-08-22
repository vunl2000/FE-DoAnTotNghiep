import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Banner from '../../../components/home/banner/Banner';
import WomenCatory from '../../../components/home/catory/WomenCatory';
import ArrayColors from '../../../res/colors/ArrayColors';

type Props = {};
const renderEmty = null;
const isEmty = null;
const WomenScreen = (props: Props) => {
  let srcTop =
    'https://img.ltwebstatic.com/images3_ach/2022/06/27/1656331239bb13f9f9e24d58c9e7866049e9380e96_thumbnail_840x.webp';

  const renderContent = (
    <>
      <Banner size="medium" uri={srcTop} mode="cover" />
      <WomenCatory />
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
        bounces={false}
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
});
