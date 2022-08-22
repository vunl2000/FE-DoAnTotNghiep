import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';

const ScreenWalet = ({props, navigation}: any) => {
  const [temporary, setTemporary] = useState(false);

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
          <Text style={styles.textLabel}>VÍ</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }

  function RenderView() {
    return (
      <View style={styles.viewConten}>
        <Image source={require('../../../assets/images/img_empty.png')} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainer_body}>
        {temporary == false ? (
          <View style={styles.viewConten}>
            <Image source={require('../../../assets/images/img_empty.png')} />
          </View>
        ) : (
          <FlatList
            renderItem={null}
            data={[]}
            ListFooterComponent={<RenderView />}
            removeClippedSubviews
            listKey="screen_walet"
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWalet;

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
});
