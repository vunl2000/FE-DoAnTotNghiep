import React from 'react';
import {ToastAndroid} from 'react-native';

export const showToast = (msg: string | any) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};
