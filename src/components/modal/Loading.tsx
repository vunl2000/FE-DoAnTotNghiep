import {StyleSheet, Modal, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Images from '../../res/require/Images';
import {WebView} from 'react-native-webview';
interface Props {
  visible?: boolean;
}

const Loading = (props: Props) => {
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={props.visible}>
      <View
        style={{
          backgroundColor: ArrayColors._color_gray_translucenLoading,
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'column'}}>
          <View
            style={{
              width: sizes._68sdp,
              height: sizes._68sdp,
              backgroundColor: '#ffffff',
              borderRadius: sizes._10sdp,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <WebView
              scalesPageToFit={false}
              originWhitelist={['*']}
              domStorageEnabled={true}
              source={{
                uri: 'https://static.chiccdn.com/pwa/dist/static/img/PureIconLoading.433f3ebe.svg',
              }}
              style={{
                width: sizes._48sdp,
                height: sizes._48sdp,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
