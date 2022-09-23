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
import Input from '../../../components/accounts/Input';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import Images from '../../../res/require/Images';
import AppHeader from '../../../components/header/AppHeader';
import HeaderShown from '../../../components/accounts/HeaderShown';
import Loading from '../../../components/modal/Loading';
import {NameScreen} from '../../navigators/TabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {GenerateOTP} from '../../../utils/api/GenerateOTP';
import axios from 'axios';

type Props = {};

const ScreenVeryOTP = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const [visibleIconOTP, setVisibleIconOTP] = React.useState<string | any>(
    false,
  );
  const [numberOTP, setNumberOTP] = React.useState<string | any>('');
  const [warningOTP, setWarningOTP] = React.useState<string | any>(false);

  const isAndroid = Platform.OS === 'android';
  const accounts = useSelector((state: any) => state.account);

  const [userEmail, setUserEmail] = React.useState<string | any>(null);
  const [userID, setUserID] = React.useState<string | any>(null);

  const [seconds, setSeconds] = React.useState<string | any>(0);

  const [event, setEvent] = React.useState<string | any>(true);
  const [eventCheck, setEventCheck] = React.useState<string | any>(false);

  const [lableOTPreq, setLableOTPreq] = React.useState<string | any>(
    'Bạn chưa nhận được mã OTP?',
  );
  React.useEffect(() => {
    if (accounts.isAuthenticated === true) {
      setUserEmail(accounts.result[0].email);
      setUserID(accounts.result[0]._id);
    }
  }, [accounts.isAuthenticated]);

  //console.log(userEmail);
  //console.log(userID);

  function onBackPress() {
    navigation.goBack();
  }
  function handleConfirm() {
    if (numberOTP == '') {
      setWarningOTP(true);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        GenerateOTPS(userEmail, numberOTP, userID);
      }, 1500);
    }
  }
  function eventGenerateOTP() {
    setEvent(false);
    setEventCheck(true);
    //console.log('req');
    if (seconds <= 0) {
      setSeconds(90);
      GenerateOTP(userEmail, userID);
      //console.log(userEmail, userID);
    }
  }
  function eventReqOTP() {
    //console.log('req');
    //console.log('req');
    if (seconds <= 0) {
      setSeconds(90);
      GenerateOTP(userEmail, userID);
      //console.log(userEmail, userID);
    }
  }
  function eventEditOTP(text: string | any) {
    setNumberOTP(text);
    setVisibleIconOTP(true);
    setWarningOTP(false);
  }
  function eventClearOTP() {
    setNumberOTP('');
    setVisibleIconOTP(false);
    setWarningOTP(false);
  }

  React.useLayoutEffect(() => {
    //console.log('ok');

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

  //console.log(seconds);

  async function GenerateOTPS(userEmail: any, userOTP: any, userID: any) {
    const mFormData = JSON.stringify({
      userEmail,
      userOTP,
      userID,
    });
    //console.log(mFormData);

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
        //console.log(JSON.stringify(response.data));
        if (response.data.code === 200) {
          ToastAndroid.show(
            'Xác thực tài khoản thành công',
            ToastAndroid.SHORT,
          );
          onBackPress();
          setIsLoading(false);
        }
      })
      .catch(error => {
        //console.log(JSON.stringify(error.response.data));
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
            fontSize: sizes._20sdp,
            color: ArrayColors._color_black,
            fontWeight: 'bold',
            lineHeight: sizes._22sdp,
            marginHorizontal: sizes._3sdp,
          }}>
          Bằng cách{' '}
          <Text
            onPress={event ? eventGenerateOTP : () => {}}
            style={{
              fontWeight: 'bold',
              color: ArrayColors._color_blue_medium,
              fontStyle: 'italic',
            }}>
            nhấp vào đây
          </Text>{' '}
          một mã OTP sẽ được gửi đến địa chỉ gmail của bạn.
        </Text>
        <Input
          value={numberOTP}
          onPress_1={eventClearOTP}
          titleInPut="Mã xác thực"
          placeholder="Enter OTP"
          nameImg_1={Images.ic_mark_cut}
          onChangeText={text => eventEditOTP(text)}
          setIconViewEmail={visibleIconOTP}
          keyboardType="numeric"
        />
        {warningOTP && (
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
            }}>
            Không được bỏ trống
          </Text>
        )}

        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: sizes._24sdp,
            marginHorizontal: sizes._6sdp,
          }}>
          <Text
            onPress={eventCheck ? eventReqOTP : () => {}}
            style={{
              fontSize: sizes._18sdp,
              color: ArrayColors._color_black,
              fontWeight: 'bold',
            }}>
            {lableOTPreq}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: sizes._16sdp,
        }}>
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
