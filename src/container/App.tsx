import { StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import TabNavigator from '../container/navigators/TabNavigator';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import RNExitApp from 'react-native-exit-app';
import sizes from '../res/sizes/sizes';

export default function App() {
  const { mContainer }: any = styles;
  const [checkNetwork, setCheckNetwork] = React.useState<any>("offline");


  React.useEffect(() => {

    InternetCheck_kar()

  }, [checkNetwork])
  function InternetCheck_kar() {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected === true) {
        setCheckNetwork("online")

      } else {
        setCheckNetwork("offline")
      }
    });
  }
  if (checkNetwork === "online") {
    return (
      <View style={mContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <TabNavigator />
        {/* <ServicersNotification /> */}
      </View>
    );
  } else if (checkNetwork === "offline") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={{ width: sizes._screen_width / 3, height: sizes._screen_width / 3, marginTop: sizes._10sdp }}>
            <LottieView
              autoPlay
              loop
              source={require('../assets/lottie/internet.json')}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: sizes._24sdp,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginHorizontal: sizes._20sdp,
                marginVertical: sizes._10sdp,
                fontWeight: 'bold',
              }}>
              Không có kết nối internet vui lòng kiểm tra lại kết nối
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              RNExitApp.exitApp();
            }}
            style={{
              width: sizes._screen_width - sizes._40sdp,
              marginHorizontal: 20,
              marginVertical: 10,
              height: 48,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Thoát </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
});
