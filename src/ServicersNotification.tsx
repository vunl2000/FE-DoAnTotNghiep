import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import notifee, { AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deviceToken } from './store/actions/deviceFireBaseToken';

const ServicersNotification = ({ navigation }: any) => {
    const isCheckDevice = useSelector((state: any) => state.deviceCall.deviceCall);
    const [firebaseToken, setFirebaseToken] = React.useState<string | any>("")
    const dispatch: any = useDispatch();
    console.log(isCheckDevice);

    React.useEffect(() => {

        if (!isCheckDevice) {
            pushFirebaseToen();
            console.log("okkkkkkkkkkkkkkkkkkkkkkkk");

        }
        getFCMToken();
        //  onNotificationOpenedApp();
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
                setFirebaseToken(token)
            });


    };
    // const onNotificationOpenedApp = () => {

    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         navigation.navigate("DetailProduct")
    //         console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    //     })
    // }

    async function DisplayNotification(remoteMessage: any) {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: `<p style="color: #4caf50;"><b>${remoteMessage.notification.title}</span></p></b></p> &#128576;`,
            // body: remoteMessage.notification.body,
            android: {
                channelId,
                // smallIcon: "ic_launcher",
                style: { type: AndroidStyle.BIGTEXT, text: remoteMessage.notification.body }, // optional, defaults to 'ic_launcher'.
                smallIcon: 'ic_launcher',
            },
        });
    }

    async function pushFirebaseToen() {
        console.log("---------------------");
        
        var data = JSON.stringify({ tokenPush: firebaseToken });
        var config = {
            method: 'post',
            url: 'http://52.141.50.48:3000/api/user-send-token/create-token-notification',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                dispatch(deviceToken());
            })
            .catch(function (error: any) {
                console.log(error);
            });


    }

    return null

}

export default ServicersNotification

