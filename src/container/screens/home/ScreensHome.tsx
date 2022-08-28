import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import Header from '../../../components/header/Header';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import HomeStack from '../../navigators/HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadAccessory,
  loadColors,
  loadMen,
  loadSizes,
  loadWomen,
} from '../../../store/actions/catoryActions';
import {NameScreen} from '../../navigators/TabNavigator';
import {HomeName} from '../../navigators/AppContainer';

const ScreensHome = ({navigation}: {navigation: any}) => {
  const dispatch: any = useDispatch();
  const {typeCatory} = useSelector((state: any) => state.catory);

  const {mContainer} = styles;

  useEffect(() => {
    typeCatory.forEach((item: any) => {
      if (item.titleTypeProduct === 'Phụ kiện') {
        dispatch(loadAccessory(item._id));
      }
      if (item.titleTypeProduct === 'Nam') {
        dispatch(loadMen(item._id));
      }
      if (item.titleTypeProduct === 'Nữ') {
        dispatch(loadWomen(item._id));
      }
    });
  }, [typeCatory]);

  useEffect(() => {
    dispatch(loadSizes());
    dispatch(loadColors());
  }, []);

  function eventSearch() {
    navigation.navigate(NameScreen.SEARCH_SCREEN);
  }

  function eventHeart() {
    navigation.navigate(NameScreen.HEART_PRODUCT);
  }

  function eventCart() {
    navigation.navigate(HomeName.CART);
  }
  function eventEmail() {
    navigation.navigate('ScreenNotification');
    console.log('Tin nhắn');
  }

  return (
    <SafeAreaView style={mContainer}>
      <Header
        onPressHeart={eventHeart}
        onPressSearch={eventSearch}
        logo
        onPressCart={eventCart}
        onPressEmail={eventEmail}
      />
      <View style={styles.contentView}>
        <HomeStack />
      </View>
    </SafeAreaView>
  );
};

export default memo(ScreensHome);

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  contentView: {
    flex: 1,
  },
});
