import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

const ItemViewSie = ({dataClothes}: any) => {
  return (
    <View key={'datas'}>
      {dataClothes.map((item: any) => (
        <View style={styles.mContainer}>
          <View style={styles.mBody} >
            <Text style={styles.textBody}>
              {item?.textHeader}
            </Text>
            {item.dataInfor.map((item: any) => (
              <View >
                <Text style={styles.titleBody}>
                  {item?.titleHeader}
                </Text>
                <Text style={styles.title} >
                  {item?.titleBody}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.mImage} >
            <Image
              source={item?.imgDetail}
              style={{width: sizes._210sdp, height: sizes._270sdp}}
              resizeMode="contain"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ItemViewSie;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: sizes._19sdp,
    alignItems: 'center',
  },
  mBody: {flex: 0.5},
  textBody: {
    textAlign: 'center',
    fontSize: sizes._font_size_big_large,
    fontWeight: '400',
    color: ArrayColors._color_black,
  },
  titleBody: {
    fontSize: sizes._font_size_big_large,
    fontWeight: 'bold',
    color: ArrayColors._color_black,
  },
  title: {
    fontSize: sizes._font_size_large,
    fontWeight: '400',
    color: ArrayColors._color_black,
    padding: sizes._5sdp,
  },
  mImage: {flex: 0.5},
});
