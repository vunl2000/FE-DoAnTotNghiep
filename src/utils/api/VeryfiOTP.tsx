import axios from 'axios';
import {API_URL_VERYFI_OTP} from '@env';

export function verifyOTP(userEmail: any, userOTP: any, userID: any) {
  const mFormData = JSON.stringify({
    userEmail,
    userOTP,
    userID,
  });
  const config = {
    method: 'POST',
    url: API_URL_VERYFI_OTP,
    headers: {
      'Content-Type': 'application/json',
    },
    data: mFormData,
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}
