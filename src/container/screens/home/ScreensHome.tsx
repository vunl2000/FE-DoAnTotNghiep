import { StyleSheet, SafeAreaView, Animated, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import Header from '../../../components/header/Header';
import ArrayColors from '../../../res/colors/ArrayColors';
import sizes from '../../../res/sizes/sizes';
import HomeStack from '../../navigators/HomeStack';
import { useDispatch, useSelector } from 'react-redux';
import {
<<<<<<< HEAD
    loadAll,
    loadColors,
    loadMen,
    loadSizes,
    loadWomen,
=======
  loadAccessory,
  loadColors,
  loadMen,
  loadSizes,
  loadWomen,
>>>>>>> origin/vunl
} from '../../../store/actions/catoryActions';
import { Value } from 'react-native-reanimated';
import { NameScreen } from '../../navigators/TabNavigator';
import { HomeName } from '../../navigators/AppContainer';

const ScreensHome = ({ navigation }: { navigation: any }) => {
    const dispatch: any = useDispatch();
    const { typeCatory } = useSelector((state: any) => state.catory);
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

    const { mContainer } = styles;

    const changeScoll = (val: any) => {
        setHeight(val);
    };

<<<<<<< HEAD
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
=======
  useEffect(() => {
    typeCatory.forEach((item: any) => {
      if (item.titleTypeProduct === 'Phụ kiện') {
        dispatch(loadAccessory(item._id));
      }
      if (item.titleTypeProduct === 'Nam') {
        dispatch(loadMen(item._id));
      }
      if (item.titleTypeProduct === 'Nữ') {
        dispatch(loadWomen(item._id));
      }
    });
  }, [typeCatory]);
>>>>>>> origin/vunl

    useEffect(() => {
        dispatch(loadSizes());
        dispatch(loadColors());
    }, []);

    function eventSearch() {
        navigation.navigate(NameScreen.SEARCH_SCREEN);
    }

    function eventHeart() {
        navigation.navigate(NameScreen.HEART_PRODUCT);
    }

    function eventCart() {
        navigation.navigate(HomeName.CART);
    }
    function eventEmail() {
        navigation.navigate("ScreenNotification");
        console.log("Tin nhắn");

    }

    return (
        <SafeAreaView style={mContainer}>
            <Header
                onPressHeart={eventHeart}
                onPressSearch={eventSearch}
                logo
                onPressCart={eventCart}
                onPressEmail={eventEmail}
            />
            <View style={styles.contentView}>
                <HomeStack changeScoll={changeScoll} />
            </View>
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
