import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';
import ProductItem from './Product.Item';
import {useSelector} from 'react-redux';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {title?: any};
const renderProDuct = ({item, index}: any) => {
  return <ProductItem item={item} index={index} />;
};

const keyItem = (item: any) => item._id;

const space = () => <View style={styles.spaceVertical} />;

const ProDucts = ({title}: Props) => {
  const {products} = useSelector((state: any) => state.product);

  return (
    <>
      <View style={styles.label}>
        <Text style={styles.textLabel}>{title}</Text>
      </View>
      <FlatList
        data={products}
        extraData={products}
        renderItem={renderProDuct}
        numColumns={2}
        listKey="list_products"
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        ItemSeparatorComponent={space}
        initialNumToRender={16}
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
