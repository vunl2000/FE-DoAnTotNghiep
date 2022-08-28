import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, FlatList, Keyboard, ToastAndroid } from 'react-native'
import React from 'react'
import HeaderShown from '../../../../components/accounts/HeaderShown';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import ArrayColors from '../../../../res/colors/ArrayColors';
import Loading from '../../../../components/modal/Loading';
import Button from '../../../../components/accounts/Button';
import Input from '../../../../components/accounts/Input';
import image from '../../../../res/require/Images';
import axios from 'axios';

type Props = {}

const ScreenForgotPassword = ({ navigation, route }: any) => {

    const itemId = route.params;

    console.log(itemId.dataID);

    const [password, setPassword] = React.useState<string | any>('');
    const [visibleIconPassword, setVisibleIconPassword] = React.useState(false);
    const [labelPassWord, setLabelPassword] = React.useState<string | any>('');
    const [warningPassWord, setWarningPassword] = React.useState<string | any>(
        false,
    );
    const [viewEye, setViewEye] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(true);

    const [passwordnew, setPasswordnew] = React.useState<string | any>('');
    const [visibleIconPasswordnew, setVisibleIconPasswordnew] =
        React.useState(false);
    const [labelPassWordNew, setLabelPasswordNew] = React.useState<string | any>(
        '',
    );
    const [warningPassWordNew, setWarningPasswordNew] = React.useState<
        string | any
    >(false);


    const [viewEyenew, setViewEyenew] = React.useState(true);
    const [showPasswordnew, setShowPasswordnew] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

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


    function eventEditPasswordnew(text: string | any) {
        setPasswordnew(text);
        if (text != null) {
            console.log('text != null');
            setVisibleIconPasswordnew(true);
            setWarningPasswordNew(false);
            setLabelPasswordNew(null);
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
        setViewEye(!viewEye);
        setShowPassword(!showPassword);
    }
    function eventOnOff() {
        setViewEyenew(!viewEyenew);
        setShowPasswordnew(!showPasswordnew);
    }
    function onBackPress() {
        navigation.goBack();
    }
    function eventConfirm() {
        if (passwordnew === '') {
            setLabelPasswordNew('Không được bỏ trống');
            setWarningPasswordNew(true);
        } else if (password === '') {
            setLabelPassword('Không được bỏ trống');
            setWarningPassword(true);
        } else if (passwordnew !== password) {
            setLabelPassword('Xác thực mật khẩu không đúng');
            setWarningPassword(true);
        } else if (passwordnew.length < 6) {
            setLabelPasswordNew('Mật khẩu phải lớn hơn 6 ký tự');
            setWarningPasswordNew(true);
        } else {
            console.log("ok");
            setIsLoading(true);
            setTimeout(() => {
                mForgotPassword(itemId.dataID, passwordnew, password)
            }, 1500)
        }
    }

    function mForgotPassword(userId: string | any, passwordRefreshNew: string | any, passwordConfirmRefreshNew: string | any) {
        var data = JSON.stringify({
            userID: userId,
            passwordRefreshNew: passwordRefreshNew,
            passwordConfirmRefreshNew: passwordConfirmRefreshNew
        });

        var config = {
            method: 'post',
            url: 'http://52.141.50.48:3000/account-user/verify-otp-rs-pass',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.code === 200) {
                    ToastAndroid.show(
                        'Đổi mật khẩu thành công',
                        ToastAndroid.SHORT,
                    );
                    navigation.navigate("ScreenLogin")
                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );

                }
                setIsLoading(false)

            })
            .catch(function (error) {
                console.log(error.response.data);
                ToastAndroid.show(
                    'Đã có lỗi trong quá trình xử lý',
                    ToastAndroid.SHORT,
                );
                setIsLoading(false)
            });

        return setIsLoading(false)
    }
    const RenderView = (

        <View
            style={{
                marginHorizontal: sizes._20sdp,
                marginTop: sizes._20sdp,
                width: sizes._screen_width - sizes._40sdp,
            }}>
            <Input
                value={passwordnew}
                onPress_1={clearTextPasswordnew}
                onPress_2={eventOnOff}
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
                onPress_2={eventOnOffnew}
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
    )


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.mContainer}>
                <AppHeader
                    content
                    customContent={
                        <HeaderShown titleScreen="QUÊN MẬT KHẨU" onBackPress={onBackPress} />
                    }></AppHeader>

                <FlatList
                    data={null}
                    renderItem={null}
                    ListFooterComponent={RenderView}
                    listKey="Screen_ForgotPassword"
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                />
                {isLoading ? <Loading /> : null}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ScreenForgotPassword

const styles = StyleSheet.create({
    mContainer: {
        flex: 1,
        backgroundColor: ArrayColors._color_white,
    },
})