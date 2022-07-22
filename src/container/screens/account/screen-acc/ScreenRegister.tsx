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

type Props = {};

const ScreenRegister = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);

  function onBackPress() {
    navigation.goBack();
  }
  function handleNext() {
    navigation.navigate('ScreenRegisterDetail');
  }
  function eventLogin() {
    navigation.navigate('ScreenLogin');

  }
  function renderContent() {
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: sizes._36sdp,
            marginHorizontal: sizes._20sdp,
          }}>
          <Text style={{fontSize: sizes._24sdp, textAlign: 'center'}}>
            Chào mừng bạn đến với ứng dụng mua sắm trực tuyển đăng ký nhanh nào!
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: sizes._20sdp,
            width: sizes._screen_width - sizes._40sdp,
            marginTop : sizes._20sdp,
          }}>
          <Input
            //   value={email}
            //   onPress_1={clearTextEmail}
            titleInPut="Email"
            placeholder="Enter email"
            nameImg_1={Images.ic_mark_cut}
            //   onChangeText={text => eventEditEmail(text)}
            //   setIconViewEmail={visibleIconEmail}
          />

          <Input
            //   value={password}
            // onPress_1={clearTextPassword}
            //  onPress_2={eventOnOff}
            titleInPut="Mật khẩu"
            placeholder="Enter mật khẩu"
            nameImg_1={Images.ic_mark_cut}
            nameImg_2={Images.ic_eye_off}
            nameImg_3={Images.ic_eys_on}
            // setIconView={viewEye}
            //   onChangeText={text => eventEditPassword(text)}
            //   secureTextEntry={showPassword}
            //   setIconViewEmail={visibleIconPassword}
            //   setIconViewPassword={visibleIconPassword}
          />
          <Input
            //   value={password}
            //   onPress_1={clearTextPassword}
            //   onPress_2={eventOnOff}
            titleInPut="Xác nhận mật khẩu "
            placeholder="Enter xác nhận mật khẩu"
            nameImg_1={Images.ic_mark_cut}
            nameImg_2={Images.ic_eye_off}
            nameImg_3={Images.ic_eys_on}
            //   setIconView={viewEye}
            //   onChangeText={text => eventEditPassword(text)}
            //   secureTextEntry={showPassword}
            //   setIconViewEmail={visibleIconPassword}
            //   setIconViewPassword={visibleIconPassword}
          />
        </View>

        <Button onPress={handleNext} title="Tiếp tục >"></Button>
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
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.mContainer}>
        <AppHeader
          content
          customContent={
            <HeaderShown titleScreen="ĐĂNG KÝ" onBackPress={onBackPress} />
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
