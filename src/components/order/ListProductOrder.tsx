import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import ColumView from './ColumView';
import {useSelector} from 'react-redux';
import BetterImage from '../images/BetterImage';
import FastImage from 'react-native-fast-image';

type Props = {};

const ListProductOrder = (props: Props) => {
  const {carts, numberCart} = useSelector((state: any) => state.product);
  const [cartSeleted, setCartSeleted] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [dataCartSeleted, setDataCartSeleted] = useState([]);

  const renderItem = ({item, index}: any) => (
    <BetterImage
      source={{
        uri: item.image,
      }}
      style={styles.img}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  useEffect(() => {
    let count = 0;
    let price = 0;
    let products: any = [];
    carts.forEach((item: any) => {
      if (item.selected) {
        count += item.quantity;
        price += item.quantity * item.price;
        products.push(item);
      }
    });
    setCartSeleted(count);
    setSumPrice(price);
    setDataCartSeleted(products);
  }, [cartSeleted, carts, sumPrice, numberCart]);
  return (
    <View style={styles.container}>
      <ColumView
        styleContainer={styles.colume}
        styleTextLabel={styles.textTitel}
        valueLeft={'Fashion'}
        valueRight={`${cartSeleted} Sản phẩm`}
        styleText={styles.textDefault}
      />
      {dataCartSeleted ? (
        <FlatList
          data={dataCartSeleted}
          renderItem={renderItem}
          listKey="product_seleted"
        />
      ) : null}
    </View>
  );
};

export default ListProductOrder;

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizes._8sdp,
    backgroundColor: ArrayColors._color_white,
  },
  colume: {
    height: sizes._72sdp,
  },
  textTitel: {
    textTransform: 'uppercase',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  img: {
    height: sizes._90sdp,
    width: sizes._70sdp,
  },
});
