import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import sizes from '../../../res/sizes/sizes';
import {slides} from '../../../data/DataFirst';
import {useDispatch, useSelector} from 'react-redux';
import {openApp} from '../../../store/actions/fristOpenActions';
import ArrayColors from '../../../res/colors/ArrayColors';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';

const Slide = ({item}: any) => {
  return (
    <View style={{alignContent: 'center'}}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const OnboardingFirst = () => {
  const {replace}: any = useNavigation();
  const dispatch: any = useDispatch();
  const {firstOpen} = useSelector((state: any) => state.firstOpen);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const silderRef: any = useRef(null);

  const vieableItemChanged: any = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const next = () => {
    if (currentIndex < slides.length - 1) {
      silderRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      dispatch(openApp());
      replace(NameScreen.HOME);
    }
  };

  const skip = () => {
    silderRef.current.scrollToIndex({index: slides.length - 1});
  };

  const keyExtractor = (_: any, index: any) => index.toString();

  const PagingDot: FunctionComponent<{color: any; opacity: any}> = ({
    color,
    opacity,
  }) => {
    return (
      <Animated.View
        style={[styles.indicator, {backgroundColor: color, opacity: opacity}]}
      />
    );
  };

  const Footer = () => {
    return (
      <View style={styles.content}>
        <TouchableOpacity style={styles.spaceMax} onPress={skip}>
          <Text
            style={[
              styles.textDefault,
              {color: ArrayColors._color_un_active, fontWeight: '400'},
            ]}>
            {currentIndex === slides.length - 1 ? null : 'Bỏ qua'}
          </Text>
        </TouchableOpacity>
        <View style={styles.contentIndicator}>
          {slides.map((_: any, index: any) => {
            const inputRange = [
              (index - 1) * sizes._screen_width,
              index * sizes._screen_width,
              (index + 1) * sizes._screen_width,
            ];

            const colorOutputRange = [
              ArrayColors._color_white_gray,
              ArrayColors._color_black,
              ArrayColors._color_white_gray,
            ];

            const color = animatedValue.interpolate({
              inputRange,
              outputRange: colorOutputRange,
              extrapolate: 'clamp',
            });
            const opacity = animatedValue.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
              extrapolate: 'clamp',
            });
            return (
              <PagingDot
                color={color}
                opacity={opacity}
                key={index.toString()}
              />
            );
          })}
        </View>
        <TouchableOpacity
          onPress={next}
          style={[styles.spaceMax, {alignItems: 'flex-end'}]}>
          <Text
            style={[
              styles.textDefault,
              {
                color:
                  currentIndex === slides.length - 1
                    ? ArrayColors.skyBlue
                    : ArrayColors._color_black,

                fontWeight: currentIndex === slides.length - 1 ? '700' : '400',
              },
            ]}>
            {currentIndex === slides.length - 1 ? 'Bắt đầu' : 'Tiếp'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        listKey={'onbroading_app'}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: animatedValue}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        bounces={false}
        onViewableItemsChanged={vieableItemChanged}
        viewabilityConfig={viewConfig}
        ref={silderRef}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  title: {
    color: ArrayColors._color_black,
    fontSize: sizes._28sdp,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: sizes._60sdp,
    fontFamily: 'OpenSans-Bold',
  },
  image: {
    height: '60%',
    width: sizes._screen_width,
    resizeMode: 'contain',
    marginTop: sizes._50sdp,
  },
  subtitle: {
    color: ArrayColors._color_un_active,
    fontSize: sizes._16sdp,
    lineHeight: sizes._24sdp,
    textAlign: 'center',
    fontWeight: '400',
    marginTop: sizes._13sdp,
    fontFamily: 'OpenSans-Regular',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    fontFamily: 'OpenSans-Regular',
  },
  indicator: {
    height: sizes._10sdp,
    width: sizes._10sdp,
    marginHorizontal: sizes._8sdp,
    borderRadius: sizes._10sdp / 2,
  },
  content: {
    flexDirection: 'row',
    padding: sizes._22sdp,
    justifyContent: 'space-around',
  },
  contentIndicator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceMax: {
    width: sizes._100sdp,
  },
});
