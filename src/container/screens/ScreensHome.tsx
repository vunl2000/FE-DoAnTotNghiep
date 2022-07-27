import {StyleSheet, SafeAreaView, Animated, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/header/Header';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import HomeStack from '../navigators/HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {loadAll, loadMen, loadWomen} from '../../store/actions/catoryActions';
import {Value} from 'react-native-reanimated';

const ScreensHome = () => {
  const dispatch: any = useDispatch();
  const {typeCatory} = useSelector((state: any) => state.catory);
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

  useEffect(() => {
    typeCatory.forEach((item: any) => {
      if (item.titleTypeProduct === 'Shop') {
        dispatch(loadAll(item._id));
      }
      if (item.titleTypeProduct === 'Nam') {
        dispatch(loadMen(item._id));
      }
      if (item.titleTypeProduct === 'Nữ') {
        dispatch(loadWomen(item._id));
      }
    });
  }, [typeCatory]);

  return (
    <SafeAreaView style={mContainer}>
      <Header logo />
      <View style={styles.contentView}>
        <HomeStack changeScoll={changeScoll} />
      </View>
    </SafeAreaView>
  );
};

export default ScreensHome;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  contentView: {
    flex: 1,
    paddingBottom: sizes._80sdp,
  },
});
