import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import ColumView from './ColumView';
import {formartMoney} from '../../utils/Utilities';

type Props = {
  sumPrice?: any;
  priceTranSport?: any;
  salePrice?: any;
};

const SaleProDuct = ({salePrice, sumPrice, priceTranSport}: Props) => {
  return (
    <View style={styles.container}>
      <ColumView
        styleContainer={styles.column}
        styleTextLabel={styles.textDefault}
        valueLeft={'Giá bán'}
        valueRight={formartMoney(sumPrice)}
        styleText={[styles.textSub, {textDecorationLine: 'line-through'}]}
      />
      <ColumView
        styleContainer={styles.column}
        styleTextLabel={styles.textDefault}
        valueLeft={'Giảm giá'}
        valueRight={formartMoney(salePrice)}
        styleText={[styles.textDefault, {color: ArrayColors.darkRed}]}
      />
      <ColumView
        styleContainer={styles.column}
        styleTextLabel={styles.textDefault}
        valueLeft={'Phí vận chuyển'}
        valueRight={formartMoney(priceTranSport)}
        styleText={styles.textDefault}
      />
    </View>
  );
};

export default SaleProDuct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  column: {
    height: sizes._72sdp,
  },
});
