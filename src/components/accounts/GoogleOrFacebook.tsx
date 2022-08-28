import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Images from '../../res/require/Images';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
type Props = {
    eventLoginGoogle?: () => void
    eventLoginFaceBook?: () => void
}

const GoogleOrFacebook = (props: Props) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        width: '10%',
                        height: sizes._1sdp,
                        backgroundColor: ArrayColors._color_gray_text,
                    }}></View>
                <Text
                    style={{
                        color: ArrayColors._color_gray_pale,
                        fontSize: sizes._16sdp,
                        fontWeight: 'bold',
                        marginHorizontal: sizes._12sdp,
                        fontFamily: 'OpenSans-SemiBold',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    Hoặc tham gia
                </Text>
                <View
                    style={{
                        width: '10%',
                        height: sizes._1sdp,
                        backgroundColor: ArrayColors._color_gray_text,
                    }}></View>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: sizes._24sdp,
                }}>
                <GoogleSigninButton
                    style={{ width: sizes._screen_width / 2, height: sizes._58sdp, marginHorizontal: sizes._16sdp }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={props.eventLoginGoogle}
                />
                <TouchableOpacity
                    onPress={props.eventLoginFaceBook}
                    style={{
                        backgroundColor: ArrayColors._color_facebook,
                        width: sizes._screen_width / 2 - sizes._10sdp,
                        height: sizes._48sdp,
                        borderWidth: 1,
                        borderColor: ArrayColors._color_facebook,
                        borderRadius: sizes._4sdp,
                        alignItems: 'center',
                        marginHorizontal: sizes._6sdp,
                        flexDirection: 'row',
                    }}>
                    <View style={{
                        width: sizes._46sdp,
                        height: sizes._46sdp,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: sizes._3sdp,
                        backgroundColor: ArrayColors._color_white
                    }}>
                        <Image
                            source={Images.ic_facebook}
                            style={{
                                width: sizes._32sdp,
                                height: sizes._32sdp,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            alignItems: 'center',
                            color: ArrayColors._color_white,
                            fontWeight: "bold",
                            marginHorizontal: sizes._3sdp,
                            width: "100%",
                        }}
                    >Sign in with FaceBook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GoogleOrFacebook

const styles = StyleSheet.create({})