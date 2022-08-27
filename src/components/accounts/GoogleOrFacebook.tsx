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

                {/* <TouchableOpacity
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: sizes._48sdp,
                        height: sizes._48sdp,
                        borderWidth: 1,
                        borderColor: ArrayColors._color_black_light,
                        borderRadius: sizes._48sdp / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: sizes._12sdp,
                    }}>
                    <Image
                        source={Images.ic_google}
                        style={{
                            width: sizes._32sdp,
                            height: sizes._32sdp,
                        }}
                    /> */}
                {/* </TouchableOpacity> */}
                <GoogleSigninButton
                    style={{ width: sizes._screen_width / 2, height: sizes._58sdp }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={props.eventLoginGoogle}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: ArrayColors._color_facebook,
                        width: sizes._screen_width / 2 - sizes._10sdp,
                        height: sizes._48sdp,
                        borderWidth: 1,
                        borderColor: ArrayColors._color_facebook,
                        borderRadius: sizes._4sdp,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: sizes._6sdp,
                    }}>
                    <Image
                        source={Images.ic_facebook}
                        style={{
                            width: sizes._32sdp,
                            height: sizes._32sdp,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GoogleOrFacebook

const styles = StyleSheet.create({})