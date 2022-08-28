

// import {
//     AllDispatchProps,
//     REG_LOADING,
//     USER_GMAIL_SUCCES,
//     USER_GMAIL_FAIL,
//     CLEAR_ERRORS_GMAIL,
//     USER_GMAIL_CL
// } from './types';

// import { API_URL_GENERATE_OTP, API_URL_REGISTER_USERS } from '@env';
// import axios from 'axios';
// import { returnErrorss } from './errActionsCfActions';

// export const userConfirmEmail =
//     (email: any) =>
//         async (dispatch: AllDispatchProps) => {
//             dispatch({ type: REG_LOADING, payload: null });
//             var data = JSON.stringify({
//                 email: email
//             });
//             console.log(data);

//             var config = {
//                 method: 'post',
//                 url: 'http://52.141.50.48:3000/account-user/gmail-authentication-user',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 data: data
//             };

//             axios(config)
//                 .then(function (response) {
//                     let result: any = response.data;
//                     if (result.code === 200) {
//                         console.log('okee111111e');
//                         dispatch({ type: USER_GMAIL_SUCCES, payload: result.user });
//                         return 1;
//                     } 
//                         dispatch({ type: USER_GMAIL_CL, payload: null });
//                     return -1;
//                 })
//                 .catch(function (error) {
//                     dispatch({ type: USER_GMAIL_CL, payload: null });
//                     console.log("99999999999999999", error.response.data);
//                     dispatch(
//                         returnErrorss(
//                             error.response.data,
//                             error.response.status,
//                             "USER_GMAIL_FAIL"
//                         ),
//                     );
//                     return -1;
//                 });
//         };


// export const genOtp =
//     (userEmail: any, userID: any) =>
//         async (dispatch: AllDispatchProps, getState: any) => {
//             const mFormData = JSON.stringify({
//                 userEmail: userEmail.toString(),
//                 userID: userID.toString(),
//             });
//             const config = await {
//                 method: 'POST',
//                 url: API_URL_GENERATE_OTP,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 data: mFormData,
//             };

//             console.log(mFormData);


//             await axios(config)
//                 .then(response => {
//                     let result: any = response.data;
//                     if (result.code === 200) {
//                         dispatch({ type: USER_GMAIL_CL, payload: null });
//                         return true;
//                     }
//                     return false;
//                 })
//                 .catch(error => {
//                     return false;
//                 });

//         }

// export function removerConfirmEmail() {
//     return {
//         type: USER_GMAIL_CL,
//         payload: null,
//     };
// }