import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import BetterImage from '../images/BetterImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrayColors from '../../res/colors/ArrayColors';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  item?: any;
};

const CartItem = (props: Props) => {
  const {item} = props;

  return (
    <View style={styles.container}>
      <BetterImage
        source={{
          uri: item.image,
        }}
        style={styles.img}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <View style={styles.topContent}>
          <Text>{item.name}</Text>
          <Icon
            style={styles.icon}
            name="heart-plus-outline"
            size={sizes._24sdp}
          />
        </View>
        <Text>Size: {item.size}</Text>
        <Text>Color: {item.color}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.itemPrice}>{formartMoney(item.price)}</Text>
          <Text style={styles.itemPrice}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: sizes._16sdp,
    flexDirection: 'row',
  },
  img: {
    width: sizes._110sdp,
    height: sizes._140sdp,
  },
  content: {
    flex: 1,
    paddingLeft: sizes._16sdp,
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    alignSelf: 'center',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: sizes._font_size_big_large,
    fontFamily: 'OpenSans-Blod',
    color: ArrayColors._color_black,
  },
});
