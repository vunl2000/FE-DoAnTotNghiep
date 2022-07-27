import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Banner from '../../../components/home/banner/Banner';
import WomenCatory from '../../../components/home/catory/WomenCatory';
import ArrayColors from '../../../res/colors/ArrayColors';
import SoloGan from '../../../components/home/banner/SoloGan';
import sizes from '../../../res/sizes/sizes';

type Props = {};
const renderEmty = null;
const isEmty = null;
const WomenScreen = (props: Props) => {
  let srcTop =
    'https://img.ltwebstatic.com/images3_ach/2022/06/27/1656331239bb13f9f9e24d58c9e7866049e9380e96_thumbnail_840x.webp';
  let srcHeader =
    'https://img.ltwebstatic.com/images3_ach/2022/06/16/1655364091a4d5f726f9ec3abe66e64a0283484685.webp';
  let sale = 'https://imgaz1.chiccdn.com/os/202207/20220706215325_934.jpg.webp';

  const HotDays = () => (
    <View style={styles.hotDays}>
      <Text style={styles.labelHotDay}>
        Hôm nay có gì <Text style={{color: ArrayColors.red}}>Hots</Text>
      </Text>
      <View style={styles.space} />
      <SoloGan
        uri={sale}
        resize="cover"
        reserve={false}
        title="7 ngày mua sắm"
        subtitle="Thỏa sức mua sắm"
        subBtn="20%"
      />
      <View style={styles.space} />
      <SoloGan
        uri={sale}
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
      <Banner size="medium" uri={srcTop} mode="cover" />
      <WomenCatory />
      <Banner size="medium" uri={srcHeader} mode="cover" />
      <HotDays />
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
  space: {
    height: sizes._18sdp,
  },
  hotDays: {
    paddingVertical: sizes._18sdp,
  },
  labelHotDay: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    lineHeight: sizes._24sdp,
    textAlign: 'center',
  },
});
