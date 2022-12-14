import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import ArrayColors from '../../../../res/colors/ArrayColors';
import Loading from '../../../../components/modal/Loading';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import Button from '../../../../components/accounts/Button';
import Input from '../../../../components/accounts/Input';
import {checkMail, isNullEmptyBlank} from '../../../../utils/Utilities';

type Props = {};

const ScreenRegister = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const [email, setEmail] = React.useState<string | any>('');
  const [password, setPassword] = React.useState<string | any>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string | any>(
    '',
  );
  const [visibleIconEmail, setVisibleIconEmail] = React.useState(false);

  const [viewEye, setViewEye] = React.useState(true);
  const [viewEyeConfirm, setViewEyeConfirm] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(true);
  const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);
  const [visibleIconPasswordConfirm, setVisibleIconPasswordConfirm] =
    React.useState(false);

  const [warningEmail, setWarningEmail] = React.useState<string | any>(false);
  const [warningPassWord, setWarningPassword] = React.useState<string | any>(
    false,
  );
  const [warningPassWordConfirm, setWarningPassWordConfirm] = React.useState<
    string | any
  >(false);
  const [labelEmail, setLabelEmail] = React.useState<string | any>('');
  const [labelPassWord, setLabelPassword] = React.useState<string | any>('');

  const [labelPassWordConfirm, setLabelPasswordConfirm] = React.useState<
    string | any
  >('');

  function onBackPress() {
    navigation.goBack();
  }
  function handleNext() {
    if (email === '' && password === '' && passwordConfirm === '') {
      setLabelEmail('Kh??ng ???????c b??? tr???ng');
      setLabelPassword('Kh??ng ???????c b??? tr???ng');
      setLabelPasswordConfirm('Kh??ng ???????c b??? tr???ng');
      setWarningEmail(true);
      setWarningPassword(true);
      setWarningPassWordConfirm(true);
    } else if (email === '') {
      setLabelEmail('Kh??ng ???????c b??? tr???ng');
      setWarningEmail(true);
    } else if (password === '') {
      setLabelPassword('Kh??ng ???????c b??? tr???ng');
      setWarningPassword(true);
    } else if (passwordConfirm === ' ') {
      setLabelPasswordConfirm('Kh??ng ???????c b??? tr???ng');
      setWarningPassWordConfirm(true);
    } else if (password <= 6) {
      setLabelPassword('M???t kh???u ph???i l???n h??n 6 k?? t???');
      setWarningPassword(true);
    } else if (!checkMail(email)) {
      setLabelEmail('Vui l??ng nh???p ????ng ?????nh d???ng');
      setWarningEmail(true);
    } else if (isNullEmptyBlank(password)) {
      setLabelPassword('M???t kh???u kh??ng kh??ng ???????c ch???a kho???ng c??ch');
      setWarningPassword(true);
    } else if (isNullEmptyBlank(passwordConfirm)) {
      setLabelPasswordConfirm('M???t kh???u kh??ng kh??ng ???????c ch???a kho???ng c??ch');
      setWarningPassWordConfirm(true);
    } else if (password !== passwordConfirm) {
      setLabelPasswordConfirm('M???t kh???u kh??ng kh???p');
      setWarningPassWordConfirm(true);
    } else {
      navigation.navigate('ScreenRegisterDetail', {
        emailNext: email,
        passwordNext: password,
        passwordConfirmNext: passwordConfirm,
      });
    }
    // navigation.navigate('ScreenRegisterDetail', {
    //   emailNext: email,
    //   passwordNext: password,
    //   passwordConfirmNext: passwordConfirm,
    // });
    console.log(isNullEmptyBlank(password));
  }
  function eventLogin() {
    navigation.navigate('ScreenLogin');
  }
  function clearTextEmail() {
    setEmail('');
    setVisibleIconEmail(false);
  }
  function clearTextPassword() {
    setPassword('');
    setVisibleIconPassword(false);
  }
  function clearTextPasswordConfirm() {
    setPasswordConfirm('');
    setVisibleIconPasswordConfirm(false);
  }

  function eventOnOff() {
    setViewEye(!viewEye);
    setShowPassword(!showPassword);
  }
  function eventOnOffConfirm() {
    setViewEyeConfirm(!viewEyeConfirm);
    setShowPasswordConfirm(!showPasswordConfirm);
  }
  function eventEditEmail(text: string | any) {
    setEmail(text);
    setWarningEmail(false);
    setVisibleIconEmail(true);
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
  function eventEditPasswordConfirm(text: string | any) {
    setPasswordConfirm(text);
    if (text != null) {
      console.log('text != null');
      setWarningPassWordConfirm(false);
      setVisibleIconPasswordConfirm(true);
      setLabelPasswordConfirm(null);
    } else {
      console.log('text == null');
      setVisibleIconPasswordConfirm(false);
    }
  }

  const renderContent = (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: sizes._36sdp,
          marginHorizontal: sizes._20sdp,
        }}>
        <Text style={{fontSize: sizes._24sdp, textAlign: 'center'}}>
          Ch??o m???ng b???n ?????n v???i ???ng d???ng mua s???m tr???c tuy???n ????ng k?? nhanh n??o!
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: sizes._20sdp,
          width: sizes._screen_width - sizes._40sdp,
          marginTop: sizes._20sdp,
        }}>
        <Input
          value={email}
          onPress_1={clearTextEmail}
          titleInPut="Email"
          placeholder="Enter email"
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
          placeholder="Enter m???t kh???u"
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

        <Input
          value={passwordConfirm}
          onPress_1={clearTextPasswordConfirm}
          onPress_2={eventOnOffConfirm}
          titleInPut="X??c nh???n m???t kh???u "
          placeholder="Enter x??c nh???n m???t kh???u"
          nameImg_1={Images.ic_mark_cut}
          nameImg_2={Images.ic_eye_off}
          nameImg_3={Images.ic_eys_on}
          setIconView={viewEyeConfirm}
          onChangeText={text => eventEditPasswordConfirm(text)}
          secureTextEntry={showPasswordConfirm}
          setIconViewEmail={visibleIconPasswordConfirm}
          setIconViewPassword={visibleIconPasswordConfirm}
        />
        {warningPassWordConfirm && (
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: ArrayColors._color_red,
              fontWeight: 'bold',
            }}>
            {labelPassWordConfirm}
          </Text>
        )}
      </View>

      <Button onPress={handleNext} title="Ti???p t???c >"></Button>
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
            fontSize: sizes._18sdp,
          }}>
          B???n ???? c?? t??i kho???n ?
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
            <HeaderShown titleScreen="????NG K??" onBackPress={onBackPress} />
          }></AppHeader>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="Screen_Register"
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

export default ScreenRegister;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
