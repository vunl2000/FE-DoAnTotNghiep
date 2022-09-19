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
  ToastAndroid,
} from 'react-native';
import React from 'react';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import ArrayColors from '../../../../res/colors/ArrayColors';
import Loading from '../../../../components/modal/Loading';
import Button from '../../../../components/accounts/Button';
import Input from '../../../../components/accounts/Input';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import {useDispatch, useSelector} from 'react-redux';
import {removerRegister} from '../../../../store/actions/registerActions';
// import { verifyOTP } from '../../../../utils/api/VeryfiOTP';
import {GenerateOTP} from '../../../../utils/api/GenerateOTP';
import axios from 'axios';

type Props = {};

const ScreenVeryfiOTP = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const isAndroid = Platform.OS === 'android';
  const dispatch: string | any = useDispatch();
  const register = useSelector((state: any) => state.register);
  const [event, setEvent] = React.useState<string | any>(true);
  const [eventCheck, setEventCheck] = React.useState<string | any>(false);

  console.log(event);

  const [userEmail, setUserEmail] = React.useState<string | any>(
    register.result.email,
  );
  const [userID, setUserID] = React.useState<string | any>(register.result._id);
  const [userOTP, setUserOTP] = React.useState<string | any>('');

  const [visibleIconOTP, setVisibleIconOTP] = React.useState<string | any>(
    false,
  );

  const [lableOTP, setLableOTP] = React.useState<string | any>('');
  const [isWarning, setIsWarning] = React.useState<string | any>(false);
  const [seconds, setSeconds] = React.useState<string | any>(0);

  const [lableOTPreq, setLableOTPreq] = React.useState<string | any>(
    'Bạn chưa nhận được mã OTP?',
  );

  function onBackPress() {
    navigation.goBack();
    dispatch(removerRegister());
  }
  function eventLogin() {
    dispatch(removerRegister());
    navigation.navigate('ScreenLogin');
  }
  function handleSkip() {
    dispatch(removerRegister());
    navigation.navigate('ScreenLogin');
  }
  function handleConfirm() {
    if (userOTP === '') {
      setIsWarning(true);
      setLableOTP('Không được bỏ trống');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        GenerateOTPS(userEmail, userOTP, userID);
      }, 1500);
    }
  }

  async function GenerateOTPS(userEmail: any, userOTP: any, userID: any) {
    const mFormData = JSON.stringify({
      userEmail,
      userOTP,
      userID,
    });
    console.log(mFormData);

    const config = await {
      method: 'POST',
      // url: API_URL_GENERATE_OTP,
      url: 'http://18.141.199.110:3000/account-user/verify-otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: mFormData,
    };

    await axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.code === 200) {
          ToastAndroid.show(
            'Xác thực tài khoản thành công',
            ToastAndroid.SHORT,
          );
          navigation.navigate('ScreenLogin');
          dispatch(removerRegister());
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error.response.data));
        if (error.response.data.code === 400) {
          ToastAndroid.show('Mã xác thực không chính xác', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Đã có lỗi trong quá trình xử lý',
            ToastAndroid.SHORT,
          );
        }
        setIsLoading(false);
      });
    return setIsLoading(false);
  }

  function eventEditOTP(text: string | any) {
    if (text !== '') {
      setUserOTP(text);
      setVisibleIconOTP(true);
      setIsWarning(false);
      setLableOTP(null);
    }
  }
  function eventReqOTP() {
    console.log('req');
    if (seconds <= 0) {
      setSeconds(90);
      GenerateOTP(userEmail, userID);
      console.log(userEmail, userID);
    }
  }
  function clearTextOTP() {
    if (userOTP !== '') {
      setUserOTP('');
      setVisibleIconOTP(false);
    }
  }
  function eventGenerateOTP() {
    console.log('rqOTP');
    setEvent(false);
    setEventCheck(true);
    if (seconds <= 0) {
      setSeconds(90);
      GenerateOTP(userEmail, userID);
    } else {
    }
  }

  React.useLayoutEffect(() => {
    console.log('ok');

    const timerId = setInterval(() => {
      if (seconds === 0) {
        clearInterval(timerId);
        setLableOTPreq('Bạn chưa nhận được mã OTP?');
      } else {
        setSeconds(seconds - 1);
        setLableOTPreq(`Gửi lại mã OTP sau ${seconds}`);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [seconds]);

  console.log(seconds);

  const renderContent = (
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
            fontWeight: 'normal',
            lineHeight: sizes._22sdp,
          }}>
          Một mã OTP sẽ được gửi đến email{' '}
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_blue_light_light,
              fontWeight: 'bold',
              lineHeight: sizes._22sdp,
            }}>
            {userEmail}
          </Text>{' '}
          vui lòng kiểm tra email.
          <Text
            onPress={event ? eventGenerateOTP : () => {}}
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
              lineHeight: sizes._22sdp,
            }}>
            {' '}
            Nhận mã OTP ?
          </Text>
        </Text>

        <Input
          value={userOTP}
          onPress_1={clearTextOTP}
          titleInPut="Mã xác thực"
          placeholder="Enter OTP"
          nameImg_1={Images.ic_mark_cut}
          onChangeText={text => eventEditOTP(text)}
          setIconViewEmail={visibleIconOTP}
          keyboardType="numeric"
        />
        {isWarning && (
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
              lineHeight: sizes._22sdp,
            }}>
            {lableOTP}
          </Text>
        )}
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: sizes._24sdp,
          }}>
          <Text
            onPress={eventCheck ? eventReqOTP : () => {}}
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
              lineHeight: sizes._22sdp,
            }}>
            {lableOTPreq}
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

      <GoogleOrFacebook />
      <Policy />
      <TouchableOpacity
        onPress={eventLogin}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: sizes._24sdp,
        }}>
        <Text
          style={{
            color: ArrayColors._color_facebook,
            fontWeight: 'bold',
            fontSize: sizes._15sdp,
          }}>
          Bạn đã có tài khoản ?
        </Text>
      </TouchableOpacity>
    </>
  );

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
          listKey="Screen_VeryfiOTP"
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

export default ScreenVeryfiOTP;

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
