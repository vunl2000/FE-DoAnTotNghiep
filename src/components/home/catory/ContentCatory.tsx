import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ContentCatoryItem from './ContentCatory.Item';
import sizes from '../../../res/sizes/sizes';
import {useDispatch} from 'react-redux';
import ArrayColors from '../../../res/colors/ArrayColors';
type Props = {
  data?: any;
  keyList?: any;
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

const ContentCatory = ({data, keyList}: Props) => {
  const ref = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const space = () => <View style={styles.space} />;
  const [load, setLoad] = useState([
    {
      id: 'load_1',
      key: 1,
    },
    {
      id: 'load_2',
      key: 2,
    },
  ]);
  return (
    <>
      <Animated.FlatList
        data={data}
        extraData={data}
        renderItem={renderItem}
        listKey={keyList}
        keyExtractor={key}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={space}
        ListHeaderComponent={space}
        ListFooterComponent={space}
        decelerationRate={'fast'}
        snapToInterval={sizes._screen_width}
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: ref}}}], {
          useNativeDriver: false,
        })}
        viewabilityConfig={viewConfig}
      />
      <View style={styles.contentIndicator}>
        {load.map((item: any, index: any) => {
          const inputRange = [
            (index - 1) * sizes._screen_width,
            index * sizes._screen_width,
            (index + 1) * sizes._screen_width,
          ];

          const colorOutputRange = [
            ArrayColors._color_un_active,
            ArrayColors._color_black,
            ArrayColors._color_un_active,
          ];

          const color = ref.interpolate({
            inputRange,
            outputRange: colorOutputRange,
            extrapolate: 'clamp',
          });
          const opacity = ref.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.indicator,
                {
                  backgroundColor: color,
                  opacity: opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </>
  );
};

export default ContentCatory;

const styles = StyleSheet.create({
  space: {
    width: sizes._18sdp,
  },
  contentIndicator: {
    flexDirection: 'row',
  },
  indicator: {
    height: sizes._5sdp,
    width: sizes._17sdp,
  },
});
