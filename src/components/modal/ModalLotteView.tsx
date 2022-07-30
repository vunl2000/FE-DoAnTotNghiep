import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import LottieView from 'lottie-react-native';
type Props = {
  showDiaLog?: boolean;
  onPress?: () => void;
};

const ModalLotteView = (props: Props) => {
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={props.showDiaLog}>
      <View style={styles.mContainerModal}>
        <View style={styles.mContainerModalView}>
          <Text style={styles.mTextLabel}>Bạn muốn tìm gì ?</Text>
          <View style={styles.mStyleMic}>
            <LottieView
              source={require('../../assets/lottie/microphone.json')}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.mTextCancel} onPress={props.onPress}>
            Hủy
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLotteView;

const styles = StyleSheet.create({
  mContainerModal: {
    flex: 1,
    backgroundColor: ArrayColors._color_gray_translucenLoading,
    justifyContent: 'center',
  },
  mContainerModalView: {
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
    marginHorizontal: sizes._48sdp,
    borderRadius: sizes._6sdp,
  },
  mStyleMic: {
    width: sizes._screen_width / 4.5,
    height: sizes._screen_width / 4.5,
  },
  mTextCancel: {
    fontWeight: 'bold',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  mTextLabel: {
    fontSize: sizes._22sdp,
    fontWeight: 'bold',
    color: ArrayColors._color_black,
    marginTop: sizes._12sdp,
  },
});
