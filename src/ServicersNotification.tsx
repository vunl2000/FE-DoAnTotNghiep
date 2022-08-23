import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
const ServicersNotification = () => {
  React.useEffect(() => {
    getFCMToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [])

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('fireBaseToken', token);
      });


  };

  async function DisplayNotification(remoteMessage: any) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        // smallIcon: require("./config/Logo_Thabet_GG.png"), // optional, defaults to 'ic_launcher'.
      },

    });
    // console.log(title);
  }

  return null

}

export default ServicersNotification

