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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useRef } from 'react';
import ArrayColors from '../../../../res/colors/ArrayColors';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import Input from '../../../../components/accounts/Input';
import Button from '../../../../components/accounts/Button';
import { userLogins } from '../../../../store/actions/loginActions';
import { clearErrors } from '../../../../store/actions/errActions';
import ModalConfirmPasswordChange from '../../../../components/modal/ModalConfirmPasswordChange'
import { useDispatch, useSelector } from 'react-redux';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import TextForgotPassword from '../../../../components/accounts/TextForgotPassword';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import { checkMail } from '../../../../utils/Utilities';

import Loading from '../../../../components/modal/Loading';
import axios from 'axios';
import { API_URL, GET_HEART } from '@env';
import { changeHeart } from '../../../../store/actions/productsActions';
type Props = {};

const ScreenLogin = ({ navigation }: { navigation: any }) => {
  const isAndroid = Platform.OS === 'android';

  const [email, setEmail] = React.useState<string | any>('');
  const [password, setPassword] = React.useState<string | any>('');

  const [viewEye, setViewEye] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(true);

  const [visibleIconEmail, setVisibleIconEmail] = React.useState(false);
  const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);

  // const [invisible, setInvisible] = React.useState(false);
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

  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const [showCheg, setShowCheg] = React.useState<any | boolean>(false);

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

  const getAllHeart = async (idUser: any, token: any) => {
    let data = JSON.stringify({
      idUser: idUser,
    });
    await axios({
      method: 'POST',
      url: API_URL + GET_HEART,
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let data = res.data;
        let getData: any = data.results;
        getData.forEach((val: any) => {
          let idProduct = val.heart.idProduct;
          dispatch(changeHeart(idProduct));
          console.log('change ' + idProduct);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const { isAuthenticated, token } = accounts;

    if (isAuthenticated) {
      setTimeout(() => {
        if (accounts.code === 200) {
          setIsLoading(false);
          navigation.goBack();
          ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
          console.log(accounts);
          dispatch(clearErrors());
          getAllHeart(accounts.result[0]._id, `Bearer ${token}`);
        }

        // setInvisible(false);
      }, 1500);
    }
  }, [accounts]);

  React.useEffect(() => {
    try {
      const errorCode = error.code.code;
      switch (errorCode) {
        case 400: {
          setIsLoading(false);
          ToastAndroid.show(
            'Đăng nhập thất bại vui lòng thử lại sau',
            ToastAndroid.SHORT,
          );
          // dispatch(clearErrors());
          break;
        }
        case 401: {
          setIsLoading(false);
          ToastAndroid.show(
            'Thông tin nhập vào không được để trống',
            ToastAndroid.SHORT,
          );
          // dispatch(clearErrors());
          break;
        }
        case 402: {
          setIsLoading(false);
          ToastAndroid.show('Người dùng không tồn tại', ToastAndroid.SHORT);
          // dispatch(clearErrors());
          break;
        }
        case 403: {
          setIsLoading(false);
          ToastAndroid.show('Mật khẩu không chính xác', ToastAndroid.SHORT);
          // dispatch(clearErrors());
          break;
        }
        default:
          setIsLoading(false);
          console.log('Error');
      }
      // setInvisible(false);
    } catch {
      setIsLoading(false);
      console.log('Error');
    }
    // return(()=>{
    //   setInvisible(false);
    // })
  }, [error]);

  function handleLogin() {
    if (email === '') {
      setWarningEmail(true);
      setLabelEmail('Vui lòng không bỏ trống');
      console.log('ovl');
    } else if (password === '') {
      setWarningPassword(true);
      setLabelPassword('Vui lòng không bỏ trống');
    } else if (!checkMail(email)) {
      setLabelEmail('Vui lòng nhập đúng định dạng');
      setWarningEmail(true);
    } else {
      setIsLoading(true);
      dispatch(userLogins({ email, password }));
      setIsLoading(true);
      console.log({ email, password });
    }
  }
  function eventRegister() {
    dispatch(clearErrors());
    navigation.navigate('ScreenRegister');
  }

  function onBackPress() {
    dispatch(clearErrors());
    navigation.goBack();
  }
  function eventForgotPassword() {

    setShowCheg(true);


    //  navigation.navigate('ScreenForgotPassword');
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.mContainer}>
          <AppHeader
            content
            customContent={
              <HeaderShown titleScreen="ĐĂNG NHẬP" onBackPress={onBackPress} />
            }></AppHeader>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: sizes._36sdp,
              marginHorizontal: sizes._20sdp,
            }}>
            <Text style={{ fontSize: sizes._24sdp, textAlign: 'center' }}>
              Chào mừng bạn đến với ứng dụng mua sắm trực tuyển
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
              placeholder="Địa chỉ email"
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
              titleInPut="Mật khẩu"
              placeholder="Mật khẩu"
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
            <TextForgotPassword onPress={eventForgotPassword} />
            <Button onPress={handleLogin} title="Đăng nhập"></Button>
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
              Bạn chưa có tài khoản ?
            </Text>
          </TouchableOpacity>
          {isLoading ? <Loading /> : null}
          <ModalConfirmPasswordChange visible={showCheg} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {/* <Loading visible={invisible} /> */}
    </>
  );
};

export default ScreenLogin;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
