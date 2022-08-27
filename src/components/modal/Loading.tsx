import {StyleSheet, Modal, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import LottieView from 'lottie-react-native';
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
            <LottieView
              source={require('../../assets/lottie/fashion_app_loading.json')}
              autoPlay
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
