import {FlatList, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import ContentCatoryItem from './ContentCatory.Item';
import sizes from '../../../res/sizes/sizes';
import {useDispatch} from 'react-redux';
type Props = {
  data?: any;
};

const renderItem = ({item, index}: any) => (
  <ContentCatoryItem item={item} index={index} />
);

const backGroundScrollbar = (width: any): ViewStyle => {
  return {
    width: width,
  };
};

const key = (item: any) => item._id;

const ContentCatory = ({data}: Props) => {
  const space = () => <View style={styles.space} />;
  const dispatch: any = useDispatch();
  return (
    <FlatList
      data={data}
      extraData={data}
      renderItem={renderItem}
      listKey="content-catory"
      keyExtractor={key}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={space}
      ListHeaderComponent={space}
      ListFooterComponent={space}
      decelerationRate={'fast'}
      bounces={false}
      removeClippedSubviews
      snapToInterval={sizes._screen_width}
      pagingEnabled
    />
  );
};

export default ContentCatory;

const styles = StyleSheet.create({
  space: {
    width: sizes._18sdp,
  },
});
