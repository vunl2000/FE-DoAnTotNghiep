import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import TabNavigator from '../container/navigators/TabNavigator';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import RNExitApp from 'react-native-exit-app';
import sizes from '../res/sizes/sizes';
import ArrayColors from '../res/colors/ArrayColors';
import ButtonSub from '../components/button/ButtonSub';

export default function App() {
  const {mContainer}: any = styles;
  const netInfo = useNetInfo();
  const [checkNetwork, setCheckNetwork] = React.useState<any>(true);

  React.useEffect(() => {
    if (netInfo && netInfo.isConnected === false) {
      setCheckNetwork(false);
    } else {
      setCheckNetwork(true);
    }
  }, [netInfo]);

  const finishApp = () => {
    RNExitApp.exitApp();
  };

  const NoInterNet = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: sizes._screen_width / 3,
              height: sizes._screen_width / 3,
              marginTop: sizes._10sdp,
            }}>
            <LottieView
              autoPlay
              loop
              source={require('../assets/lottie/internet.json')}
            />
          </View>
          <View>
            <Text
              style={{
                color: ArrayColors._color_black,
                fontSize: sizes._24sdp,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: 'OpenSans-Bold',
                marginHorizontal: sizes._20sdp,
                marginVertical: sizes._10sdp,
                fontWeight: 'bold',
              }}>
              Có vẻ như thiết bị của bạn không được kết nối với Internet.
            </Text>
          </View>
          <View
            style={{
              width: sizes._screen_width,
              paddingHorizontal: sizes._18sdp,
            }}>
            <ButtonSub
              size="lager"
              bgColor="black"
              value="Thoát"
              onPress={finishApp}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={mContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {checkNetwork ? <TabNavigator /> : <NoInterNet />}
      {/* <ServicersNotification /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
});
