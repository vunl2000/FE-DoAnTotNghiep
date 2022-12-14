import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useRef} from 'react';
import ArrayColors from '../../../../res/colors/ArrayColors';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import Input from '../../../../components/accounts/Input';
import Button from '../../../../components/accounts/Button';
import {userLogins} from '../../../../store/actions/loginActions';
import {clearErrors} from '../../../../store/actions/errActions';

import {useDispatch, useSelector} from 'react-redux';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import TextForgotPassword from '../../../../components/accounts/TextForgotPassword';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import {checkMail} from '../../../../utils/Utilities';

import Loading from '../../../../components/modal/Loading';
type Props = {};

const ScreenLogin = ({navigation}: {navigation: any}) => {
  const isAndroid = Platform.OS === 'android';
  const [marginLeft, setMarginLeft] = React.useState(0);
  const [marginRight, setMarginRight] = React.useState(0);

  const [email, setEmail] = React.useState<string | any>('');
  const [password, setPassword] = React.useState<string | any>('');

  const [viewEye, setViewEye] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(true);

  const [visibleIconEmail, setVisibleIconEmail] = React.useState(false);
  const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);

  const [invisible, setInvisible] = React.useState(true);
  const animatedValues: any = React.useRef(new Animated.Value(0)).current;

  const [warningEmail, setWarningEmail] = React.useState<string | any>(false);
  const [warningPassWord, setWarningPassword] = React.useState<string | any>(
    false,
  );

  const dispatch: string | any = useDispatch();

  const accounts = useSelector((state: any) => state.account);
  const error = useSelector((state: any) => state.err);

  const [labelEmail, setLabelEmail] = React.useState<string | any>('');
  const [labelPassWord, setLabelPassword] = React.useState<string | any>('');

  // const [isLoading, setIsLoading] = React.useState<string | any>(false);

  function eventOnOff() {
    setViewEye(!viewEye);
    setShowPassword(!showPassword);
  }

  function eventEditPassword(text: string | any) {
    setPassword(text);
    if (text != null) {
      console.log('text != null');
      setVisibleIconPassword(true);
      setWarningPassword(false);
      setLabelPassword(null);
    } else {
      console.log('text == null');
      setVisibleIconPassword(false);
    }
  }

  function clearTextPassword() {
    setPassword('');
    setVisibleIconPassword(false);
  }

  //InputEmail
  function eventEditEmail(text: string | any) {
    setEmail(text);
    if (text != null) {
      console.log('text != null');
      setVisibleIconEmail(true);
      setWarningEmail(false);
      setLabelEmail(null);
    } else {
      console.log('text == null');
      setVisibleIconEmail(false);
    }
  }
  function clearTextEmail() {
    setEmail('');
    setVisibleIconEmail(false);
  }

  console.log(error);

  React.useEffect(() => {
    const {isAuthenticated, token} = accounts;

    if (isAuthenticated) {
      setTimeout(() => {
        // setIsLoading(false);
        navigation.goBack();
        ToastAndroid.show('????ng nh???p th??nh c??ng', ToastAndroid.SHORT);
        console.log(accounts);
      }, 1500);
    }

    // return () => {
    //   setIsLoading(null);
    // };
  }, [accounts]);

  React.useEffect(() => {
    try {
      const errorCode = error.code.code;
      switch (errorCode) {
        case 400: {
          // setIsLoading(false);
          ToastAndroid.show(
            '????ng nh???p th???t b???i vui l??ng ki???m tra l???i th??ng tin',
            ToastAndroid.SHORT,
          );
          break;
        }
        default:
          console.log('Error');
      }
    } catch {
      console.log('???? c?? l???i x???y ra');
    }
  }, [error]);

  function handleLogin() {
    if (email === '') {
      setWarningEmail(true);
      setLabelEmail('Vui l??ng kh??ng b??? tr???ng');
      console.log('ovl');
    } else if (password === '') {
      setWarningPassword(true);
      setLabelPassword('Vui l??ng kh??ng b??? tr???ng');
    } else if (!checkMail(email)) {
      setLabelEmail('Vui l??ng nh???p ????ng ?????nh d???ng');
      setWarningEmail(true);
    } else {
      dispatch(userLogins({email, password}));
      // setIsLoading(true);
      console.log({email, password});
    }
  }
  function eventRegister() {
    dispatch(clearErrors());
    navigation.navigate('ScreenRegister');
    //navigation.navigate('ScreenVeryfiOTP');
  }

  function onBackPress() {
    dispatch(clearErrors());
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader
        content
        customContent={
          <HeaderShown titleScreen="????NG NH???P" onBackPress={onBackPress} />
        }></AppHeader>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: sizes._36sdp,
          marginHorizontal: sizes._20sdp,
        }}>
        <Text style={{fontSize: sizes._24sdp, textAlign: 'center'}}>
          Ch??o m???ng b???n ?????n v???i ???ng d???ng mua s???m tr???c tuy???n
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: sizes._20sdp,
          marginTop: sizes._20sdp,
          width: sizes._screen_width - sizes._40sdp,
        }}>
        <Input
          value={email}
          onPress_1={clearTextEmail}
          titleInPut="Email"
          placeholder="?????a ch??? email"
          nameImg_1={Images.ic_mark_cut}
          onChangeText={text => eventEditEmail(text)}
          setIconViewEmail={visibleIconEmail}
        />
        {warningEmail && (
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
            }}>
            {labelEmail}
          </Text>
        )}
        <Input
          value={password}
          onPress_1={clearTextPassword}
          onPress_2={eventOnOff}
          titleInPut="M???t kh???u"
          placeholder="M???t kh???u"
          nameImg_1={Images.ic_mark_cut}
          nameImg_2={Images.ic_eye_off}
          nameImg_3={Images.ic_eys_on}
          setIconView={viewEye}
          onChangeText={text => eventEditPassword(text)}
          secureTextEntry={showPassword}
          setIconViewEmail={visibleIconPassword}
          setIconViewPassword={visibleIconPassword}
        />
        {warningPassWord && (
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
            }}>
            {labelPassWord}
          </Text>
        )}
        <TextForgotPassword />
        <Button onPress={handleLogin} title="????ng nh???p"></Button>
        <GoogleOrFacebook />
        <Policy />
      </View>
      <TouchableOpacity
        onPress={eventRegister}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: sizes._24sdp,
        }}>
        <Text
          style={{
            color: ArrayColors._color_facebook,
            fontWeight: 'bold',
            fontSize: sizes._18sdp,
          }}>
          B???n ch??a c?? t??i kho???n ?
        </Text>
      </TouchableOpacity>
      {/* {isLoading ? <Loading /> : null} */}
    </SafeAreaView>
  );
};

export default ScreenLogin;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
