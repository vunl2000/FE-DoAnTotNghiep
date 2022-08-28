import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import AppHeader from '../../../components/header/AppHeader';
import ItemRulersize from '../../../components/rulersize/ItemRulersize';
import {
  dataCellGiay,
  dataDetail,
  dataDetailGiay,
  dataDetailQuan,
  dataHeaderquan,
  dataRulerheader,
  dataXheader,
  dataXheaderQuan,
  sizeGiay,
} from '../../../data/fakedata/DataRulerSize';
import {SvgXml} from 'react-native-svg';
import image from '../../../res/require/Images';
import ItemViewSie from '../../../components/rulersize/ItemViewSie';
import {makeId} from '../../../utils/Utilities';

const ScreenRulerSize = ({navigation}: any) => {
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
          <Text style={styles.textLabel}>Hướng dẫn kích thước</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  function renderConten() {
    return (
      <View>
        <View>
          <ItemRulersize
            data={dataRulerheader}
            dataCell={dataXheader}
            title={'Kích thước áo'}
            key={makeId(20)}
          />
          <ItemViewSie dataClothes={dataDetail} />
        </View>
        <View>
          <ItemRulersize
            data={dataHeaderquan}
            dataCell={dataXheaderQuan}
            title={'Kích thước quần'}
          />
          <ItemViewSie dataClothes={dataDetailQuan} />
        </View>
        <View>
          <ItemRulersize
            data={sizeGiay}
            dataCell={dataCellGiay}
            title={'Kích thước giày'}
          />
          <ItemViewSie dataClothes={dataDetailGiay} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainer_body}>
        <FlatList
          data={null}
          renderItem={null}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          listKey="ruler_size"
          ListFooterComponent={renderConten}
        />
      </View>
    </View>
  );
};

export default ScreenRulerSize;

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
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    fontSize: sizes._22sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
