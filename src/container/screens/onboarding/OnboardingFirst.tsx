import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import sizes from '../../../res/sizes/sizes';
import {slides} from '../../../data/DataFirst';
import {useDispatch} from 'react-redux';
import {openApp} from '../../../store/actions/fristOpenActions';

const COLORS = {
  primary: '#FFFFFF',
  black: '#000000',
  gray: '#555555',
  redd: '#B086FF',
  purple: '#F9E1FC',
};
const Slide = ({item}: any) => {
  return (
    <View style={{alignContent: 'center'}}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const OnboardingFirst = ({navigation}: any) => {
  const dispatch: any = useDispatch();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>(null);

  // const [isShow, setIsShow] = React.useState<boolean | any>(true);

  function eventStart() {
    // if (currentSlideIndex === 2) {
    //   setBoolean("no");
    dispatch(openApp());
    navigation.navigate('AppContainer');
    //  }
  }
  // async function setBoolean(boolean: boolean | any) {
  //   try {
  //     await AsyncStorage.removeItem('@is_check');
  //     await AsyncStorage.setItem('@is_check', JSON.stringify(boolean));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const Footer = () => {
    return (
      <View
        style={{
          height: sizes._screen_height * 0.2,
          justifyContent: 'space-between',
          paddingHorizontal: sizes._20sdp,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: sizes._20sdp,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.gray,
                  width: sizes._25sdp,
                },
              ]}
            />
          ))}
        </View>
        <View style={{marginBottom: sizes._20sdp}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: sizes._50sdp}}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.btn]}
                onPress={eventStart}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: sizes._18sdp,
                    color: COLORS.redd,
                  }}>
                  Bắt Đầu
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: sizes._2sdp,
                    borderColor: COLORS.redd,
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: sizes._18sdp,
                    color: COLORS.redd,
                  }}>
                  Bỏ qua
                </Text>
              </TouchableOpacity>
              <View style={{width: sizes._30sdp}} />
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.btn]}
                onPress={goNextSlide}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: sizes._18sdp,
                    color: COLORS.redd,
                  }}>
                  Tiếp
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = ({e}: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIdex = Math.round(contentOffsetX / sizes._screen_width);
    setCurrentSlideIndex(currentIdex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + sizes._1sdp;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * sizes._screen_width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - sizes._1sdp;
    const offset = lastSlideIndex * sizes._screen_width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.purple}}>
     
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{height: sizes._screen_height * 0.8}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingFirst;

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: sizes._28sdp,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: sizes._60sdp,
  },
  image: {
    height: '60%',
    width: sizes._screen_width,
    resizeMode: 'contain',
    marginTop: sizes._50sdp,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: sizes._14sdp,
    lineHeight: sizes._24sdp,
    // maxWidth:'75%',
    textAlign: 'center',
    marginTop: sizes._13sdp,
  },
  indicator: {
    height: sizes._4sdp,
    width: sizes._10sdp,
    backgroundColor: COLORS.redd,
    marginHorizontal: sizes._3sdp,
    borderRadius: sizes._2sdp,
  },
  btn: {
    flex: 1,
    height: sizes._50sdp,
    borderRadius: sizes._10sdp,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
