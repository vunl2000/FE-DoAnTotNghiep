import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {arrKey} from '../../data/ArrKeySuggestions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../container/navigators/TabNavigator';
type Props = {};

const ItemHistory = (props: Props) => {
  const [productData, setProductData] = React.useState<string | any>([]);
  const item = useSelector((state: any) => state.itemHistory);

  const {replace}: any = useNavigation();


  console.log(item);
  console.log(productData);

  function eventClickItem(item: string | any) {
    console.log(item);
    ///điều hướng tới màn hình sản phẩm
    replace(NameScreen.PRODUCT_VIEW, {searchKey: item.textInput});
  }
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {item.itemHistory.map((item: any, index: any) => {
        return (
          <View style={styles.mContainerArr} key={index.toString()}>
            <TouchableOpacity
              onPress={() => eventClickItem(item)}
              style={styles.mItemArr}>
              <Text style={styles.mTextItem}>{item.textInput}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  mContainerArr: {
    justifyContent: 'center',
    marginHorizontal: sizes._12sdp,
    marginVertical: sizes._12sdp,
    borderRadius: sizes._3sdp,
    backgroundColor: ArrayColors.blue_item_catory,
    borderColor: ArrayColors.blue_item_catory,
  },
  mItemArr: {
    alignItems: 'center',
  },
  mTextItem: {
    textAlign: 'center',
    fontSize: sizes._13sdp,
    padding: sizes._12sdp,
    color: ArrayColors._color_black,
  },
});
