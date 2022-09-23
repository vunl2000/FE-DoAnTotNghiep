import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Input from '../../../components/accounts/Input';
import image from '../../../res/require/Images';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Button from '../../../components/accounts/Button';
import Loading from '../../../components/modal/Loading';
import {checkMail, isNullEmptyBlank} from '../../../utils/Utilities';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../../store/actions/loginActions';
import {clearInvoice} from '../../../store/actions/invoiceActions';
import {clearAllCart} from '../../../store/actions/productsActions';
import {clearAddress} from '../../../store/actions/addressActions';
import {clearErrors} from '../../../store/actions/errActions';

type Props = {};

const ScreenChangePass = ({navigation}: any) => {
  const [password, setPassword] = React.useState<string | any>('');
  const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<string | any>(false);

  const [viewEye, setViewEye] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(true);

  const [passwordold, setPasswordold] = React.useState<string | any>('');
  const [visibleIconPasswordold, setVisibleIconPasswordold] =
    React.useState(false);

  const [viewEyeold, setViewEyeold] = React.useState(true);
  const [showPasswordold, setShowPasswordold] = React.useState(true);

  const [warningPassWordold, setWarningPasswordold] = React.useState<
    string | any
  >(false);
  const [labelPassWordold, setLabelPasswordold] = React.useState<string | any>(
    '',
  );

  const [warningPassWordNew, setWarningPasswordNew] = React.useState<
    string | any
  >(false);

  const [labelPassWordNew, setLabelPasswordNew] = React.useState<string | any>(
    '',
  );

  const [warningPassWord, setWarningPassword] = React.useState<string | any>(
    false,
  );

  const [labelPassWord, setLabelPassword] = React.useState<string | any>('');

  const [passwordnew, setPasswordnew] = React.useState<string | any>('');
  const [visibleIconPasswordnew, setVisibleIconPasswordnew] =
    React.useState(false);

  const [viewEyenew, setViewEyenew] = React.useState(true);
  const [showPasswordnew, setShowPasswordnew] = React.useState(true);

  const accounts = useSelector((state: any) => state.account);
  const [userID, setUserID] = React.useState<any>(null);

  const dispatch: string | any = useDispatch();

  // const [warningPassWordnew, setWarningPasswordnew] = React.useState<
  //   string | any
  // >(false);
  // const [labelPassWordnew, setLabelPasswordnew] = React.useState<string | any>(
  //   '',
  // );

  React.useEffect(() => {
    if (accounts.isAuthenticated === true) {
      setUserID(accounts.result[0]._id);
    }
  }, [accounts.isAuthenticated]);

  function eventEditPasswordold(text: string | any) {
    setPasswordold(text);
    if (text != null) {
      //console.log('text != null');
      setVisibleIconPasswordold(true);
      setWarningPasswordold(false);
      setLabelPasswordold(null);
    } else {
      //console.log('text == null');
      setVisibleIconPasswordold(false);
    }
  }
  function clearTextPasswordold() {
    setPasswordold('');
    setVisibleIconPasswordold(false);
  }
  function eventOnOffold() {
    setViewEyeold(!viewEye);
    setShowPasswordold(!showPasswordold);
  }

  function eventEditPassword(text: string | any) {
    setPassword(text);
    if (text != null) {
      //console.log('text != null');
      setVisibleIconPassword(true);
      setWarningPassword(false);
      setLabelPassword(null);
    } else {
      //console.log('text == null');
      setVisibleIconPassword(false);
    }
  }
  function clearTextPassword() {
    setPassword('');
    setVisibleIconPassword(false);
  }
  function eventOnOff() {
    setViewEye(!viewEye);
    setShowPassword(!showPassword);
  }

  function eventEditPasswordnew(text: string | any) {
    setPasswordnew(text);
    if (text != null) {
      //console.log('text != null');
      setVisibleIconPasswordnew(true);
      setWarningPasswordNew(false);
      setLabelPasswordNew(null);
    } else {
      //console.log('text == null');
      setVisibleIconPasswordnew(false);
    }
  }
  function clearTextPasswordnew() {
    setPasswordnew('');
    setVisibleIconPasswordnew(false);
  }
  function eventOnOffnew() {
    setViewEyenew(!viewEye);
    setShowPasswordnew(!showPasswordnew);
  }

  function HeaderContent() {
    return (
      <View style={styles.containerHeader}>
        <IconHeader
          name="chevron-back"
          sizes={sizes._24sdp}
          color={ArrayColors._color_black}
          style={styles.iconHeader}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contentHeader}>
          <Text style={styles.textLabel}>Đổi mật khẩu</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  function eventConfirm() {
    if (passwordold === '' || passwordnew === '' || password === '') {
      setLabelPasswordold('Không được bỏ trống');
      setWarningPasswordold(true);
      setLabelPasswordNew('Không được bỏ trống');
      setWarningPasswordNew(true);
      setLabelPassword('Không được bỏ trống');
      setWarningPassword(true);
    } else if (passwordold === '') {
      setLabelPasswordold('Không được bỏ trống');
      setWarningPasswordold(true);
    } else if (passwordnew === '') {
      setLabelPasswordNew('Không được bỏ trống');
      setWarningPasswordNew(true);
    } else if (password === '') {
      setLabelPassword('Không được bỏ trống');
      setWarningPassword(true);
    } else if (passwordnew.length < 6) {
      setLabelPasswordNew('Mật khẩu phải lớn hơn 6 ký tự');
      setWarningPasswordNew(true);
    } else if (isNullEmptyBlank(passwordold)) {
      setLabelPasswordold('Mật khẩu không không được chứa khoảng cách');
      setWarningPasswordold(true);
    } else if (isNullEmptyBlank(passwordnew)) {
      setLabelPasswordNew('Mật khẩu không không được chứa khoảng cách');
      setWarningPasswordNew(true);
    } else if (isNullEmptyBlank(password)) {
      setLabelPassword('Mật khẩu không không được chứa khoảng cách');
      setWarningPassword(true);
    } else if (passwordnew !== password) {
      setLabelPassword('Xác thực mật khẩu không đúng');
      setWarningPassword(true);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        mChangePass(userID, passwordold, passwordnew, password);
      }, 1500);
    }
  }
  function mChangePass(
    idUser: any,
    password: any,
    passwordNew: any,
    passwordNewConfirm: any,
  ) {
    var data = JSON.stringify({
      idUser,
      password,
      passwordNew,
      passwordNewConfirm,
    });

    var config = {
      method: 'post',
      url: 'http://18.141.199.110:3000/account-user/refresh-password-user',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.data.code === 200) {
          setIsLoading(false);
          ToastAndroid.show('Thay đổi mật khẩu thành công', ToastAndroid.SHORT);
          setTimeout(() => {
            dispatch(logOut());
            dispatch(clearErrors());
            dispatch(clearInvoice());
            dispatch(clearAllCart());
            dispatch(clearAddress());
            navigation.navigate('ScreenLogin');
            ToastAndroid.show('Đăng nhập để tiếp tục', ToastAndroid.SHORT);
          }, 3000);
        } else {
          setIsLoading(false);
          ToastAndroid.show(
            'Đã có lỗi trong quá trình xử lý',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(function (error) {
        //console.log(error.response.data);
        if (error.response.data.code === 413) {
          setIsLoading(false);
          ToastAndroid.show('Mật khẩu cũ không hợp lệ', ToastAndroid.SHORT);
        } else if (error.response.data.code === 414) {
          setIsLoading(false);
          ToastAndroid.show('Mật khẩu không khớp', ToastAndroid.SHORT);
        } else {
          setIsLoading(false);
          ToastAndroid.show(
            'Đã có lỗi trong quá trình xử lý',
            ToastAndroid.SHORT,
          );
        }
      });
    return setIsLoading(false);
  }

  const RenderView = (
    <View
      style={{
        marginHorizontal: sizes._20sdp,
        marginTop: sizes._20sdp,
        width: sizes._screen_width - sizes._40sdp,
      }}>
      <Input
        value={passwordold}
        onPress_1={clearTextPasswordold}
        onPress_2={eventOnOffold}
        titleInPut="Mật khẩu cũ"
        placeholder="Enter mật khẩu cũ"
        nameImg_1={image.ic_mark_cut}
        nameImg_2={image.ic_eye_off}
        nameImg_3={image.ic_eys_on}
        setIconView={viewEyeold}
        onChangeText={text => eventEditPasswordold(text)}
        secureTextEntry={showPasswordold}
        setIconViewEmail={visibleIconPasswordold}
        setIconViewPassword={visibleIconPasswordold}
      />
      {warningPassWordold && (
        <Text
          style={{
            fontSize: sizes._16sdp,
            color: ArrayColors._color_red,
            fontWeight: 'bold',
          }}>
          {labelPassWordold}
        </Text>
      )}

      <Input
        value={passwordnew}
        onPress_1={clearTextPasswordnew}
        onPress_2={eventOnOffnew}
        titleInPut="Mật khẩu"
        placeholder="Enter mật khẩu mới"
        nameImg_1={image.ic_mark_cut}
        nameImg_2={image.ic_eye_off}
        nameImg_3={image.ic_eys_on}
        setIconView={viewEyenew}
        onChangeText={text => eventEditPasswordnew(text)}
        secureTextEntry={showPasswordnew}
        setIconViewEmail={visibleIconPasswordnew}
        setIconViewPassword={visibleIconPasswordnew}
      />
      {warningPassWordNew && (
        <Text
          style={{
            fontSize: sizes._16sdp,
            color: ArrayColors._color_red,
            fontWeight: 'bold',
          }}>
          {labelPassWordNew}
        </Text>
      )}

      <Input
        value={password}
        onPress_1={clearTextPassword}
        onPress_2={eventOnOff}
        titleInPut="Xác nhận mật khẩu"
        placeholder="Enter mật khẩu xác nhận"
        nameImg_1={image.ic_mark_cut}
        nameImg_2={image.ic_eye_off}
        nameImg_3={image.ic_eys_on}
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

      <Button title="Xác nhận" onPress={eventConfirm} />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.mContainer}>
        <AppHeader content customContent={<HeaderContent />} />
        <View style={styles.mContainerBody}>
          <FlatList
            data={null}
            renderItem={null}
            ListFooterComponent={RenderView}
            listKey="Screen_ChangePass"
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
          />
        </View>
        {isLoading ? <Loading /> : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenChangePass;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContainerBody: {
    backgroundColor: ArrayColors._color_white,
  },
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._24sdp,
    fontWeight: 'bold',
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
