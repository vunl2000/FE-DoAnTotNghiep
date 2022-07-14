import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CartItem from './Cart.Item';

type Props = {};

const Cart = (props: Props) => {
  const {carts} = useSelector((state: any) => state.product);

  const rederItem = ({item, index}: any) => <CartItem item={item} />;
  const keyExtractor = (item: any, index: any) => index.toString();
  return (
    <>
      <FlatList
        data={carts}
        extraData={carts}
        keyExtractor={keyExtractor}
        renderItem={rederItem}
        removeClippedSubviews
        numColumns={1}
        listKey="cart-product"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
