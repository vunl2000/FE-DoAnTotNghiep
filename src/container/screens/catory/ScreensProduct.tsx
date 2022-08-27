import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import image from '../../../res/require/Images';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import TopTabCatory from '../../navigators/TopTabCatory';
import {NameScreen} from '../../navigators/TabNavigator';
import {HomeName} from '../../navigators/AppContainer';

const ScreensProduct = () => {
  const {carts, numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const {navigate}: any = useNavigation();

  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="mail-outline"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={() => {}}
      />
      <View style={styles.contentHeader}>
        <Icon size={sizes._22sdp} name="search-outline" />
        <TouchableWithoutFeedback
          onPress={() => navigate(NameScreen.SEARCH_SCREEN)}>
          <Text style={styles.textPlaholder}>Tìm kiếm</Text>
        </TouchableWithoutFeedback>
      </View>
      <BadgesIcon
        icon={image.ic_cart}
        count={numberCart}
        onPress={() => navigate(HomeName.CART)}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.contentView}>
        <TopTabCatory />
      </View>
    </SafeAreaView>
  );
};

export default ScreensProduct;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArrayColors.gray_custom_small,
    paddingHorizontal: sizes._10sdp,
    marginHorizontal: sizes._14sdp,
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    paddingBottom: sizes._62sdp,
  },
  textPlaholder: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    marginLeft: sizes._10sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
});
