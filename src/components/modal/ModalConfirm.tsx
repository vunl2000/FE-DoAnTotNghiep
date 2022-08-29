import {
  StyleSheet,
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import LottieView from 'lottie-react-native';
interface Props {
  onPressConfirm?: () => void;
  onPressCance?: () => void;
  visible?: boolean;
  visibleDisabled?: () => void;
  visibleDisableds?: boolean;

}

const ModalConfirm = (props: Props) => {
  function ViewLinearLayout() {
    return (
      <>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: ArrayColors._color_white,
            borderBottomColor: ArrayColors.blue_item_catory,
            borderBottomWidth: sizes._1sdp,
          }}>
          <Text style={{ textAlign: 'center', marginVertical: sizes._12sdp }}>
            Bạn có chắc chắn muốn đăng xuất?
          </Text>
        </View>

        <TouchableOpacity
          onPress={props.onPressConfirm}
          style={styles.containerView}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: sizes._20sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              lineHeight: sizes._32sdp,
              color: ArrayColors.ruby,
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: sizes._screen_width,
            height: sizes._1sdp,
            backgroundColor: ArrayColors.blue_item_catory,
          }}></View>
        <TouchableOpacity
          onPress={props.onPressCance}
          style={styles.containerViewCl}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: sizes._20sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              lineHeight: sizes._32sdp,
              color: ArrayColors._color_black_gray,
            }}>
            Huỷ bỏ
          </Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={props.visible}>
      {props.visibleDisableds ? <View style={{
        width: sizes._68sdp,
        height: sizes._68sdp,
        backgroundColor: '#ffffff',
        borderRadius: sizes._10sdp,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        position: 'absolute',
        left: sizes._screen_width / 2.5,
        right: sizes._screen_width / 2.5,
        top: sizes._screen_height / 3
      }}>
        <LottieView
          source={require('../../assets/lottie/fashion_app_loading.json')}
          autoPlay
          loop
        />
      </View> : null}


      <TouchableWithoutFeedback onPress={props.visibleDisabled}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: ArrayColors._color_gray_translucenLoading,
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              width: sizes._screen_width,
              backgroundColor: ArrayColors._color_white_black,
            }}>
            <ViewLinearLayout />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  containerView: {
    width: sizes._screen_width,
    height: sizes._52sdp,
    backgroundColor: ArrayColors._color_white,
    justifyContent: 'center',
    marginBottom: sizes._12sdp,
  },
  containerViewCl: {
    width: sizes._screen_width,
    height: sizes._52sdp,
    backgroundColor: ArrayColors._color_white,
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
  },
});
