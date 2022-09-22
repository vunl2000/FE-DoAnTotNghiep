import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import AppHeader from '../../../components/header/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

type Props = {};

const data = {
  define:
    'Thanh toán khi giao hàng (COD) có nghĩa là trả tiền khi nhân viên vận chuyển giao hàng đến khách hàng, để khách hàng của chúng tôi tận hưởng dịch vụ tốt nhất.',
  condition: 'Tài khoản của bạn cần được xác thực bảo mật.',
  condition_user:
    'Địa chỉ giao hàng và số điện thoại di động chính xác là cần thiết.',
  cancel_oder:
    'Bạn có thể hủy đơn đặt hàng khi đơn hàng chưa được xác nhận. Nếu không thành công, thì có nghĩa là đơn đặt hàng đã được xử lý để giao hàng. Trong trường hợp này, vui lòng liên hệ với nhân viên dịch vụ khách hàng để thử lại.',
  transport:
    'Các đơn hàng đặt trên FASHION sẽ được vận chuyển bằng cty vận chuyển khác nhau,vui lòng tham khảo chi tiết thời gian vận chuyển. Dự kiến nhận hàng sẽ là 3 ngày trước thời điểm đặt hàng. Sự chậm trễ đặt biệt có thể xảy ra do những trường hợp đặt biệt.Chúng tôi sẽ cố gắng hết sức để vận chuyển và giao hàng cho bạn trong thời gian sớm nhất.',
  delivery:
    'Nhân viên vận chuyển sẽ giao hàng cho bạn tại địa chỉ của bạn và nhận tiền đặt hàng thay vì chúng tôi. Vui lòng chuẩn bị trước đúng số tiền và đảm bảo điện thoại di động của bạn không bị khóa để nhân viên vận chuyển có thể liên lạc với bạn.',
  returns:
    'Khoản tiền hoàn lại được xử lý trong vòng 5 -7 ngày làm việc sau khi chúng tôi nhận được gói trả lại của bạn. Nhân viên FASHION sẽ gọi thông báo và hoàn tiền cho bạn qua cách tiện lợi nhất. Với FASHION chúng tôi luôn đặt chất lượng dịch vụ lên hàng đầu.',
};

const ShipCOD = (props: Props) => {
  const {goBack, navigate}: any = useNavigation();

  const onBackPress = () => goBack();

  const ContentHeader = () => (
    <View style={styles.contentHeder}>
      <IconHeader
        name={'chevron-back'}
        sizes={sizes._24sdp}
        onPress={onBackPress}
        style={styles.iconHeader}
        color={ArrayColors._color_black}
      />
      <View
        style={[
          styles.content,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.textLabel}>Ship COD</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );

  const renderContent = (
    <View
      style={[
        styles.content,
        {
          paddingVertical: sizes._18sdp,
          paddingHorizontal: sizes._18sdp,
        },
      ]}>
      <Text style={styles.textDefault}>{data.define}</Text>
      <View style={styles.spaceMediumY} />
      {/* First menu */}
      <Text style={styles.textLabel}>1. Đặt hàng</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textLabel}>Điều kiện khi đặt hàng</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.condition}</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.condition_user}</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textLabel}>Hủy đơn hàng</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.cancel_oder}</Text>
      <View style={styles.spaceMediumY} />
      {/* Next menu */}
      <Text style={styles.textLabel}>2. Vận Chuyển & Giao Hàng</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textLabel}>Vận Chuyển</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.transport}</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textLabel}>Giao Hàng</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.delivery}</Text>
      <View style={styles.spaceMediumY} />
      {/* End menu */}
      <Text style={styles.textLabel}>3. Trả Hàng & Hoàn Tiền</Text>
      <View style={styles.spaceSmallY} />

      <Text style={styles.textDefault}>{data.returns}</Text>
      <View style={styles.spaceMediumY} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <AppHeader content customContent={<ContentHeader />} />
      <Divider />
      <View style={styles.content}>
        <FlatList
          data={null}
          renderItem={null}
          listKey="screen-ship-cod"
          ListFooterComponent={renderContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default ShipCOD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  contentHeder: {
    flex: 1,
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
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    fontSize: sizes._18sdp,
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
