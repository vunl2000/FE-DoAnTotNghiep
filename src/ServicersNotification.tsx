// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import notifee, { AndroidStyle } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { deviceToken } from './store/actions/deviceFireBaseToken';
// import { checkNotifications } from './store/actions/initialRouteAction';
// import { useNavigation } from '@react-navigation/native';
// const ServicersNotification = ({ navigation }: any) => {
//     const isCheckDevice = useSelector((state: any) => state.deviceCall.deviceCall);
//     const dispatch: any = useDispatch();
//     const [initialRoute, setInitialRoute] = React.useState<any | string>('AppContainer');

//     // React.useEffect(() => {
//     //     onNotificationOpenedApp();
//     //     getFCMToken();
//     //     const unsubscribe = messaging().onMessage(async remoteMessage => {
//     //         // //console.log('remoteMessage', JSON.stringify(remoteMessage));
//     //         DisplayNotification(remoteMessage);
//     //         // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     //     });

//     //     messaging()
//     //         .getInitialNotification()
//     //         .then((remoteMessage: any) => {
//     //             if (remoteMessage) {
//     //                 //console.log(
//     //                     'Notification caused app to open from quit state:',
//     //                     remoteMessage.notification,
//     //                 );
//     //                 // setInitialRoute()
//     //                 //dispatch(checkNotifications(remoteMessage.data.type));
//     //             }
//     //             //console.log(
//     //                 'Notification caused app to open from quit state:',
//     //                 remoteMessage.data,
//     //             );
//     //         });

//     //     return unsubscribe;
//     // }, [])

//     // const getFCMToken = () => {
//     //     messaging()
//     //         .getToken()
//     //         .then(token => {
//     //             //console.log('fireBaseToken', token);
//     //             // setFirebaseToken(token)
//     //             if (!isCheckDevice) {
//     //                 pushFirebaseToen(token);

//     //             }

//     //         });
//     // };
//     // const onNotificationOpenedApp = () => {

//     //     //console.log("onNotificationOpenedApp");

//     //     messaging().onNotificationOpenedApp(remoteMessage => {

//     //         // navigation.navigate("ScreenNotification")

//     //         //console.log(remoteMessage);

//     //     })
//     // }

//     // async function DisplayNotification(remoteMessage: any) {
//     //     // Create a channel
//     //     const channelId = await notifee.createChannel({
//     //         id: 'default',
//     //         name: 'Default Channel',
//     //     });

//     //     // Display a notification
//     //     await notifee.displayNotification({
//     //         title: `<p style="color: #4caf50;"><b>${remoteMessage.notification.title}</span></p></b></p> &#128576;`,
//     //         // body: remoteMessage.notification.body,
//     //         android: {
//     //             channelId,
//     //             style: { type: AndroidStyle.BIGTEXT, text: remoteMessage.notification.body }, // optional, defaults to 'ic_launcher'.
//     //             smallIcon: 'ic_launcher',
//     //         },
//     //     });
//     //     if (remoteMessage.data.type != "") {
//     //         //dispatch(checkNotifications(remoteMessage.data.type));
//     //     }

//     //     // //console.log(
//     //     //     'Notification caused app to open from quit state:',
//     //     //     remoteMessage.data,
//     //     // );

//     // }
//     // async function pushFirebaseToen(token: any) {
//     //     const data = JSON.stringify({ tokenPush: token });
//     //     const config = {
//     //         method: 'post',
//     //         url: 'http://52.141.50.48:3000/api/user-send-token/create-token-notification',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         data: data
//     //     };
//     //     //console.log(data);
//     //     await axios(config)
//     //         .then(function (response: any) {
//     //             //console.log(JSON.stringify(response.data));
//     //             dispatch(deviceToken());
//     //         })
//     //         .catch(function (error: any) {
//     //             //console.log(error);
//     //         });
//     // }
//     return null
// }
// export default ServicersNotification
