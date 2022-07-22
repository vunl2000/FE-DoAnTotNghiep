import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderShown from '../../../../components/accounts/HeaderShown';
import AppHeader from '../../../../components/header/AppHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import ArrayColors from '../../../../res/colors/ArrayColors';
import Loading from '../../../../components/modal/Loading';
import Button from '../../../../components/accounts/Button';
import Input from '../../../../components/accounts/Input';
import Policy from '../../../../components/accounts/Policy';
import GoogleOrFacebook from '../../../../components/accounts/GoogleOrFacebook';
import ImagePicker from 'react-native-image-picker';
type Props = {};

const ScreenRegisterDetail = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState<string | any>(false);
  const [selectedImage, setSelectedImage] = React.useState<string | any>();

  function onBackPress() {
    navigation.goBack();
  }

  function handleRegister() {
    navigation.navigate('ScreenVeryfiOTP');
  }
  function eventLogin() {
    navigation.navigate('ScreenLogin');
  }
  function eventUpLoadFileImager() {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      response => {
        if (response.error) {
          console.log('image error');
          console.log(response.error);
          setSelectedImage(Images.user_no_bgr);
        } else {
          console.log('Image: ' + response.uri);
          setSelectedImage({uri: response.uri});
        }
      },
    );
  }

  React.useEffect(() => {
    try {
      if (selectedImage.uri !== undefined) {
        // console.log(selectedImage.uri);
        setSelectedImage(selectedImage);
        console.log('useEffect: ' + selectedImage);
      } else {
        setSelectedImage(Images.user_no_bgr);
      }
    } catch (e) {
      console.log(e);
    }
  }, [selectedImage]);

  function renderContent() {
    return (
      <>
        <View
          style={{
            width: sizes._screen_width / 2,
            height: sizes._screen_width / 2,
            borderWidth: 6,
            borderRadius: sizes._screen_width / 2,
            justifyContent: 'center',
            alignSelf: 'center',
            borderColor: ArrayColors.pink,
            marginVertical: sizes._16sdp,
          }}>
          <View
            style={{
              width: sizes._screen_width / 2 - 20,
              height: sizes._screen_width / 2 - 20,
              borderWidth: 1,
              borderRadius: sizes._screen_width / 2,
              justifyContent: 'center',
              alignSelf: 'center',
              borderColor: ArrayColors._color_red,
              marginVertical: sizes._16sdp,
            }}>
            <View
              style={{
                width: sizes._screen_width / 2 - 40,
                height: sizes._screen_width / 2 - 40,
                borderRadius: sizes._screen_width / 2,
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: sizes._16sdp,
              }}>
              <Image
                source={selectedImage ? selectedImage : Images.user_no_bgr}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: sizes._screen_width / 2,
                }}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              onPress={eventUpLoadFileImager}
              style={{
                width: sizes._48sdp,
                height: sizes._48sdp,
                backgroundColor: ArrayColors._color_white,
                position: 'absolute',
                right: -sizes._32sdp,
                top: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: sizes._48sdp / 2,
              }}>
              <Image
                source={Images.ic_camera}
                style={{
                  width: sizes._32sdp,
                  height: sizes._32sdp,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: sizes._20sdp,
            width: sizes._screen_width - sizes._40sdp,
            marginTop: sizes._20sdp,
          }}>
          <Input
            //   value={email}
            //   onPress_1={clearTextEmail}
            titleInPut="Họ và tên"
            placeholder="Enter họ tên"
            nameImg_1={Images.ic_mark_cut}
            //   onChangeText={text => eventEditEmail(text)}
            //   setIconViewEmail={visibleIconEmail}
          />
          <Input
            //   value={email}
            //   onPress_1={clearTextEmail}
            titleInPut="Số điện thoại"
            placeholder="Enter số điện thoại"
            nameImg_1={Images.ic_mark_cut}
            //   onChangeText={text => eventEditEmail(text)}
            //   setIconViewEmail={visibleIconEmail}
          />
        </View>
        <Button onPress={handleRegister} title="Đăng ký"></Button>
        <GoogleOrFacebook />
        <Policy />
        <TouchableOpacity
          onPress={eventLogin}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: sizes._24sdp,
          }}>
          <Text
            style={{
              color: ArrayColors._color_facebook,
              fontWeight: 'bold',
              fontSize: sizes._15sdp,
            }}>
            Bạn đã có tài khoản ?
          </Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.mContainer}>
        <AppHeader
          content
          customContent={
            <HeaderShown
              titleScreen="THÊM THÔNG TIN"
              onBackPress={onBackPress}
            />
          }></AppHeader>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          listKey="Screen_Register_Detail"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        />
        {isLoading ? <Loading /> : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenRegisterDetail;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
