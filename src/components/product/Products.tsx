import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';
import ProductItem from './Product.Item';

type Props = {};
const renderProDuct = ({item, index}: any) => {
  return <ProductItem item={item} index={index} />;
};

const data = [
  {
    _id: 'sp01',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp02',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp03',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp04',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp05',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp06',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp07',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp08',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp09',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
  {
    _id: 'sp010',
    image: image.ao_nam,
    name: 'Áo phông đẹp cổ tròn',
    price: 350000,
  },
];
const keyItem = (item: any) => item._id;

const space = () => <View style={styles.spaceVertical} />;

const ProDucts = (props: Props) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderProDuct}
        numColumns={2}
        listKey="list-products"
        keyExtractor={keyItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        columnWrapperStyle={styles.centerItem}
        ItemSeparatorComponent={space}
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
