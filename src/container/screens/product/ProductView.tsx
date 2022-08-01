import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import AppHeader from '../../../components/header/AppHeader';
import BadgesIcon from '../../../components/icons/BadgesIcon';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import IconHeader from '../../../components/icons/IconHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSub from 'react-native-vector-icons/MaterialCommunityIcons';
import image from '../../../res/require/Images';
import {Divider} from 'react-native-paper';

type Props = {};

const ProductView = (props: Props) => {
  const {carts, numberCart} = useSelector((state: any) => state.product);
  const route: any = useRoute();
  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back-outline"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={() => {}}
      />
      <View style={styles.contentHeader}>
        <Icon size={sizes._22sdp} name="search-outline" />
        <TouchableWithoutFeedback>
          <Text style={[styles.textPlaholder, {flex: 1}]}>Tìm kiếm</Text>
        </TouchableWithoutFeedback>
        <Icon size={sizes._22sdp} name="close-circle" />
      </View>
      <BadgesIcon icon={image.ic_cart} count={numberCart} onPress={() => {}} />
    </View>
  );
  const Filter = () => (
    <View style={styles.contentSeach}>
      <View style={styles.itemSeach}>
        <Text style={styles.textSub}>Phân loại</Text>
        <View style={styles.spaceSmallX} />
        <Icon
          size={sizes._16sdp}
          name="chevron-up-outline"
          color={ArrayColors._color_black}
        />
      </View>
      <View style={styles.itemSeach}>
        <Text style={styles.textDefault}>Lọc</Text>
        <View style={styles.spaceSmallX} />
        <IconSub
          size={sizes._16sdp}
          name="filter-outline"
          color={ArrayColors._color_black}
        />
      </View>
    </View>
  );
  const renderContent = (
    <>
      <Filter />
      <Divider />
    </>
  );
  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.content}>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductView;

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
  contentSeach: {
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._10sdp,
    marginTop: sizes._10sdp,
    justifyContent: 'space-between',
  },
  itemSeach: {
    flexDirection: 'row',
    alignItems: 'center',
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
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    marginLeft: sizes._10sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  spaceSmallX: {
    width: sizes._10sdp,
  },
  spaceMediumX: {
    width: sizes._18sdp,
  },
  spaceSmallY: {
    height: sizes._10sdp,
  },
  spaceMediumY: {
    height: sizes._18sdp,
  },
});
