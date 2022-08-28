import axios from 'axios';
import { API_URL_GENERATE_OTP } from '@env';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React from 'react'

export async function GenerateOTP(userEmail: any, userID: any) {
  const mFormData = JSON.stringify({
    userEmail,
    userID,
  });
  const config = await {
    method: 'POST',
    // url: API_URL_GENERATE_OTP,
    url :"http://52.141.50.48:3000/account-user/get-gen-otp",
    headers: {
      'Content-Type': 'application/json',
    },
    data: mFormData,
  };

  console.log(mFormData);


  await axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
      if (response.data.code === 200) {
        ToastAndroid.show(
          'Mã OTP đã được gửi đến Gmail của bạn',
          ToastAndroid.SHORT,
        );
      }
    })
    .catch(error => {
      if (error.response.data.code === 400) {
        ToastAndroid.show(
          'Đã có lỗi trong quá trình xử lý',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          'Đã có lỗi trong quá trình xử lý',
          ToastAndroid.SHORT,
        );
      }
    });
}
