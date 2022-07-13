import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Images from '../../res/require/Images';
type Props = {}

const GoogleOrFacebook = (props: Props) => {
  return (
    <View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: sizes._48sdp,
      }}>
      <View
        style={{
          width: '30%',
          height: sizes._1sdp,
          backgroundColor: ArrayColors._color_gray_text,
        }}></View>
      <Text
        style={{
          color: ArrayColors._color_gray_pale,
          fontSize: sizes._16sdp,
          fontWeight: 'bold',
          fontFamily: 'OpenSans-SemiBold',
        }}>
        Hoặc tham gia
      </Text>
      <View
        style={{
          width: '30%',
          height: sizes._1sdp,
          backgroundColor: ArrayColors._color_gray_text,
        }}></View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: sizes._24sdp,
      }}>
      <TouchableOpacity
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
          // marginRight: sizes._10sdp,
        }}>
        <Image
          source={Images.ic_google}
          style={{
            width: sizes._32sdp,
            height: sizes._32sdp,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: ArrayColors._color_facebook,
          width: sizes._48sdp,
          height: sizes._48sdp,
          borderWidth: 1,
          borderColor: ArrayColors._color_facebook,
          borderRadius: sizes._48sdp / 2,
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