import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Animated,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import ArrayColors from '../../res/colors/ArrayColors';
import {FAKEDATA} from '../../data/fakedata/Data';
import sizes from '../../res/sizes/sizes';
import HomeStack from '../navigators/HomeStack';
const ScreensHome = () => {
  const [height, setHeight] = React.useState(0);

  const activeIndexAnimation = React.useRef(new Animated.Value(0)).current;

  if (height > 50) {
    Animated.timing(activeIndexAnimation, {
      toValue: sizes._screen_width / 1.45,
      duration: 500,
      useNativeDriver: false,
    }).start();
  } else if (height < 50) {
    Animated.timing(activeIndexAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const {mContainer} = styles;

  const changeScoll = (val: any) => {
    setHeight(val);
  };

  return (
    <SafeAreaView style={mContainer}>
      <Header logo />
      <HomeStack changeScoll={changeScoll} />
    </SafeAreaView>
  );
};

export default ScreensHome;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
    paddingBottom: sizes._80sdp,
  },
});
