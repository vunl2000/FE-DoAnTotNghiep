import axios from 'axios';
import {API_URL_GENERATE_OTP} from '@env';

export async function GenerateOTP(userEmail: any, userID: any) {
  const mFormData = JSON.stringify({
    userEmail,
    userID,
  });
  const config = await {
    method: 'POST',
    url: API_URL_GENERATE_OTP,
    headers: {
      'Content-Type': 'application/json',
    },
    data: mFormData,
  };

  await axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log('--------------------------', error);
    });
}
