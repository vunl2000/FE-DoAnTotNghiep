import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import ColumView from './ColumView';
import BetterImage from '../images/BetterImage';
import FastImage from 'react-native-fast-image';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  cartSeleted?: any;
  dataCartSeleted?: any;
  sumPrice?: any;
};

const ListProductOrder = ({dataCartSeleted, cartSeleted, sumPrice}: Props) => {
  const renderItem = ({item, index}: any) => (
    <View style={styles.contentItem}>
      <BetterImage
        source={{
          uri: item.image,
        }}
        style={styles.img}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.quantity}>
        <View style={styles.circle}>
          <View style={styles.spaceMax} />
          <Text style={styles.textQlity}>x{item.quantity}</Text>
          <View style={styles.spaceMax} />
        </View>
      </View>
    </View>
  );
  const renderSpace = () => <View style={styles.space} />;

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
        <View style={styles.content}>
          <FlatList
            data={dataCartSeleted}
            renderItem={renderItem}
            listKey="product_seleted"
            removeClippedSubviews
            ItemSeparatorComponent={renderSpace}
          />
        </View>
      ) : null}
      <ColumView
        styleContainer={styles.colume}
        styleTextLabel={styles.textDefault}
        valueLeft={'Giá bán'}
        valueRight={formartMoney(sumPrice)}
        styleText={styles.textDefault}
      />
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
  content: {
    paddingHorizontal: sizes._18sdp,
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
  contentItem: {
    position: 'relative',
    height: sizes._90sdp,
    width: sizes._70sdp,
  },
  quantity: {
    width: '100%',
    position: 'absolute',
    bottom: sizes._8sdp,
    alignItems: 'center',
  },
  textQlity: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._14sdp,
    textAlign: 'center',
    color: ArrayColors._color_black,
  },
  circle: {
    borderRadius: sizes._28sdp / 2,
    width: sizes._28sdp,
    height: sizes._28sdp,
    backgroundColor: ArrayColors._color_white_sombre,
  },
  spaceMax: {
    flex: 1,
  },
  space: {
    width: sizes._10sdp,
  },
});
