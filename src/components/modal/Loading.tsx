import {StyleSheet, Modal, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Images from '../../res/require/Images';
import Svg from 'react-native-svg';

const Loading = () => {
  const mapText = [
    Images.icons8_bra_100,
    Images.icons8_dress_100,
    Images.icons8_hanger_100,
    Images.icons8_lipstick_100,
    Images.icons8_skirt_100,
    Images.icons8_tshirt_100,
    Images.icons8_women_shoe_side_view_100,
  ];

  const [images, setImages] = React.useState(Images.ic_account);
  const [count, setCount] = React.useState<string | any>(0);
  const [time, setTime] = React.useState<string | any>(700);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      if (mapText.length <= count) {
        setCount(0);
        setImages(mapText[0]);
      } else {
        setCount(count + 1);
        setImages(mapText[count]);

        console.log('700', count);
      }
    }, 600);
  }, [count]);

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={true}>
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
            <Image
              style={{
                width: sizes._48sdp,
                height: sizes._48sdp,
                resizeMode: 'contain',
              }}
              source={images}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
