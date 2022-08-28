import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React from 'react'
import Button from '../../components/accounts/Button';
import Input from '../../components/accounts/Input';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Images from '../../res/require/Images';
import { checkMail } from '../../utils/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL_GENERATE_OTP } from '@env';
import { useNavigation } from '@react-navigation/native';

type Props = {
    visible: boolean,
    dismissMoDal?: () => void
    dismissMoDalls?: () => void
    isModal?: any
    onChange?: any
    parentCallback?: () => void
}
type State = {

}

const ModalConfirmPasswordChange = (props: Props) => {
    const [VSBG, setVSBG] = React.useState<boolean>(false)
    const dispatch: string | any = useDispatch();
    const navigation: any = useNavigation();

    const [email, setEmail] = React.useState<string | any>('');
    const [otp, setOtp] = React.useState<string | any>('');

    const [visibleIconEmail, setVisibleIconEmail] = React.useState<boolean>(false);
    const [visibleIconOTP, setVisibleIconOTP] = React.useState<boolean>(false);

    const [labelEmail, setLabelEmail] = React.useState<string | any>('');
    const [warningEmail, setWarningEmail] = React.useState<string | any>(false);


    const [labelOTP, setLabelOTP] = React.useState<string | any>('');
    const [warningOTP, setWarningOTP] = React.useState<string | any>(false);

    const [isCheckRqOTP, setIsCheckRqOTP] = React.useState<string | any>(true);

    const [lableOTPreq, setLableOTPreq] = React.useState<string | any>(
        'Bạn chưa nhận được mã OTP',
    );

    const [emailRqOTP, setEmailRqOTP] = React.useState<string | any>("");

    const [seconds, setSeconds] = React.useState<string | any>(0);
    const [event, setEvent] = React.useState<string | any>(true);
    const [isCheckVS, setIsCheckVS] = React.useState<string | any>(false);
    const [dataUser, setDataUser] = React.useState<string | any>("");
    const [dataID, setDataID] = React.useState<string | any>("");


    function clearTextEmail() {
        if (email != "") {
            setEmail("")
            setVisibleIconEmail(false);
            setLabelEmail("");
            setWarningEmail(false);
        }
    }
    function eventEditEmail(text: string | any) {
        setEmail(text);
        if (text != null) {
            setVisibleIconEmail(true);
            setWarningEmail(false);
            setLabelEmail(null);
        } else {
            setVisibleIconEmail(false);
        }

    }
    function clearTextOTP() {
        if (otp != "") {
            setOtp("")
            setVisibleIconOTP(false);
            setLabelOTP("");
            setWarningOTP(false);
        }
    }
    function eventEditOTP(text: string | any) {
        setOtp(text);
        if (text != null) {
            setVisibleIconOTP(true);
            setWarningOTP(false);
            setLabelOTP(null);
        } else {
            setVisibleIconOTP(false);
        }
    }

    async function handleConfirm() {
        // navigation.navigate('ScreenForgotPassword',{dataID});

        if (isCheckRqOTP) {
            if (email === '') {
                setWarningEmail(true);
                setLabelEmail('Vui lòng không bỏ trống');
            } else if (!checkMail(email)) {
                setLabelEmail('Vui lòng nhập đúng định dạng');
                setWarningEmail(true);
            } else {
                userConfirmEmail(email)
            }
        } else {
            if (otp === '') {
                setWarningOTP(true);
                setLabelOTP('Vui lòng không bỏ trống');
            } else {
                console.log("oaaaaaaaaak");
                VerifyOTP(emailRqOTP, otp)
            }
        }

    }
    function userConfirmEmail(email: any) {
        var data = JSON.stringify({
            email: email
        });
        console.log(data);

        var config = {
            method: 'post',
            url: 'http://52.141.50.48:3000/account-user/gmail-authentication-user',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                if (response.data.code === 200) {
                    if (response.data.user._id != null && response.data.user.email != null) {
                        GenerateOTP(response.data.user.email, response.data.user._id)
                        setDataUser(response.data.user.email);
                        setDataID(response.data.user._id);
                    } else {
                        ToastAndroid.show(
                            'Đã có lỗi trong quá trình xử lý',
                            ToastAndroid.SHORT,
                        );
                        return response
                    }
                }

            })
            .catch(function (error) {
                console.log(error.response.data);
                if (error.response.data.code === 400) {
                    ToastAndroid.show(
                        'Email không có trong hệ thống',
                        ToastAndroid.SHORT,
                    );
                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );
                }
            });
    };

    async function GenerateOTP(userEmail: any, userID: any) {
        const mFormData = JSON.stringify({
            userEmail,
            userID,
        });
        const config = await {
            method: 'POST',
            // url: API_URL_GENERATE_OTP,
            url: " http://52.141.50.48:3000/account-user/get-gen-otp",
            headers: {
                'Content-Type': 'application/json',
            },
            data: mFormData,
        };

        console.log(mFormData);
        await axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                if (response.data.code === 200) {
                    ToastAndroid.show(
                        'Mã OTP đã được gửi đến Gmail của bạn',
                        ToastAndroid.SHORT,
                    );
                    setIsCheckVS(true);
                    setIsCheckRqOTP(false)
                    setEmailRqOTP(response.data.result.userEmail)
                }
            })
            .catch(error => {
                if (error.response.data.code === 400) {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );
                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );
                }
            });
    }

    function VerifyOTP(emailOTP: string | any, numberOTP: string | any) {
        var data = JSON.stringify({
            userEmail: emailOTP,
            userOTP: numberOTP
        });

        var config = {
            method: 'post',
            url: 'http://52.141.50.48:3000/account-user/verify-otp-submit',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.code === 200) {
                    ToastAndroid.show(
                        'Xác thực thành công',
                        ToastAndroid.SHORT,
                    );
                    navigation.navigate('ScreenForgotPassword', { dataID });
                    setOtp("")
                    setEmail("")
                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );
                    props.dismissMoDalls = undefined
                }
                console.log("xác thực tc ", JSON.stringify(response.data));
            })
            .catch(function (error) {
                if (error.response.data.code === 400) {
                    ToastAndroid.show(
                        'Mã xác thực không chính xác',
                        ToastAndroid.SHORT,
                    );

                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );

                }
                props.dismissMoDalls = undefined
            });
    }


    function eventReqOTP() {
        console.log('req');
        setEvent(false);

        if (seconds <= 0) {
            setSeconds(90);
            GenerateOTP(dataUser, dataID);
        }
    }
    React.useLayoutEffect(() => {
        console.log('ok');

        const timerId = setInterval(() => {
            if (seconds === 0) {
                clearInterval(timerId);
                setLableOTPreq('Bạn chưa nhận được mã OTP?');
                setEvent(true);
            } else {
                setSeconds(seconds - 1);
                setLableOTPreq(`Gửi lại mã OTP sau ${seconds}`);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [seconds]);


    return (
        <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={props.visible}>
            <View
                style={{
                    backgroundColor: ArrayColors._color_gray_translucenLoading,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <View
                    style={{
                        width: sizes._screen_width,
                        backgroundColor: ArrayColors._color_white,
                        borderRadius: sizes._6sdp,
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: sizes._screen_height / 1.2,
                        paddingHorizontal: sizes._24sdp
                    }}>
                    <TouchableOpacity
                        onPress={props.dismissMoDal}
                    >
                        <Image
                            source={Images.ic_cut}
                            style={{
                                width: sizes._16sdp,
                                height: sizes._16sdp,
                                position: "absolute", right: 0, top: sizes._24sdp
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: ArrayColors._color_black,
                            fontSize: sizes._20sdp,
                            fontWeight: 'bold',
                            fontFamily: 'OpenSans-SemiBold', textAlign: 'center',
                            marginTop: sizes._32sdp
                        }}>Quên mật khẩu</Text>

                    <Text style={{
                        color: ArrayColors._color_black,
                        fontSize: sizes._16sdp,
                        fontWeight: 'normal',
                        fontFamily: 'OpenSans-SemiBold', textAlign: 'center',
                        marginVertical: sizes._32sdp
                    }}>Xác nhận email của bạn và gửi OTP đặt lại</Text>
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
                    {isCheckVS && (
                        <View>
                            <Input
                                value={otp}
                                onPress_1={clearTextOTP}
                                titleInPut="OTP"
                                placeholder="Xác thực mã OTP"
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
                                    {labelOTP}
                                </Text>
                            )}
                            <View
                                style={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    marginTop: sizes._24sdp,
                                }}>
                                <Text
                                    onPress={event ? eventReqOTP : () => { }}
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
                    )}
                    <TouchableOpacity
                        style={{
                            marginTop: sizes._20sdp,
                            width: sizes._screen_width - sizes._40sdp,
                            height: sizes._48sdp,
                            borderWidth: sizes._6sdp,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: sizes._6sdp,
                            marginHorizontal: sizes._32sdp,
                            borderColor: ArrayColors._color_black,
                            backgroundColor: ArrayColors._color_black,
                        }}
                        onPress={handleConfirm}
                        onPressOut={!isCheckRqOTP ? props.dismissMoDalls : undefined}
                    >
                        <Text style={{
                            color: ArrayColors._color_white,
                            fontSize: sizes._20sdp,
                            fontWeight: 'bold',
                            fontFamily: 'OpenSans-SemiBold', textAlign: 'center'
                        }} >Gửi</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    )
}

export default ModalConfirmPasswordChange

const styles = StyleSheet.create({})