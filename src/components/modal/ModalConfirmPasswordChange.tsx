import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../components/accounts/Button';
import Input from '../../components/accounts/Input';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Images from '../../res/require/Images';

type Props = {
    visible: boolean,

}

const ModalConfirmPasswordChange = (props: Props) => {
    const [email, setEmail] = React.useState<string | any>('');
    const [otp, setOtp] = React.useState<string | any>('');

    const [visibleIconEmail, setVisibleIconEmail] = React.useState(false);
    const [labelEmail, setLabelEmail] = React.useState<string | any>('');
    const [warningEmail, setWarningEmail] = React.useState<string | any>(false);
    const [lableOTPreq, setLableOTPreq] = React.useState<string | any>(
        'Bạn chưa nhận được mã OTP',
    );
    const [seconds, setSeconds] = React.useState<string | any>(0);
    const [event, setEvent] = React.useState<string | any>(true);


    function clearTextEmail() {

    }

    function eventEditEmail(text: string | any) {
        setEmail(text);

    }

    function clearTextOTP() {

    }

    function eventEditOTP(text: string | any) {
        setOtp(text);

    }

    function handleConfirm() {

    }

    function eventReqOTP() {
        console.log('req');
        setEvent(false);

        if (seconds <= 0) {
            setSeconds(10);
            // GenerateOTP(userEmail, userID);

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
                    <Text style={{ position: "absolute", right: sizes._10sdp, top: sizes._12sdp }}>X</Text>
                    <Text style={{
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

                    <Input
                        value={otp}
                        onPress_1={clearTextOTP}
                        titleInPut="OTP"
                        placeholder="Xác thực mã OTP"
                        nameImg_1={Images.ic_mark_cut}
                        onChangeText={text => eventEditOTP(text)}
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
                        onPress={handleConfirm} >

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