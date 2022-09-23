import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {arrKey} from '../../data/ArrKeySuggestions';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../container/navigators/TabNavigator';

type Props = {};

const ItemSuggestions = (props: Props) => {
  const {replace}: any = useNavigation();

  function eventClickItem(item: string | any) {
    //console.log(item.slice(2, item.length));
    //điều hướng tới màn hình sản phẩm
    replace(NameScreen.PRODUCT_VIEW, {searchKey: item.slice(2, item.length)});
  }
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {arrKey.map((item, index) => {
        return (
          <View style={styles.mContainerArr} key={item}>
            <TouchableOpacity
              onPress={() => eventClickItem(item)}
              style={styles.mItemArr}>
              <Text style={styles.mTextItem}>{item}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ItemSuggestions;

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
