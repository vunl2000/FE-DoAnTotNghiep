import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import { Badge } from 'react-native-paper';
type Props = {
    mStringText?: any;
    mStringTitles?: any;
    mImager?: any;
    textOrImg?: boolean;
    styleImg?: any;
    onPress?: () => void;
    styleContent?: any;
    badge?: any;
};

const MyOffers = (props: Props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? ArrayColors.light
                        : ArrayColors._color_white,
                },
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: sizes._10sdp,
                },
                props.styleContent,
            ]}>
            {props.badge ? (
                <Badge style={styles.badge} size={sizes._18sdp}>
                    {props.badge}
                </Badge>
            ) : null}
            <View>
                {props.textOrImg ? (
                    <Text style={styles.mStyleStringText}>{props.mStringText}</Text>
                ) : (
                    <Image
                        style={{ width: sizes._26sdp, height: sizes._26sdp }}
                        resizeMode="contain"
                        source={props.mImager}></Image>
                )}
            </View>

            <View style={{ marginVertical: sizes._10sdp }}>
                <Text style={styles.mStyleText}>{props.mStringTitles}</Text>
            </View>
        </Pressable>
    );
};

export default MyOffers;

const styles = StyleSheet.create({
    mStyleStringText: {
        fontSize: sizes._14sdp,
        fontFamily: 'OpenSans-Regular',
        color: ArrayColors._color_red,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    mStyleText: {
        fontSize: sizes._14sdp,
        fontFamily: 'OpenSans-SemiBold',
        color: ArrayColors._color_black,
        textAlign: 'center',
        fontWeight: 'normal',
    },
    badge: {
        position: 'absolute',
        top: sizes._2sdp,
        right: sizes._30sdp,
    },
});
