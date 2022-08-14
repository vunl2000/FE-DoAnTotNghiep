import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import TitleHome from '../title/TitleHome';
type Props = {
    onPress?: () =>void;
};

const TextForgotPassword = (props: Props) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={styles.mContainerText}>
            <TitleHome
                title="Quên mật khẩu?"
                style={styles.mStyleITextRsPassword}></TitleHome>
        </TouchableOpacity>
    );
};

export default TextForgotPassword;

const styles = StyleSheet.create({
    mContainerText: {
        marginTop: sizes._26sdp,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    mStyleITextRsPassword: {
        fontWeight: 'bold',
        fontFamily: 'OpenSans-SemiBold',
        color: ArrayColors._color_black,
    },
});
