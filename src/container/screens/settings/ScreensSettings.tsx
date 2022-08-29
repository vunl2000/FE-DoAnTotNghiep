import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    ToastAndroid,
    Image
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Icons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { onStoreApp } from '../../../utils/StoreApp';
import { NameScreen } from '../../navigators/TabNavigator';
import { logOut } from '../../../store/actions/loginActions';
import { clearErrors } from '../../../store/actions/errActions';
import { persistor } from '../../../store';
import ModalConfirm from '../../../components/modal/ModalConfirm';
import { clearInvoice } from '../../../store/actions/invoiceActions';
import { HomeName } from '../../navigators/AppContainer';
import { clearAllCart } from '../../../store/actions/productsActions';
import { clearAddress } from '../../../store/actions/addressActions';
import { Divider } from 'react-native-paper';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const ScreensSettings = ({ navigation }: any) => {
    const pkg = require('../../../../package.json');
    const [event, setEvent] = React.useState<string | any>(true);
    const [eventAccount, seteventAccount] = React.useState<string | any>(false);

    const [eventAccounts, seteventAccounts] = React.useState<string | any>(false);
    const [visibleDisableds, setVisibleDisableds] = React.useState<string | any>(false);
    const [isShowImg, setIsShowImg] = React.useState<any>(false)
    const [dataImg, setDataImg] = React.useState<any>(null)

    const [visible, setVisible] = React.useState<string | any>(false);

    const [eventAuth, setEventAuth] = React.useState<string | any>(false);

    const dispatch: string | any = useDispatch();
    const accounts = useSelector((state: any) => state.account);
    const [storageUser, setStorageUser] = React.useState<string | any>(
        'Đăng nhập / Đăng Ký ',
    );

    React.useLayoutEffect(() => {
        try {
            if (accounts.isAuthenticated === null) {
                setStorageUser('Đăng nhập / Đăng Ký >');
                setIsShowImg(false)
                setEvent(true);
                seteventAccount(false);
                seteventAccounts(false);
            } else {
                if (accounts.isAuthenticated === true) {
                    setIsShowImg(true);
                    setDataImg(accounts.result[0].photoUrl)
                    setStorageUser(accounts.result[0].name);
                    setEvent(false);
                    seteventAccount(true);
                    if (accounts.result[0].uIdUserFacebook !== null || accounts.result[0].uIdUserGoogle !== null) {
                        seteventAccounts(false);
                        seteventAccount(true);
                    } else {
                        setStorageUser(accounts.result[0].name);
                        setEvent(false);
                        seteventAccount(true);
                        seteventAccounts(true);
                    }
                    if (!accounts.result[0].authentication) {
                        setEventAuth(true);
                    } else {
                        setEventAuth(false);
                    }
                } else {
                    setStorageUser(accounts.result[0].name);
                    setEvent(false);
                    seteventAccount(true);
                    seteventAccounts(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, [accounts.isAuthenticated]);

    function eventLogOut() {
        setVisible(true);
    }
    function eventLogInAndRegister() {
        navigation.navigate(NameScreen.LOGIN);
    }
    function showAddresses() {
        if (accounts.isAuthenticated) {
            navigation.navigate(NameScreen.LIST_ADDRESS);
        } else {
            navigation.navigate(NameScreen.LOGIN);
        }
    }

    // console.log(accounts.result[0]._id);
    // console.log(accounts.result[0].uIdUserFacebook);
    // console.log(accounts.result[0].uIdUserGoogle);

    async function googleSignOut() {
        auth().signOut().then(async () => {
            await GoogleSignin.signOut();
            // await GoogleSignin.revokeAccess();
            dispatch(logOut());
            dispatch(clearErrors());
            dispatch(clearInvoice());
            dispatch(clearAllCart());
            dispatch(clearAddress());
            navigation.navigate(HomeName.ACCOUNT);
            setVisibleDisableds(false)
        }).catch((e) => {
            ToastAndroid.show('Đăng xuất thất bại', ToastAndroid.SHORT);
            console.log("------------", e);
        })

    }

    function onPressConfirm() {
        setVisibleDisableds(true);

        setTimeout(() => {
            try {
                if (accounts.result[0].uIdUserGoogle !== null) {
                    googleSignOut();
                } else if (accounts.result[0].uIdUserFacebook !== null) {
                    dispatch(logOut());
                    dispatch(clearErrors());
                    dispatch(clearInvoice());
                    dispatch(clearAllCart());
                    dispatch(clearAddress());
                    navigation.navigate(HomeName.ACCOUNT);
                    setVisibleDisableds(false)
                } else {
                    dispatch(logOut());
                    dispatch(clearErrors());
                    dispatch(clearInvoice());
                    dispatch(clearAllCart());
                    dispatch(clearAddress());
                    navigation.navigate(HomeName.ACCOUNT);
                    setVisibleDisableds(false)
                }
            } catch (e) {
                console.log(e);

            }
            // setVisibleDisableds(false)
        }, 1500)

    }
    function onPressCance() {
        setVisible(false);
    }
    function visibleDisabled() {
        setVisible(false);
    }

    function goToSurvey() {
        navigation.navigate(NameScreen.SCREENCHECKQUESTIONS);
    }

    function goToQuestion() {
        navigation.navigate(NameScreen.ANSWERQUESTIONS);
    }

    function goToShipCod() {
        navigation.navigate(NameScreen.ANSWERQUESTIONS);
    }
    function goToSizeProdut() {
        navigation.navigate(NameScreen.SCREENRULERSIZE);
    }

    function LoginAndRegister() {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.colums,
                    {
                        backgroundColor: ArrayColors._color_white,
                        flexDirection: 'row',
                    },
                ]}
                onPress={event ? eventLogInAndRegister : null}>

                <View style={{

                    flexDirection: "row", alignItems: 'center'
                }}>
                    {isShowImg && (
                        <View style={{
                            width: sizes._screen_width / 6.5,
                            height: sizes._screen_width / 6.5,
                            borderRadius: sizes._screen_width / 2,
                            borderColor: ArrayColors._color_black
                        }}  >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: sizes._screen_width / 7,
                                    height: sizes._screen_width / 7,
                                    borderRadius: sizes._screen_width / 2,

                                }}
                                source={{ uri: dataImg }}
                            />
                        </View>
                    )}
                    <Text style={styles.textBold}>{storageUser}</Text>
                </View>

            </Pressable>
        );
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
                    <Text style={styles.textLabel}>Cài đặt</Text>
                </View>
                <View style={{ width: sizes._42sdp }} />
            </View>
        );
    }
    function Renderview() {
        return (
            <View>
                {/* Tên user */}
                <View style={styles.spaceMediumY} key="user_st" />
                <View style={styles.item_container}>
                    <View style={styles.item_content}>
                        <LoginAndRegister />
                    </View>
                </View>

                {/* Phần 2 */}
                <View style={styles.spaceMediumY} />
                <View style={styles.item_container} key="location_st">
                    {/* Địa chỉ */}
                    <TouchableOpacity onPress={showAddresses} style={styles.item_content}>
                        <View style={styles.colums}>
                            <Text style={styles.textDefault}>Địa chỉ</Text>
                        </View>

                        <View style={styles.colums}>
                            <Icons
                                name="chevron-forward-outline"
                                size={24}
                                color={ArrayColors._color_black}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {eventAccounts ? (
                    <View style={styles.item_container} key="verif_acc_st">
                        {/* Xác thực tài khoản */}
                        <Divider />
                        {eventAuth ? (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(NameScreen.VERY_OTP);
                                    }}
                                    style={styles.item_content}>
                                    <View style={styles.colums}>
                                        <Text style={styles.textDefault}>{'Xác thực tài khoản'}</Text>
                                    </View>
                                    <View style={styles.colums}>
                                        <Icons
                                            name="chevron-forward-outline"
                                            size={24}
                                            color={ArrayColors._color_black}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Divider />
                            </>

                        ) : null}


                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(NameScreen.CHANGEPASS);
                            }}
                            style={styles.item_content}
                            key="change_pass_st">
                            <View style={styles.colums}>
                                <Text style={styles.textDefault}>Đổi mật khẩu</Text>
                            </View>

                            <View style={styles.colums}>
                                <Icons
                                    name="chevron-forward-outline"
                                    size={24}
                                    color={ArrayColors._color_black}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
                {/* Phần 3 */}
                <View style={styles.spaceMediumY} />
                <View style={styles.item_container} key="question_st">
                    {/*Đánh giá phản hồi*/}
                    <TouchableOpacity onPress={goToQuestion} style={styles.item_content}>
                        <View style={styles.colums}>
                            <Text style={styles.textDefault}>Câu hỏi</Text>
                        </View>
                        <View style={styles.colums}>
                            <Icons
                                name="chevron-forward-outline"
                                size={24}
                                color={ArrayColors._color_black}
                            />
                        </View>
                    </TouchableOpacity>
                    <Divider />
                    {/* Ứng dụng của tôi*/}
                    <TouchableOpacity onPress={goToSurvey} style={styles.item_content}>
                        <View style={styles.colums}>
                            <Text style={styles.textDefault}>Trung tâm khảo sát</Text>
                        </View>
                        <View style={styles.colums}>
                            <Icons
                                name="chevron-forward-outline"
                                size={24}
                                color={ArrayColors._color_black}
                            />
                        </View>
                    </TouchableOpacity>
                    <Divider />
                    {/* Giới thiệu */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NameScreen.INTRODUCE)}
                        style={styles.item_content}
                        key="about_st">
                        <View style={styles.colums}>
                            <Text style={styles.textDefault}>{'Giới thiệu'}</Text>
                        </View>
                        <View style={styles.colums}>
                            <Icons
                                name="chevron-forward-outline"
                                size={24}
                                color={ArrayColors._color_black}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Ship cod */}
                <View style={styles.spaceMediumY} />
                <TouchableOpacity
                    onPress={goToShipCod}
                    style={styles.item_content}
                    key="shipcod_st">
                    <View style={styles.colums}>
                        <Text style={styles.textDefault}>Ship COD</Text>
                    </View>
                    <View style={styles.colums}>
                        <Icons
                            name="chevron-forward-outline"
                            size={24}
                            color={ArrayColors._color_black}
                        />
                    </View>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                    onPress={goToSizeProdut}
                    style={styles.item_content}
                    key="size_st">
                    <View style={styles.colums}>
                        <Text style={styles.textDefault}>Hướng dẫn kích thước</Text>
                    </View>
                    <View style={styles.colums}>
                        <Icons
                            name="chevron-forward-outline"
                            size={24}
                            color={ArrayColors._color_black}
                        />
                    </View>
                </TouchableOpacity>
                {/* Đổi mật khẩu */}
                {eventAccount ? (
                    <View>
                        {/* Đăng xuất */}
                        <TouchableOpacity
                            onPress={eventLogOut}
                            style={{
                                backgroundColor: ArrayColors._color_white,
                                marginVertical: sizes._18sdp,
                            }}
                            key="logout_st">
                            <View
                                style={{
                                    width: sizes._screen_width,
                                    height: sizes._72sdp,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={styles.title_tochable}>{'Đăng xuất'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.mContainer}>
            <AppHeader content customContent={<HeaderContent />} />
            <View style={styles.mContainerBody}>
                <FlatList
                    renderItem={null}
                    data={null}
                    ListFooterComponent={Renderview}
                    listKey="screen_settings"
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                />
                {/* version */}
                <View style={styles.version}>
                    <Text style={styles.text_version}>
                        {'Phiên bản V\t' + pkg.version}
                    </Text>
                </View>
                <ModalConfirm
                    onPressCance={onPressCance}
                    onPressConfirm={onPressConfirm}
                    visibleDisabled={visibleDisabled}
                    visible={visible}
                    visibleDisableds={visibleDisableds}
                />
            </View>
        </SafeAreaView>
    );
};

export default ScreensSettings;

const styles = StyleSheet.create({
    mContainer: {
        flex: 1,
        backgroundColor: ArrayColors._color_white_gray,
    },
    mContainerBody: {
        flex: 1,
        backgroundColor: ArrayColors.darkGrayAccount,
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
        fontWeight: '700',
        fontFamily: 'OpenSans-SemiBold',
        color: ArrayColors._color_black,
        fontSize: sizes._22sdp,
    },
    textBold: {
        fontSize: sizes._20sdp,
        fontWeight: '600',
        fontFamily: 'OpenSans-SemiBold',
        color: ArrayColors._color_black,
    },
    textDefault: {
        fontSize: sizes._18sdp,
        fontWeight: '400',
        fontFamily: 'OpenSans-Regular',
        color: ArrayColors._color_black,
    },
    colums: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {
        width: sizes._42sdp,
        height: sizes._42sdp,
        borderRadius: sizes._42sdp / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_container: {
        backgroundColor: ArrayColors._color_white,
    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizes._18sdp,
        height: sizes._72sdp,
        backgroundColor: ArrayColors._color_white,
    },
    spaceMediumY: {
        height: sizes._18sdp,
    },
    spaceSmallY: {
        height: sizes._10sdp,
    },
    title_user: {
        fontSize: sizes._20sdp,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-SemiBold',
        lineHeight: sizes._32sdp,
        color: ArrayColors._color_black,
    },
    title_tochable: {
        fontSize: sizes._20sdp,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-SemiBold',
        lineHeight: sizes._32sdp,
        color: ArrayColors.ruby,
    },
    item_tochable: {
        width: '100%',
        alignItems: 'center',
    },
    version: {
        alignItems: 'center',
        height: sizes._72sdp,
        justifyContent: 'center',
    },
    text_version: {
        fontSize: sizes._18sdp,
        fontWeight: '400',
        fontFamily: 'OpenSans-Regular',
        color: ArrayColors._color_black,
    },
});
