import {Linking, Platform} from 'react-native';

export const onStoreApp = () => {
  if (Platform.OS === 'android') {
    Linking.openURL(
      'https://play.google.com/store/search?q=Shein&c=apps&hl=vi&gl=US',
    ).catch(err => console.log('err', err));
  } else if (Platform.OS === 'ios') {
    Linking.openURL(
      'https://apps.apple.com/vn/app/shein-fashion-shopping-online/id878577184',
    ).catch(err => console.log('err', err));
  }
};
