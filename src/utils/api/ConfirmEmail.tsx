// import axios from 'axios';
// import { API_URL_GENERATE_OTP } from '@env';
// import { GenerateOTP } from './GenerateOTP';
// import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, ToastAndroid } from 'react-native'

// export const userConfirmEmail =
//     (email: any) => {
//         var data = JSON.stringify({
//             email: email
//         });
//         console.log(data);

//         var config = {
//             method: 'post',
//             url: 'http://52.141.50.48:3000/account-user/gmail-authentication-user',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         };

//         axios(config)
//             .then(function (response) {
//                 console.log(response.data);
//                 if (response.data.code === 200) {
//                     if (response.data.user._id != null && response.data.user.email != null) {

//                         GenerateOTP(response.data.user.email, response.data.user._id)

//                         return response
//                     } else {
//                         ToastAndroid.show(
//                             'Đã có lỗi trong quá trình xử lý',
//                             ToastAndroid.SHORT,
//                         );
//                         return response
//                     }
//                 }

//             })
//             .catch(function (error) {
//                 console.log(error.response.data);
//                 if (error.response.data.code === 400) {
//                     ToastAndroid.show(
//                         'Email không có trong hệ thống',
//                         ToastAndroid.SHORT,
//                     );
//                 } else {
//                     ToastAndroid.show(
//                         'Đã có lỗi trong quá trình xử lý',
//                         ToastAndroid.SHORT,
//                     );
//                 }


//             });

//     };
