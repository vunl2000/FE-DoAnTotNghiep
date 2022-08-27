import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../res/sizes/sizes';
import ProductItem from './Product.Item';
import ArrayColors from '../../res/colors/ArrayColors';
import LottieView from 'lottie-react-native';

type Props = {title?: any; data?: any; keyList?: any};

const ProDucts = ({title, data, keyList}: Props | any) => {
  const [loadItem, setLoadItem] = useState<number>(10);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<any>(data.slice(0, loadItem));

  const renderProDuct = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };

  const keyItem = (item: any) => item._id;

  const space = () => <View style={styles.spaceVertical} />;

  const loadMore = () => (
    <>
      {isLoad ? (
        <View>
          <LottieView
            source={require('../../assets/lottie/fashion_app_loading.json')}
            autoPlay
          />
        </View>
      ) : null}
    </>
  );
  const addItem = () => {
    if (loadItem !== data.length) {
      setIsLoad(true);
      setTimeout(() => {
        let addNew = loadItem + 10;

        if (addNew > data.length) {
          setDataItem(dataItem.concat(data.slice(loadItem, data.length)));
          setLoadItem(data.length);
        } else {
          setDataItem(dataItem.concat(data.slice(loadItem, addNew)));
          setLoadItem(addNew);
        }
        setIsLoad(false);

        console.log('load more ' + addNew);
      }, 3000);
    }
  };

  return (
    <>
      {title ? (
        <View style={styles.label}>
          <Text style={styles.textLabel}>{title}</Text>
        </View>
      ) : null}
      <FlatList
        data={dataItem}
        extraData={dataItem}
        renderItem={renderProDuct}
        numColumns={2}
        listKey={keyList}
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ItemSeparatorComponent={space}
        initialNumToRender={10}
        ListFooterComponent={loadMore}
        onEndReached={addItem}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};

export default ProDucts;

const styles = StyleSheet.create({
  spcae: {
    width: sizes._16sdp,
    height: '100%',
  },
  spaceVertical: {
    height: sizes._16sdp,
  },
  centerItem: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  label: {
    paddingVertical: sizes._16sdp,
  },
  textLabel: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    lineHeight: sizes._26sdp,
    color: ArrayColors._color_black,
    marginVertical: sizes._10sdp,
    textAlign: 'center',
  },
});
