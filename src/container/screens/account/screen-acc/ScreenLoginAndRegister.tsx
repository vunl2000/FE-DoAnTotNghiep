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
import IconHeader from '../../../../components/icons/IconHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import AnimatedTab from '../../../../components/accounts/AnimatedTab';
import Input from '../../../../components/accounts/Input';
import Button from '../../../../components/accounts/Button';
import TitleHome from '../../../../components/title/TitleHome';
import {userLogins} from '../../../../store/actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import TextForgotPassword from '../../../../components/accounts/TextForgotPassword';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import {checkMail} from '../../../../utils/Utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../../components/modal/Loading';
type Props = {};

const ScreenLoginAndRegister = ({navigation}: {navigation: any}) => {
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

  const [labelEmail, setLabelEmail] = React.useState<string | any>('');
  const [labelPassWord, setLabelPassword] = React.useState<string | any>('');

  function onPressLeft() {
    Animated.timing(animatedValues, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginRight(animatedValues);
    setInvisible(true);
    console.log('right', animatedValues);
    console.log('right', marginRight);
  }

  function onPressRight() {
    Animated.timing(animatedValues, {
      toValue: sizes._screen_width / 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginLeft(animatedValues);
    setInvisible(false);
    console.log('left', animatedValues);
    console.log('left---', marginLeft);
  }

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

  const dispatch: string | any = useDispatch();

  const accounts = useSelector((state: any) => state.account);
  const error = useSelector((state: any) => state.err);

  console.log(error);

  React.useEffect(() => {
    const {isAuthenticated, token} = accounts;

    try {
      if (accounts) {
        accounts.result.filter((result: any) => {
          const idSet: string | any = result._id;
          const nameSet: string | any = result.name;
          const photoUrlSet: string | any = result.photoUrl;
          const phoneSet: string | any = result.phone;
          const emailSet: string | any = result.email;
          const authenticationSet: string | any = result.authentication;

          setDataAccount(
            token,
            idSet,
            nameSet,
            photoUrlSet,
            phoneSet,
            emailSet,
            authenticationSet,
          );
        });
      }
    } catch (e) {
      console.log(e);
    }

    if (isAuthenticated) {
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      navigation.goBack();
      console.log(accounts);
    }
  }, [accounts]);

  React.useEffect(() => {
    try {
      const errorCode = error.code.code;
      switch (errorCode) {
        case 400: {
          ToastAndroid.show(
            'Đăng nhập thất bại vui lòng kiểm tra lại mật khẩu',
            ToastAndroid.SHORT,
          );
          break;
        }
        default:
          console.log('Error');
      }
    } catch {
      console.log('Đã có lỗi xảy ra');
    }
  }, [error]);

  async function setDataAccount(
    token: string | any,
    idUser: string | any,
    userName: string | any,
    photoUrl: string | any,
    phone: string | any,
    email: string | any,
    authentication: string | any,
  ) {
    if (token && userName) {
      try {
        await AsyncStorage.removeItem('@user_token');
        const mData: any = {
          tokenSet: token,
          idSet: idUser,
          userNameSet: userName,
          photoUrlSet: photoUrl,
          phoneSet: phone,
          emailSet: email,
          authenticationSet: authentication,
        };
        await AsyncStorage.setItem('@user_token', JSON.stringify(mData));
      } catch (e) {
        console.log(e);
      }
    }
  }
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
      dispatch(userLogins({email, password}));

      console.log({email, password});
    }
  }

  ///Lấy token screens nào cần đến token thì coppy hàm này vào và móc nó ra
  //import AsyncStorage from '@react-native-async-storage/async-storage';

  // React.useEffect(() => {
  //   getData('@user_token')
  //     .then(data => data)
  //     .then(value => {
  //       console.log('yourKey Value:  ' + value);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  // const getData = async (key: any) => {
  //   // get Data from Storage
  //   try {
  //     const data = await AsyncStorage.getItem(key);
  //     if (data !== null) {
  //       console.log(data);
  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader
        content
        customContent={<HeaderShown navigation={navigation} />}></AppHeader>
      <View style={{marginTop: sizes._32sdp}}>
        <AnimatedTab
          animatedValues={animatedValues}
          marginLeft={marginLeft}
          marginRight={marginRight}
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          textLeft="Đăng nhập"
          textRight="Đăng ký"
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
        />
      </View>
      {invisible ? (
        <View
          style={{
            marginHorizontal: sizes._20sdp,
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
          <TextForgotPassword />
        </View>
      ) : (
        <ScrollView style={{}}>
          <Input
            placeholder="Enter your email"
            onChangeText={text => setEmail(email)}
          />
        </ScrollView>
      )}
      <Button onPress={handleLogin} title="Đăng nhập"></Button>

      <GoogleOrFacebook />
      <Policy />

      {accounts.regLoading ? <Loading /> : null}
    </SafeAreaView>
  );
};

export default ScreenLoginAndRegister;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
