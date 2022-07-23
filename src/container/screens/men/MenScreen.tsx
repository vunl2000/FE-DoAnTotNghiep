import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import MenCatory from '../../../components/home/catory/MenCatory';
import Banner from '../../../components/home/banner/Banner';

type Props = {};

const MenScreen = (props: Props) => {
  let srcTop =
    'https://img.ltwebstatic.com/images3_ach/2022/06/16/1655368170602f33678ebf79bfc4618dd8993d035b.webp';

  const renderContent = (
    <>
      <Banner size="medium" uri={srcTop} mode="cover" />
      <MenCatory />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={null}
        renderItem={null}
        ListFooterComponent={renderContent}
        listKey="home_women"
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
});

export default MenScreen;
