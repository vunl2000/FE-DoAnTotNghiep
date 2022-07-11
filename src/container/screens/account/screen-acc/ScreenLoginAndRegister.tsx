import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../../res/colors/ArrayColors';
import AppHeader from '../../../../components/header/AppHeader';
import IconHeader from '../../../../components/icons/IconHeader';
import sizes from '../../../../res/sizes/sizes';
import Images from '../../../../res/require/Images';
import AnimatedTab from '../../../../components/accounts/AnimatedTab';
import Input from '../../../../components/accounts/Input';
import Button from '../../../../components/accounts/Button';

type Props = {};

const ScreenLoginAndRegister = ({navigation}: {navigation: any}) => {
  const isAndroid = Platform.OS === 'android';

  const [marginLeft, setMarginLeft] = React.useState(0);
  const [marginRight, setMarginRight] = React.useState(0);

  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);

  const [invisible, setInvisible] = React.useState(true);
  const animatedValues: any = React.useRef(new Animated.Value(0)).current;
  const animatedValuesView: any = React.useRef(new Animated.Value(0)).current;

  function onPressLeft() {
    Animated.timing(animatedValues, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginRight(animatedValues);
    //setInvisible_(false);
    setInvisible(true);
    console.log('right', animatedValues);
    console.log('right', marginRight);
  }
  // const  [state,useState]=React.useState("ok");

  function onPressRight() {
    Animated.timing(animatedValues, {
      toValue: sizes._screen_width / 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginLeft(animatedValues);
    setInvisible(false);
    //setInvisible_(true);
    console.log('left', animatedValues);
    console.log('left---', marginLeft);
  }

  function onBackPress() {
    navigation.goBack();
  }
  function HeaderShown() {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: sizes._screen_width / 3.5,
            height: sizes._48sdp,
            marginTop: sizes._48sdp,
          }}
          source={Images.ic_logo}
        />
        <View style={{position: 'absolute', right: 0}}>
          <IconHeader
            sizes={sizes._32sdp}
            name={isAndroid ? 'close' : 'md-close-sharp'}
            style={styles.mStyleICons}
            onPress={onBackPress}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderShown />}></AppHeader>
      <View style={{marginTop: sizes._32sdp}}>
        <AnimatedTab
          animatedValues={animatedValues}
          marginLeft={marginLeft}
          marginRight={marginRight}
          setMarginLeft={setMarginLeft}
          setMarginRight={setMarginRight}
          textLeft="Đăng nhập"
          textRight="Đăng ký"
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
        />
      </View>
      <View>
        {invisible ? (
          <View
            style={{
              marginHorizontal: sizes._26sdp,
            }}>
            <Input
              titleInPut="Email"
              placeholder="Địa chỉ email"
              onChangeText={text => setEmail(text)}
            />
            <Input
              titleInPut="Mật khẩu"
              placeholder="Mật khẩu"
              onChangeText={text => setEmail(text)}
              secureTextEntry
            />
            <Button title="Đăng nhập"></Button>
          </View>
        ) : (
          <View style={{}}>
            <Input
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
            />
            <Input
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenLoginAndRegister;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mStyleICons: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
