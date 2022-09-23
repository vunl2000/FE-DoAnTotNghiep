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
    FlatList,
} from 'react-native';
import React, { useRef } from 'react';
import ArrayColors from '../../../../res/colors/ArrayColors';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import Input from '../../../../components/accounts/Input';
import Button from '../../../../components/accounts/Button';

import {
    userLogins,
    userLoginsGoogle,
    userLoginsFaceBook,
} from '../../../../store/actions/loginActions';
import { clearErrors } from '../../../../store/actions/errActions';
import ModalConfirmPasswordChange from '../../../../components/modal/ModalConfirmPasswordChange';
import { useDispatch, useSelector } from 'react-redux';

import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import TextForgotPassword from '../../../../components/accounts/TextForgotPassword';
import HeaderShown from '../../../../components/accounts/HeaderShown';

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { checkMail, isNullEmptyBlank } from '../../../../utils/Utilities';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import Loading from '../../../../components/modal/Loading';
import axios from 'axios';
import { API_URL, GET_HEART } from '@env';
import { getHeartUser } from '../../../../store/actions/productsActions';
type Props = {};

GoogleSignin.configure({
    webClientId:
        '659424688855-g0p0leovj74ivmuvjnmrdb2upcdtu1r2.apps.googleusercontent.com',
    // offlineAccess: true, // if you want to access Google API on behalf
});

const ScreenLogin = ({ navigation }: { navigation: any }) => {
    const isAndroid = Platform.OS === 'android';
    const [VSBG, setVSBG] = React.useState<any>('');
    const [isModal, setIsModal] = React.useState<any>(true);

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

    const [loading, setLoadings] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState();

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

    async function eventLoginGoogle() {
        setIsLoading(true);
        const { idToken }: any = await GoogleSignin.signIn().catch(e => {
            ToastAndroid.show('Đã có lỗi trong quá trình xử lý', ToastAndroid.SHORT);
            setIsLoading(false);
            console.log(e);
        });
        // Create a Google credential with the token
        const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        await auth()
            .signInWithCredential(googleCredential)
            .then((res: any) => {
                setUserInfo(res);
            })
            .catch(e => {
                // Alert.alert(e.message);
                ToastAndroid.show(
                    'Đã có lỗi trong quá trình xử lý',
                    ToastAndroid.SHORT,
                );
                console.log(e);
            });
        auth()
            .currentUser?.getIdToken(true)
            .then(idToken => {
                console.log(idToken);
                if (idToken) {
                    dispatch(userLoginsGoogle(idToken));
                } else {
                    ToastAndroid.show(
                        'Đã có lỗi trong quá trình xử lý',
                        ToastAndroid.SHORT,
                    );
                }
            })
            .catch(e => {
                console.log(e);
                ToastAndroid.show(
                    'Đã có lỗi trong quá trình xử lý',
                    ToastAndroid.SHORT,
                );
            });
    }

    React.useEffect(() => {
        const { isAuthenticated, token } = accounts;

        if (isAuthenticated) {
            // setTimeout(() => {

            if (accounts.code === 200) {
                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                console.log(accounts);
                dispatch(clearErrors());
                dispatch(getHeartUser(`Bearer ${token}`, accounts.result[0]._id));
                setIsLoading(false);
                navigation.goBack();
            }
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
        if (email === '' || password === '') {
            setWarningEmail(true);
            setLabelEmail('Vui lòng không bỏ trống');
            setWarningPassword(true);
            setLabelPassword('Vui lòng không bỏ trống');
        } else if (email === '') {
            setWarningEmail(true);
            setLabelEmail('Vui lòng không bỏ trống');
        } else if (password === '') {
            setWarningPassword(true);
            setLabelPassword('Vui lòng không bỏ trống');
        } else if (password.length < 6) {
            setWarningPassword(true);
            setLabelPassword('Mật khẩu phải lớn hơn 6 ký tự');
        } else if (!checkMail(email)) {
            setLabelEmail('Vui lòng nhập đúng định dạng');
            setWarningEmail(true);
        } else if (isNullEmptyBlank(email)) {
            setLabelEmail('Email không không được chứa khoảng cách');
            setWarningEmail(true);
        } else if (isNullEmptyBlank(password)) {
            setLabelPassword('Mật khẩu không không được chứa khoảng cách');
            setWarningPassword(true);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                dispatch(userLogins({ email, password }));
                // setIsLoading(true);
                console.log({ email, password });
            }, 1500);
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
    async function eventLoginFaceBook() {
        setIsLoading(true);

        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
            ]);
            if (result.isCancelled) {
                console.log(result.isCancelled);
                // throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data: any = await AccessToken.getCurrentAccessToken();
            // console.log(data);

            if (data) {
                // setVSBG(data.accessToken)
                console.log("pppppppppppppppppppppppp", data.accessToken);

                auth()
                    .currentUser?.getIdToken(true)
                    .then(idToken => {
                        dispatch(userLoginsFaceBook(idToken));
                        setIsLoading(false);
                        console.log("0000000000000000000000", idToken);

                    })
                    .catch((e: any) => {
                        console.log(e);
                        Alert.alert('Đã có lỗi trong quá trình xử lý');
                        setIsLoading(false);
                    });

            }
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
            return auth().signInWithCredential(facebookCredential);

        } catch (e) {
            console.log(e);
            Alert.alert('Đã có lỗi trong quá trình xử lý');
            setIsLoading(false);
        }
    }


    // React.useEffect(() => {
    //     test();
    // }, [VSBG])

    // function test() {
    //     console.log("olllllvaicalon");


    // }

    function dismissMoDal() {
        setShowCheg(false);
    }

    function eventForgotPassword() {
        setShowCheg(true);
        //  navigation.navigate('ScreenForgotPassword');
    }

    function dismissMoDalls() {
        setShowCheg(false);
    }

    console.log(showCheg);

    const renderContent = (
        <>
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

                <GoogleOrFacebook
                    eventLoginFaceBook={eventLoginFaceBook}
                    eventLoginGoogle={eventLoginGoogle}
                />
                <Policy />
            </View>
            <TouchableOpacity
                onPress={eventRegister}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: sizes._12sdp,
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
        </>
    );

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.mContainer}>
                    <AppHeader
                        content
                        customContent={
                            <HeaderShown titleScreen="ĐĂNG NHẬP" onBackPress={onBackPress} />
                        }></AppHeader>
                    <FlatList
                        data={null}
                        renderItem={null}
                        ListFooterComponent={renderContent}
                        listKey="Screen_Login"
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="always"
                    />

                    {isLoading ? <Loading /> : null}
                    <ModalConfirmPasswordChange
                        // navigation={navigation}
                        dismissMoDalls={dismissMoDalls}
                        dismissMoDal={dismissMoDal}
                        visible={showCheg}
                    />
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
