import {FlatList, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import image from '../../../res/require/Images';
import ContentCatoryItem from './ContentCatory.Item';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';

type Props = {};

const data = [
  {
    id: 'catory-1',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-2',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-3',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-4',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-5',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-6',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-7',
    name: 'Đầm',
    img: image.dress,
  },
  {
    id: 'catory-8',
    name: 'Đầm',
    img: image.dress,
  },
];

const renderItem = ({item, index}: any) => (
  <ContentCatoryItem item={item} index={index} />
);

const backGroundScrollbar = (width: any): ViewStyle => {
  return {
    width: width,
  };
};

const key = (item: any) => item.id;

const ContentCatory = (props: Props) => {
  const scrollBar = () => (
    <View style={styles.containerScroolBar}>
      <View style={[styles.barScroll, backGroundScrollbar(sizes._60sdp / 2)]} />
    </View>
  );

  const space = () => <View style={styles.space} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        listKey="conten-catory"
        keyExtractor={key}
        horizontal
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ItemSeparatorComponent={space}
        ListHeaderComponent={space}
        ListFooterComponent={space}
        pagingEnabled
      />
      {scrollBar()}
    </View>
  );
};

export default ContentCatory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._16sdp,
  },
  containerScroolBar: {
    flex: 1,
    width: sizes._60sdp,
    height: sizes._5sdp,
    backgroundColor: ArrayColors.gray_custom,
    marginTop: sizes._16sdp,
    borderRadius: sizes._3sdp,
  },
  barScroll: {
    height: '100%',
    backgroundColor: ArrayColors._color_black,
  },
  space: {
    width: sizes._18sdp,
  },
});
