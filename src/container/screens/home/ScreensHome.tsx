import {StyleSheet, SafeAreaView, Animated, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import Header from '../../../components/header/Header';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import HomeStack from '../../navigators/HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadAll,
  loadMen,
  loadWomen,
} from '../../../store/actions/catoryActions';
import {Value} from 'react-native-reanimated';
import ModalSearch from '../../../components/modal/ModalSearch';

interface Props {
  onPressSearch?: () => void;
}

const ScreensHome = (props: Props) => {
  const dispatch: any = useDispatch();
  const {typeCatory} = useSelector((state: any) => state.catory);
  const [height, setHeight] = React.useState(0);

  const [isViewModel, setIsViewModel] = React.useState<string | any>(false);

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

  function eventSearch() {
    setIsViewModel(true);
  }
  function eventSearchDissmiss() {
    setIsViewModel(false);
  }

  return (
    <SafeAreaView style={mContainer}>
      <Header onPressSearch={eventSearch} logo />
      <View style={styles.contentView}>
        <HomeStack changeScoll={changeScoll} />
      </View>
      <ModalSearch invisible={eventSearchDissmiss} visible={isViewModel} />
    </SafeAreaView>
  );
};

export default memo(ScreensHome);

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
