import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';
import ProductItem from './Product.Item';
import {useSelector} from 'react-redux';
import {loadProducts} from '../../store/actions/productsActions';

type Props = {};
const renderProDuct = ({item, index}: any) => {
  return <ProductItem item={item} index={index} />;
};

const keyItem = (item: any) => item._id;

const space = () => <View style={styles.spaceVertical} />;

const ProDucts = (props: Props) => {
  const {products} = useSelector((state: any) => state.product);

  return (
    <>
      <FlatList
        data={products.result}
        renderItem={renderProDuct}
        numColumns={2}
        listKey="list_products"
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        columnWrapperStyle={styles.centerItem}
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
});
