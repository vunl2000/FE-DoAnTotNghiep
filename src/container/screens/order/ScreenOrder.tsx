import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppHeader from '../../../components/header/AppHeader';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ColumView from '../../../components/order/ColumView';
import TranSport from '../../../components/order/TranSport';
import Pay from '../../../components/order/Pay';
import Location from '../../../components/order/Location';
import ListProductOrder from '../../../components/order/ListProductOrder';

type Props = {};

const ScreenOrder = (props: Props) => {
  const {goBack}: any = useNavigation();

  const onBackPress = () => goBack();

  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={onBackPress}
      />
      <View style={styles.contentHeader}>
        <Text style={styles.textLabel}>Xác nhận đặt hàng</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );

  const renderContent = () => (
    <View>
      <Location />
      <View style={styles.spaceMedium} />
      {/*Đơn vị giao hàng*/}
      <TranSport />
      <View style={styles.spaceMedium} />
      {/* Phương thức thanh toán*/}
      <Pay />

      <View style={styles.spaceMedium} />
      <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Áp dụng phiếu giảm giá"
        valueRight={'-103.800đ'}
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Điểm"
        valueRight="Tổng cộng: 0"
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <Divider />
      <ColumView
        styleContainer={styles.columeMedium}
        valueLeft="Thẻ quà tặng"
        styleText={styles.textDefault}
        styleTextLabel={styles.textDefault}
        iconRight
      />
      <View style={styles.spaceMedium} />
      <ListProductOrder />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.content}>
        <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="screen_oder"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreenOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
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
  columeMedium: {
    height: sizes._72sdp,
  },
  spaceMedium: {
    height: sizes._16sdp,
  },
});
