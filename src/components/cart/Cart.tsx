import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CartItem from './Cart.Item';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {};

const Cart = (props: Props) => {
  const {carts} = useSelector((state: any) => state.product);

  const rederItem = ({item, index}: any) => <CartItem item={item} />;
  const keyExtractor = (item: any, index: any) => item.id;
  const lineHorizontal = () => <View style={styles.lineItem} />;

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
        ItemSeparatorComponent={lineHorizontal}
      />
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  lineItem: {
    width: sizes._screen_width - sizes._64sdp,
    height: sizes._1sdp,
    backgroundColor: ArrayColors._color_gray,
    marginVertical: sizes._8sdp,
    alignSelf: 'center',
  },
});
