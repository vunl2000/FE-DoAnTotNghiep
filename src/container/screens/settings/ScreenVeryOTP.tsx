import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Input from '../../../components/accounts/Input';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import Images from '../../../res/require/Images';
import AppHeader from '../../../components/header/AppHeader';
import HeaderShown from '../../../components/accounts/HeaderShown';
import Loading from '../../../components/modal/Loading';
import {NameScreen} from '../../navigators/TabNavigator';
type Props = {};

const ScreenVeryOTP = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const isAndroid = Platform.OS === 'android';

  function onBackPress() {
    navigation.goBack();
  }
  function eventLogin() {
    navigation.navigate('ScreenLogin');
  }
  function handleSkip() {
    navigation.navigate(NameScreen.SETTINGS);
  }
  function handleConfirm() {
    // navigation.navigate('ScreenLogin');
  }

  function eventReqOTP() {
    console.log('req');
  }
  function renderContent() {
    return (
      <>
        <View
          style={{
            marginHorizontal: sizes._20sdp,
            width: sizes._screen_width - sizes._40sdp,
            marginTop: sizes._20sdp,
          }}>
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_black,
              fontWeight: 'bold',
              lineHeight: sizes._22sdp,
            }}>
            Một mã OTP đã được gửi đến Email của bạn vui lòng kiểm tra Email.
          </Text>
          <Input
            //   value={email}
            //   onPress_1={clearTextEmail}
            titleInPut="Mã xác thực"
            placeholder="Enter OTP"
            nameImg_1={Images.ic_mark_cut}
            //   onChangeText={text => eventEditEmail(text)}
            //   setIconViewEmail={visibleIconEmail}
            keyboardType="numeric"
          />
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: sizes._24sdp,
            }}>
            <Text
              onPress={eventReqOTP}
              style={{fontSize: sizes._16sdp, color: ArrayColors._color_black}}>
              Bạn chưa nhận được mã OTP ?{' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: sizes._16sdp,
          }}>
          <TouchableOpacity onPress={handleSkip} style={{alignItems: 'center'}}>
            <View style={styles.mContainerBtnSkip}>
              <Text style={styles.mTextSkip}>Bỏ qua</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={{alignItems: 'center'}}>
            <View style={styles.mContainerBtn}>
              <Text style={styles.mText}>Xác thực</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.mContainer}>
        <AppHeader
          content
          customContent={
            <HeaderShown
              titleScreen="XÁC THỰC TÀI KHOẢN"
              onBackPress={onBackPress}
            />
          }></AppHeader>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="Screen_VeryOTP"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        />
        {isLoading ? <Loading /> : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenVeryOTP;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },

  mContainerBtnSkip: {
    width: sizes._screen_width / 2 - sizes._40sdp,
    height: sizes._58sdp,
    borderWidth: sizes._1sdp,
    marginVertical: sizes._32sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ArrayColors._color_black,
    backgroundColor: ArrayColors._color_white,
  },

  mContainerBtn: {
    width: sizes._screen_width / 2 - sizes._40sdp,
    height: sizes._58sdp,
    borderWidth: sizes._1sdp,
    marginVertical: sizes._32sdp,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ArrayColors._color_black,
    backgroundColor: ArrayColors._color_black,
  },
  mTextSkip: {
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
  },
  mText: {
    color: ArrayColors._color_white,
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
  },
});
