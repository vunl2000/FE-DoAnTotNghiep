import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import image from '../../../res/require/Images';

const ScreenCheckQuestions = ({navigation}: any) => {
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
          <Text style={styles.textLabel}>Trung tâm khảo sát</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  function RendercontentView() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={image.heart_empty}
          style={{width: sizes._112sdp, height: sizes._112sdp}}
          resizeMode="contain"
        />
        <Text style={styles.textDefault}>Trống</Text>
      </View>
    );
  }
  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainerBody}>
        <FlatList
          data={[]}
          extraData={[]}
          renderItem={null}
          //   keyExtractor={item => `${item.id}`}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<RendercontentView />}
          listKey="check_question"
        />
      </View>
    </View>
  );
};

export default ScreenCheckQuestions;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
  mContainerBody: {
    flex: 1,
    backgroundColor: ArrayColors.gray_bg_light,
    // paddingBottom: sizes._20sdp,
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
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontSize: sizes._22sdp,
    fontWeight: '700',
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    fontWeight: '400',
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
  },
});
