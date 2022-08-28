import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import image from '../../../res/require/Images';
import AppHeader from '../../../components/header/AppHeader';
import {dataCOD, dataNote, dataShip} from '../../../data/fakedata/DataCOD';
import {makeId} from '../../../utils/Utilities';

const key = (item: any, index: any) => makeId(8);
const Shipping = ({navigation}: any) => {
  // custom HEADER
  function HeaderContent() {
    return (
      <View style={styles.containerHeader}>
        <IconHeader
          name="chevron-back"
          sizes={sizes._24sdp}
          color={ArrayColors._color_black}
          style={styles.iconHeader}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contentHeader}>
          <Text style={styles.textLabel}>Giao hàng</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  // custome
  function RenderView() {
    return (
      <View style={styles.viewConten}>
        <Text style={styles.textHeader}>Giao hàng tiêu chuẩn</Text>
        {dataShip.map((item: any, index: any) => (
          <View
            style={[
              styles.contaier,
              {
                borderTopWidth: sizes._1sdp,
                borderBottomColor:
                  index % 2 == 0 ? 'transparent' : ArrayColors.gray_custom,
                borderBottomWidth: index % 2 == 0 ? 0 : sizes._1sdp,
              },
            ]}>
            {item.dataRow.map((item: any) => (
              <View style={[styles.title]}>
                <Text style={styles.titleRow}>{item.titleRow}</Text>
              </View>
            ))}
          </View>
        ))}

        {dataNote.map(item => (
          <View style={{padding: sizes._9sdp}}>
            <Text style={styles.textNote}>{item.titleNote}</Text>
          </View>
        ))}
      </View>
    );
  }
  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainer_body}>
        <FlatList
          renderItem={null}
          data={[]}
          ListFooterComponent={RenderView}
          removeClippedSubviews
          listKey="screen_code_rule"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContainer_body: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
    borderTopColor: ArrayColors._color_gray,
    borderTopWidth: sizes._1sdp,
  },
  viewConten: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizes._10sdp,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._24sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: sizes._font_size_big_large,
    fontWeight: '200',
    fontStyle: 'normal',
    marginTop: sizes._20sdp,
    color: ArrayColors._color_black,
  },
  title: {
    width: sizes._screen_width / 3.2,
    alignItems: 'center',
    borderLeftColor: ArrayColors.gray_custom,
    borderLeftWidth: sizes._1sdp,
    borderRightColor: ArrayColors.gray_custom,
    borderRightWidth: sizes._1sdp,
    padding: sizes._20sdp,
  },
  contaier: {
    flexDirection: 'row',
    borderLeftColor: ArrayColors.gray_custom,
    borderLeftWidth: sizes._1sdp,
    borderRightColor: ArrayColors.gray_custom,
    borderRightWidth: sizes._1sdp,
    borderTopColor: ArrayColors.gray_custom,
  },
  textHeader: {
    padding: sizes._20sdp,
    fontSize: sizes._font_size_big_big,
    fontWeight: 'bold',
    color: ArrayColors._color_black_gray12,
  },
  titleRow: {
    fontSize: sizes._font_size_large,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textNote: {
    fontSize: sizes._font_size_large,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ArrayColors._color_black_gray,
  },
});
