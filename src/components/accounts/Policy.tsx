import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
type Props = {}

const Policy = (props: Props) => {
  return (
    <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: sizes._32sdp,
    }}>
    <Text
      style={{
        textAlign: 'center',
        color: ArrayColors._color_gray_pale,
        fontSize: sizes._15sdp,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-SemiBold',
        lineHeight: sizes._25sdp,
      }}>
      Bằng cách đăng nhập vào tài khoản của bạn, bạn đồng ý với Chính sách
      bảo mật {`&`} Cookie và Điều khoản và Điều kiện của chúng tôi.
    </Text>
  </View>
  )
}

export default Policy

const styles = StyleSheet.create({})