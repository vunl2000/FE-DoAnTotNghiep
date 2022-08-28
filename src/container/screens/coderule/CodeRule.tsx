import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import image from '../../../res/require/Images';
import AppHeader from '../../../components/header/AppHeader';
import {dataCOD} from '../../../data/fakedata/DataCOD';

const CodeRule = ({navigation}: any) => {
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
          <Text style={styles.textLabel}>Quy tắc COD</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  // custome item flaslist
  function renderItemCODE({item}: any) {
    return <Text style={styles.text}>{item?.titleBody}</Text>;
  }
  // custome
  function RenderView() {
    return (
      <View style={styles.viewConten}>
        <FlatList
          data={dataCOD}
          renderItem={renderItemCODE}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          listKey={'COD_rule'}
        />
      </View>
    );
  }
  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainer_body}>
        <FlatList
          renderItem={null}
          data={null}
          ListFooterComponent={RenderView}
          removeClippedSubviews
          listKey="screen_code_rule"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CodeRule;

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
  text: {
    fontSize: sizes._font_size_big_large,
    fontWeight: '200',
    fontStyle: 'normal',
    marginTop: sizes._20sdp,
    color: ArrayColors._color_black,
  },
});
