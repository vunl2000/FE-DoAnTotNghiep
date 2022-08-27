import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {Divider} from 'react-native-paper';
import {showToast} from '../modal/ToastCustom';
import Geolocation from 'react-native-geolocation-service';

type Props = {};
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Yêu cầu truy cập vị trí',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      Geolocation.getCurrentPosition(
        (position: any) => {
          console.log(position);
        },
        error => {
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Pay = (props: Props) => {
  React.useEffect(() => {
    requestCameraPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.textSub, {marginBottom: sizes._8sdp}]}>
        Thanh toán
      </Text>
      <View style={styles.rowContent}>
        <View
          style={[
            styles.containerCheckbox,
            {backgroundColor: ArrayColors._color_black},
          ]}>
          <MaterialCommunityIcons
            name="check-bold"
            size={sizes._20sdp}
            color={ArrayColors._color_white}
          />
        </View>
        <View style={[styles.rowContent, {marginLeft: sizes._16sdp}]}>
          <Image
            source={image.ship_cod}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={[styles.textDefault, {marginLeft: sizes._16sdp}]}>
            Thanh toán khi nhận hàng
          </Text>
        </View>
      </View>
      <Divider />

      {/* <View style={[styles.rowContent, {opacity: 0.4}]}>
        <TouchableWithoutFeedback
          onPress={() => showToast('Chức năng đang được phát triển!')}>
          <View
            style={[
              styles.containerCheckbox,
              {backgroundColor: ArrayColors._color_white},
            ]}>
            <MaterialCommunityIcons
              name="check-bold"
              size={sizes._20sdp}
              color={ArrayColors._color_white}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.rowContent, {marginLeft: sizes._16sdp}]}>
          <Image
            source={image.credit_card}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={[styles.textDefault, {marginLeft: sizes._16sdp}]}>
            Thẻ tín dụng/ghi nợ
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._8sdp,
  },
  containerCheckbox: {
    width: sizes._26sdp,
    height: sizes._26sdp,
    borderRadius: sizes._26sdp / 2,
    borderWidth: sizes._2sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes._72sdp,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  img: {
    width: sizes._50sdp,
    height: sizes._50sdp,
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
});
