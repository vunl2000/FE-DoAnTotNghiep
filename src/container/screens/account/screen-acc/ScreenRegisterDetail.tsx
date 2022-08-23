import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    Image,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import React from 'react';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import ArrayColors from '../../../../res/colors/ArrayColors';
import Loading from '../../../../components/modal/Loading';
import Button from '../../../../components/accounts/Button';
import Input from '../../../../components/accounts/Input';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../../../store/actions/registerActions';
import RNFS from 'react-native-fs';
import axios from 'axios';

type Props = {};

const ScreenRegisterDetail = ({ navigation, route }: any) => {
    const { emailNext, passwordNext, passwordConfirmNext } = route.params;
    const [isLoading, setIsLoading] = React.useState<string | any>(false);
    const [selectedImage, setSelectedImage] = React.useState<string | any>(null);
    const [croppedImage, setCroppedImage] = React.useState<string | any>(null);
    const [email, setEmail] = React.useState<string | any>();
    const [password, setPassword] = React.useState<string | any>();
    const [passwordConfirm, setPasswordConfirm] = React.useState<string | any>();
    const [name, setUserName] = React.useState<string | any>('');
    const [phone, setNumberPhone] = React.useState<string | any>('');
    const [visibleIconUserName, setVisibleIconUserName] = React.useState(false);
    const [visibleIconNumberPhone, setVisibleIconNumberPhone] =
        React.useState(false);

    const [warningUserName, setWarningUserName] = React.useState<string | any>(
        false,
    );
    const [warningNumberPhone, setWarningNumberPhone] = React.useState<
        string | any
    >(false);
    const [labelUserName, setLabelUserName] = React.useState<string | any>('');
    const [labelNumberPhone, setLabelNumberPhone] = React.useState<string | any>(
        '',
    );

    const dispatch: string | any = useDispatch();

    const register = useSelector((state: any) => state.register);
    const error = useSelector((state: any) => state.err);

    console.log(emailNext);
    console.log(passwordNext);
    console.log(passwordConfirm);

    React.useEffect(() => {
        setPassword(passwordNext);
        setEmail(emailNext);
        setPasswordConfirm(passwordConfirmNext);
    }, []);

    function onBackPress() {
        navigation.goBack();
    }

    function eventLogin() {
        navigation.navigate('ScreenLogin');
    }

    function eventEditUserName(text: string | any) {
        setUserName(text);
        if (text != null) {
            console.log(name);
            setVisibleIconUserName(true);
            setWarningUserName(false);
            // setLabelUserName('');
        }
    }
    function eventEditNumberPhone(text: string | any) {
        setNumberPhone(text);
        if (text != null) {
            setVisibleIconNumberPhone(true);
            setWarningNumberPhone(false);
            console.log(phone);
            setLabelNumberPhone('');
        }
    }
    function clearTextUserName() {
        setUserName('');
        setVisibleIconUserName(false);
    }

    function clearTextNumberPhone() {
        setNumberPhone('');
        setVisibleIconNumberPhone(false);
    }

    async function eventUpLoadFileImager() {
        ImagePicker.showImagePicker(
            {
                maxWidth: 800,
                maxHeight: 600,
            },
            response => {
                if (response.error) {
                    console.log('image error');
                    console.log(response.error);
                    setSelectedImage(Images.user_no_bgr);
                } else {
                    console.log('Image: ' + response.uri);
                    setSelectedImage({ uri: response.uri });
                    setCroppedImage(response.uri);
                }
            },
        );
    }

    React.useEffect(() => {
        try {
            if (selectedImage.uri !== undefined) {
                // console.log(selectedImage.uri);
                setSelectedImage(selectedImage);
                console.log('useEffect: ' + selectedImage);
            } else {
                setSelectedImage(Images.user_no_bgr);
            }
        } catch (e) {
            console.log(e);
        }
    }, [selectedImage]);

    //sussce
    React.useEffect(() => {
        const { isRegistered } = register;

        if (isRegistered) {
            setTimeout(() => {
                setIsLoading(false);
                // navigation.goBack();
                if (register.code === 200) {
                    ToastAndroid.show('Đăng ký thành công.', ToastAndroid.SHORT);
                    navigation.navigate('ScreenVeryfiOTP');
                }

            }, 3000);
        }
    }, [register]);

    //error
    React.useEffect(() => {

        setTimeout(() => {
            try {
                const errorCode = error.code.code;

                switch (errorCode) {
                    case 500: {
                        setIsLoading(false);
                        ToastAndroid.show(
                            'Đăng ký thất bại vui lòng thử lại sau.',
                            ToastAndroid.SHORT,
                        );
                        break;
                    }
                    case 501: {
                        setIsLoading(false);
                        ToastAndroid.show(
                            'Email này đã có người sử dụng.',
                            ToastAndroid.SHORT,
                        );
                        break;
                    }
                    case 502: {
                        setIsLoading(false);
                        ToastAndroid.show('Mật khẩu không khớp.', ToastAndroid.SHORT);
                        break;
                    }
                    case 503: {
                        setIsLoading(false);
                        ToastAndroid.show(
                            'Mật khẩu phải lớn hơn 6 ký tự.',
                            ToastAndroid.SHORT,
                        );
                        break;
                    }
                    default:
                        setIsLoading(false);
                        console.log('Error');
                }
            } catch {
                setIsLoading(false);
                console.log('Đã có lỗi xảy ra');
            }

        }, 3000);

    }, [error]);

    async function handleRegister() {
        setIsLoading(true);
        console.log('ok');
        if (name === '') {
            setWarningUserName(true);
            setLabelUserName('Không được bỏ trống');
            console.log('okkkkkk');
        } else if (phone === '') {
            setWarningNumberPhone(true);
            setLabelNumberPhone('Không được bỏ trống');
        } else {
            dispatch(
                userRegister({
                    name,
                    croppedImage,
                    phone,
                    email,
                    password,
                    passwordConfirm,
                }),
            );
            // navigation.navigate('ScreenVeryfiOTP');
        }

    }

    const renderContent = (
        <>
            <View
                style={{
                    width: sizes._screen_width / 2,
                    height: sizes._screen_width / 2,
                    borderWidth: 6,
                    borderRadius: sizes._screen_width / 2,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderColor: ArrayColors.pink,
                    marginVertical: sizes._16sdp,
                }}>
                <View
                    style={{
                        width: sizes._screen_width / 2 - 20,
                        height: sizes._screen_width / 2 - 20,
                        borderWidth: 1,
                        borderRadius: sizes._screen_width / 2,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderColor: ArrayColors._color_red,
                        marginVertical: sizes._16sdp,
                    }}>
                    <View
                        style={{
                            width: sizes._screen_width / 2 - 40,
                            height: sizes._screen_width / 2 - 40,
                            borderRadius: sizes._screen_width / 2,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginVertical: sizes._16sdp,
                        }}>
                        <Image
                            source={selectedImage ? selectedImage : Images.user_no_bgr}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: sizes._screen_width / 2,
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={eventUpLoadFileImager}
                        style={{
                            width: sizes._48sdp,
                            height: sizes._48sdp,
                            backgroundColor: ArrayColors._color_white,
                            position: 'absolute',
                            right: -sizes._32sdp,
                            top: '70%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: sizes._48sdp / 2,
                        }}>
                        <Image
                            source={Images.ic_camera}
                            style={{
                                width: sizes._32sdp,
                                height: sizes._32sdp,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    marginHorizontal: sizes._20sdp,
                    width: sizes._screen_width - sizes._40sdp,
                    marginTop: sizes._20sdp,
                }}>
                <Input
                    value={name}
                    onPress_1={clearTextUserName}
                    titleInPut="Họ và tên"
                    placeholder="Enter họ tên"
                    nameImg_1={Images.ic_mark_cut}
                    onChangeText={text => eventEditUserName(text)}
                    setIconViewEmail={visibleIconUserName}
                />

                {warningUserName && (
                    <Text
                        style={{
                            fontSize: sizes._16sdp,
                            color: ArrayColors._color_red,
                            fontWeight: 'bold',
                        }}>
                        {labelUserName}
                    </Text>
                )}
                <Input
                    value={phone}
                    onPress_1={clearTextNumberPhone}
                    titleInPut="Số điện thoại"
                    placeholder="Enter số điện thoại"
                    nameImg_1={Images.ic_mark_cut}
                    onChangeText={text => eventEditNumberPhone(text)}
                    setIconViewEmail={visibleIconNumberPhone}
                />
                {warningNumberPhone && (
                    <Text
                        style={{
                            fontSize: sizes._16sdp,
                            color: ArrayColors._color_red,
                            fontWeight: 'bold',
                        }}>
                        {labelNumberPhone}
                    </Text>
                )}
            </View>
            <Button onPress={handleRegister} title="Đăng ký"></Button>
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.mContainer}>
                <AppHeader
                    content
                    customContent={
                        <HeaderShown
                            titleScreen="THÊM THÔNG TIN"
                            onBackPress={onBackPress}
                        />
                    }></AppHeader>
                <FlatList
                    data={null}
                    renderItem={null}
                    ListFooterComponent={renderContent}
                    listKey="Screen_Register_Detail"
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

export default ScreenRegisterDetail;

const styles = StyleSheet.create({
    mContainer: {
        flex: 1,
        backgroundColor: ArrayColors._color_white,
    },
});
