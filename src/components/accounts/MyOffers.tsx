import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
type Props = {
  mStringText?: any;
  mStringTitles?: any;
  mImager?: any;
  textOrImg?: boolean;
  styleImg?: any;
  onPress?: () => void;
};

const MyOffers = (props: Props) => {
  
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? ArrayColors.light
            : ArrayColors._color_white,
        },
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: sizes._12sdp,
          alignSelf: 'center',
        },
      ]}
    >
      <View>
        {props.textOrImg ? (
          <Text style={styles.mStyleStringText}>{props.mStringText}</Text>
        ) : (
          <Image
            style={{width: sizes._20sdp, height: sizes._20sdp}}
            resizeMode="contain"
            source={props.mImager}></Image>
        )}
      </View>

      <View style={{marginVertical: sizes._12sdp}}>
        <Text style={styles.mStyleText}>{props.mStringTitles}</Text>
      </View>
    </Pressable>
  );
};

export default MyOffers;

const styles = StyleSheet.create({
  mStyleStringText: {
    fontSize: sizes._16sdp,
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_red,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mStyleText: {
    // lineHeight: sizes._25sdp,
    fontSize: sizes._16sdp,
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    textAlign: 'center',
    fontWeight: 'normal',
  },
});
