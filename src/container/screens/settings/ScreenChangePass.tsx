import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Input from '../../../components/accounts/Input';
import image from '../../../res/require/Images';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Button from '../../../components/accounts/Button';

type Props = {};

const ScreenChangePass = ({navigation}: any) => {
  const [password, setPassword] = React.useState<string | any>('');
  const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);

  const [viewEye, setViewEye] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(true);

  const [warningPassWord, setWarningPassword] = React.useState<string | any>(
    false,
  );
  const [labelPassWord, setLabelPassword] = React.useState<string | any>('');

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

  const [passwordnew, setPasswordnew] = React.useState<string | any>('');
  const [visibleIconPasswordnew, setVisibleIconPasswordnew] =
    React.useState(false);

  const [viewEyenew, setViewEyenew] = React.useState(true);
  const [showPasswordnew, setShowPasswordnew] = React.useState(true);

  const [warningPassWordnew, setWarningPasswordnew] = React.useState<
    string | any
  >(false);
  const [labelPassWordnew, setLabelPasswordnew] = React.useState<string | any>(
    '',
  );

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
  function eventOnOff() {
    setViewEye(!viewEye);
    setShowPassword(!showPassword);
  }

  function eventEditPasswordold(text: string | any) {
    setPasswordold(text);
    if (text != null) {
      console.log('text != null');
      setVisibleIconPasswordold(true);
      setWarningPasswordold(false);
      setLabelPasswordold(null);
    } else {
      console.log('text == null');
      setVisibleIconPasswordold(false);
    }
  }
  function clearTextPasswordold() {
    setPasswordold('');
    setVisibleIconPasswordold(false);
  }
  function eventOnOffold() {
    setViewEyeold(!viewEye);
    setShowPasswordold(!showPassword);
  }

  function eventEditPasswordnew(text: string | any) {
    setPasswordnew(text);
    if (text != null) {
      console.log('text != null');
      setVisibleIconPasswordnew(true);
      setWarningPasswordnew(false);
      setLabelPasswordnew(null);
    } else {
      console.log('text == null');
      setVisibleIconPasswordnew(false);
    }
  }
  function clearTextPasswordnew() {
    setPasswordnew('');
    setVisibleIconPasswordnew(false);
  }
  function eventOnOffnew() {
    setViewEyenew(!viewEye);
    setShowPasswordnew(!showPassword);
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

  const RenderView = (
    <View
      style={{
        marginHorizontal: sizes._20sdp,
        marginTop: sizes._20sdp,
        width: sizes._screen_width - sizes._40sdp,
      }}>
      <View>
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
      </View>

      <View>
        <Input
          value={passwordnew}
          onPress_1={clearTextPasswordnew}
          onPress_2={eventOnOffnew}
          titleInPut="Mật khẩu"
          placeholder="Enter mật khẩu mới"
          nameImg_1={image.ic_mark_cut}
          nameImg_2={image.ic_eye_off}
          nameImg_3={image.ic_eys_on}
          setIconView={viewEye}
          onChangeText={text => eventEditPasswordnew(text)}
          secureTextEntry={showPasswordnew}
          setIconViewEmail={visibleIconPasswordnew}
          setIconViewPassword={visibleIconPasswordnew}
        />
      </View>

      <View>
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
      </View>
      <Button title="Xác nhận" />
    </View>
  );

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainerBody}>
        <FlatList
          renderItem={null}
          data={[]}
          ListFooterComponent={RenderView}
          listKey="screen_settings"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreenChangePass;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContainerBody: {
    flex: 1,
    backgroundColor: ArrayColors.gray_bg_light,
  },
  containerHeader: {
    flex: 1,
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
