import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import TitleHome from '../../components/title/TitleHome';
import Images from '../../res/require/Images';
import emojisDataGif from './emojisDataGif';
import Emoji, {
  EMOJI_SIZE,
  EMOJI_MARGIN,
  EMOJI_BAR_PADDING,
  EMOJI_BAR_BORDER_RADIUS,
} from './Emoji';

type Props = {
  showDetails?: () => void;
};
const EMOJI_SPACE = EMOJI_SIZE + EMOJI_MARGIN * 2 + EMOJI_BAR_PADDING;
const getEmojiIndex = (positionX: number) => {
  'worklet';
  return Math.ceil(positionX / EMOJI_SPACE) - 1;
};
const NewsData = (props: Props) => {
  const [userName, setUserName] = React.useState('KPOPIDOD');
  const [isCheckIcon, setIsCheckIcon] = React.useState(false);
  const [titleIcon, setTitleIcon] = React.useState('Thích');
  const [textColor, setTextColor] = React.useState(
    ArrayColors._color_black_gray11,
  );

  const emojisBarSharedValue = useSharedValue(0);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = React.useState<
    null | number
  >(null);
  const emojisBarAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: emojisBarSharedValue.value}],
    };
  }, []);

  const activeEmojiIndexSharedValue = useSharedValue(-1);

  const selectEmoji = (x: number) => {
    const index = Math.ceil(x / EMOJI_SPACE) - 1;

    setSelectedEmojiIndex(index);

    console.log('----------', selectedEmojiIndex);

    switch (selectedEmojiIndex) {
      case 0:
        setTitleIcon('Thích');
        break;
      case 1:
        setTitleIcon('Yêu thích');
        break;
      case 2:
        setTitleIcon('Haha');
        break;
      case 3:
        setTitleIcon('Wao');
        break;
      case 4:
        setTitleIcon('Buồn');
        break;

      default:
        setTitleIcon('Thích');
        break;
    }
  };

  const animatedGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: ({x}) => {
        activeEmojiIndexSharedValue.value = getEmojiIndex(x);
      },
      onActive: ({x}) => {
        activeEmojiIndexSharedValue.value = getEmojiIndex(x);
      },
      onEnd: ({x}) => {
        runOnJS(selectEmoji)(x);
        activeEmojiIndexSharedValue.value = -1;
        emojisBarSharedValue.value = withTiming(0);
      },
    });

  function evenClickLike() {
    setIsCheckIcon(!isCheckIcon);
    if (isCheckIcon === true) {
      setSelectedEmojiIndex(0);
      setTitleIcon('Thích');
      setTextColor(ArrayColors._color_blue_light_light);
    } else {
      setSelectedEmojiIndex(null);
      setTitleIcon('Thích');
      setTextColor(ArrayColors._color_black_gray11);
    }
  }

  return (
    <View
      style={{
        backgroundColor: ArrayColors._color_white,
        // marginHorizontal: sizes._6sdp,
        marginVertical: sizes._6sdp,
        borderRadius: sizes._6sdp,
      }}>
      <View>
        <View style={styles.mContainer}>
          <View style={styles.mStyleImg}>
            <Image style={styles.mImage} source={Images.img_user} />
          </View>
          <View style={{marginHorizontal: sizes._24sdp}}>
            <TitleHome style={styles.mStyleUserName} title={userName} />
            <TitleHome style={styles.mStyleDateTime} title="2 ngày trước" />
          </View>
        </View>

        <View>
          <TitleHome
            style={styles.mStyleDescription}
            title="𝐒𝐢𝐞̂𝐮 𝐩𝐡𝐚̂̉𝐦 Thun Basic.
             Đơn giản, Dễ chịu, Thoải mái. 
             Chất vải Cotton cao cấp.
             Đủ màu, Đủ size S M L XL 2XL. 
             Thiết kế tinh tế tạo điểm nhấn khi mặc.
              Ship cod toàn quốc, kiểm tra trước khi thanh toán."
          />
          <TitleHome
            title="Xem thêm..."
            style={styles.mStyleDetails}
            onPress={props.showDetails}
          />
        </View>
        {/* <View style={styles.mStyleImgDetails}>
          <Image
            style={styles.mStyleImgSp}
            source={Images.img_ex_newSpaper_1}
          />
          <Image
            style={styles.mStyleImgSp}
            source={Images.img_ex_newSpaper_2}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: sizes._24sdp,
          }}>
          <View style={{flexDirection: 'row', marginHorizontal: sizes._8sdp}}>
            <TitleHome title="100" style={styles.mStyleLike} />
            <TitleHome
              title="Lượt thích"
              style={[styles.mStyleLike, {marginHorizontal: sizes._8sdp}]}
            />
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: sizes._8sdp}}>
            <TitleHome
              title="100"
              style={[styles.mStyleLike, {marginHorizontal: sizes._8sdp}]}
            />
            <TitleHome title="Lượt bình luận" style={styles.mStyleLike} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 0.5,
            marginHorizontal: sizes._16sdp,
          }}>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={evenClickLike}
            onLongPress={() => {
              emojisBarSharedValue.value = withTiming(1, {duration: 700});
            }}>
            <Image
              source={
                selectedEmojiIndex !== null
                  ? emojisDataGif[selectedEmojiIndex]
                  : Images.ic_likess
              }
              style={styles.likeIcon}
            />
            <TitleHome
              title={titleIcon}
              style={[styles.mStyleLike, {color: textColor}]}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              height: sizes._48sdp,
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: ArrayColors._color_gray_light,
            }}>
            <Image
              style={{
                width: sizes._18sdp,
                height: sizes._18sdp,
                marginHorizontal: sizes._8sdp,
              }}
              source={Images.ic_comment}
            />
            <TitleHome title="Bình luận" style={styles.mStyleLike} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: sizes._48sdp,
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: ArrayColors._color_gray_light,
            }}>
            <Image
              style={{
                width: sizes._18sdp,
                height: sizes._18sdp,
                marginHorizontal: sizes._8sdp,
              }}
              source={Images.ic_share}
            />
            <TitleHome title="Chia sẻ" style={styles.mStyleLike} />
          </View>
        </View>

        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <PanGestureHandler onGestureEvent={animatedGestureHandler}>
            <Animated.View style={[styles.emojisBar, emojisBarAnimationStyle]}>
              {/* render emojis */}
              {emojisDataGif.map((emojiSource, index) => {
                console.log(emojiSource);
                // console.log(index);

                return (
                  <Emoji
                    source={emojiSource}
                    key={emojiSource.toString()}
                    index={index}
                    activeIndex={activeEmojiIndexSharedValue}
                  />
                );
              })}
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default NewsData;

const styles = StyleSheet.create({
  mContainer: {
    flexDirection: 'row',
    marginHorizontal: sizes._16sdp,
    marginVertical: sizes._16sdp,
    alignItems: 'center',
  },

  mStyleImg: {
    width: sizes._58sdp,
    height: sizes._58sdp,
    borderRadius: sizes._58sdp / sizes._2sdp,
    backgroundColor: ArrayColors._color_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mImage: {
    width: sizes._58sdp,
    height: sizes._58sdp,
    borderRadius: sizes._58sdp / sizes._2sdp,
  },
  mStyleUserName: {
    fontSize: sizes._18sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
  },
  mStyleDateTime: {
    fontSize: sizes._14sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black_light,
    marginTop: sizes._6sdp,
  },
  mStyleDescription: {
    fontSize: sizes._15sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black_light,
    marginHorizontal: sizes._12sdp,
    lineHeight: sizes._22sdp,
  },
  mStyleDetails: {
    fontSize: sizes._13sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_white_sombre,
    marginHorizontal: sizes._12sdp,
    lineHeight: sizes._22sdp,
  },
  mStyleImgDetails: {
    flexDirection: 'row',
    // marginHorizontal: sizes._8sdp
  },
  mStyleImgSp: {
    width: sizes._screen_width / 2 - sizes._12sdp,
    height: sizes._screen_height / 2.5,
    marginHorizontal: sizes._6sdp,
  },

  mStyleLike: {
    fontSize: sizes._18sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    lineHeight: sizes._22sdp,
  },
  likeIcon: {
    width: sizes._18sdp,
    height: sizes._18sdp,
    marginHorizontal: sizes._8sdp,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ' red',
  },
  gestureHandlerRootView: {
    position: 'absolute',
    bottom: sizes._52sdp,
    left: sizes._32sdp,
  },
  emojisBar: {
    flexDirection: 'row',
    borderRadius: EMOJI_BAR_BORDER_RADIUS,
    padding: EMOJI_BAR_PADDING,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    height: sizes._48sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
