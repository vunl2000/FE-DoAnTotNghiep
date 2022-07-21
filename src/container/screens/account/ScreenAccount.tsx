import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import MyOffers from '../../../components/accounts/MyOffers';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Images from '../../../res/require/Images';
import HeaderAccounts from '../../../components/accounts/HeaderAccounts';
import AnimatedTab from '../../../components/accounts/AnimatedTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/modal/Loading';
import {getDataUser} from '../../../utils/GetToken';

const ScreenAccount = ({navigation}: {navigation: any}) => {
  const [numberDiscount, setNumberDiscount] = React.useState('0');

  const [scores, setScores] = React.useState('0');

  const [marginLeft, setMarginLeft] = React.useState(0);

  const [marginRight, setMarginRight] = React.useState(0);

  const [storageToken, setStorageToken] = React.useState<string | any>(null);
  const [storageUser, setStorageUser] = React.useState<string | any>(
    'Đăng nhập / Đăng Ký >',
  );

  const [event, setEvent] = React.useState<string | any>(true);

  const accounts = useSelector((state: any) => state.account);

  const [isLoading, setIsLoading] = React.useState<string | any>(true);

  const animatedValues: any = React.useRef(new Animated.Value(0)).current;

  React.useLayoutEffect(() => {
    setTimeout(() => {
      getDataUser('@user_token')
        .then(data => data)
        .then((value: any) => {
          if (value === undefined) {
            console.log('undefined');
            //setStorageUser('Đăng nhập / Đăng Ký >');
            setEvent(true);
          } else {
            const jsonValue = JSON.parse(value);
            if (accounts.isAuthenticated === true) {
              setStorageUser(jsonValue.userNameSet);
              setEvent(false);
            } else {
              setStorageUser(jsonValue.userNameSet);
              setEvent(false);
            }
          }
        })
        .catch(err => console.log(err));
    }, 100);
  }, [accounts.isAuthenticated]);

  // const getData = async (key: any) => {
  //   try {
  //     const data = await AsyncStorage.getItem(key);
  //     if (data != null) {
  //       return data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function eventCart() {
    console.log('Cart');
  }
  async function eventSettings() {
    console.log('Settings');
    getDataUser('@user_token')
      .then(data => data)
      .then((value: any) => {
        if (value === undefined) {
          console.log('undefined');
          setEvent(true);
        } else {
          AsyncStorage.removeItem('@user_token');
        }
      })
      .catch(err => console.log(err));
  }

  function eventLogInAndRegister() {
    navigation.navigate('ScreenLoginAndRegister');
  }

  function onPressLeft() {
    Animated.timing(animatedValues, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginRight(animatedValues);
    console.log('right', animatedValues);
    console.log('right', marginRight);
  }

  function onPressRight() {
    Animated.timing(animatedValues, {
      toValue: sizes._screen_width / 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginLeft(animatedValues);
    console.log('left', animatedValues);
    console.log('left---', marginLeft);
  }

  function LoginAndRegister() {
    return (
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? ArrayColors.light
              : ArrayColors._color_white,
          },
          styles.mStyleText,
        ]}
        onPress={event ? eventLogInAndRegister : null}>
        <View>
          <Text style={styles.mStyleTextLoginAndRegister}>{storageUser}</Text>
        </View>
        {/* <View>
          <Text style={styles.mStyleTextLoginAndRegister}>Đăng ký {`>`}</Text>
        </View> */}
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader
        content
        customContent={
          <HeaderAccounts
            onPressCart={eventCart}
            onPressSetting={eventSettings}
          />
        }></AppHeader>
      <View style={styles.mContinerBody}>
        <LoginAndRegister />
        <View style={styles.mStyleMine1}>
          <MyOffers
            onPress={() => {
              // console.log('cái địt');
            }}
            textOrImg={true}
            mStringText={numberDiscount}
            mStringTitles="Phiếu giảm giá"
          />
          <MyOffers
            textOrImg={true}
            mStringText={scores}
            mStringTitles="Điểm"
          />
          <MyOffers
            textOrImg={false}
            mImager={Images.ic_wallet}
            mStringTitles="Ví"
          />
          <MyOffers
            textOrImg={false}
            mImager={Images.ic_giftcard}
            mStringTitles="Thẻ quà tặng"
          />
        </View>
        <View style={styles.mStyleMine2}>
          <Text
            style={{
              fontSize: sizes._17sdp,
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              fontWeight: 'bold',
              marginHorizontal: sizes._10sdp,
              marginTop: sizes._6sdp,
            }}>
            Đơn hàng của tôi
          </Text>
          <View style={styles.mStyleMine2_1}>
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_mark}
              mStringTitles="Hàng đã nhận"
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_handle}
              mStringTitles="Xử lý"
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_send}
              mStringTitles="Đã vận chuyển"
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_back}
              mStringTitles="Trả lại hàng"
            />
          </View>
        </View>
        <View style={styles.mStyleMine2}>
          <Text
            style={{
              fontSize: sizes._17sdp,
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              fontWeight: 'bold',
              marginHorizontal: sizes._10sdp,
              marginTop: sizes._6sdp,
            }}>
            Nhiều dịch vụ hơn
          </Text>
          <View style={styles.mStyleMine3_1}>
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_headsetphone}
              mStringTitles="Câu hỏi"
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_survey_center}
              mStringTitles="Trung tâm khảo sát"
            />
          </View>
        </View>

        <View style={styles.mStyleFlashList}>
          <AnimatedTab
            animatedValues={animatedValues}
            marginLeft={marginLeft}
            marginRight={marginRight}
            setMarginLeft={setMarginLeft}
            setMarginRight={setMarginRight}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            textLeft="Danh sách yêu thích"
            textRight="Đã xem gần đây"
          />
        </View>
      </View>
      {/* {isLoading ? <Loading /> : null} */}
    </SafeAreaView>
  );
};

export default ScreenAccount;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContinerBody: {
    backgroundColor: ArrayColors.darkGrayAccount,
    flex: 1,
  },
  mStyleText: {
    // width: sizes._screen_width /2,
    backgroundColor: ArrayColors._color_white,
    flexDirection: 'row',
    marginHorizontal: sizes._10sdp,
  },
  mStyleTextLoginAndRegister: {
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: sizes._32sdp,
    color: ArrayColors._color_black,
  },
  mStyleMine1: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    // flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: sizes._32sdp,
    alignItems: 'center',
  },
  mStyleMine2: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    marginTop: sizes._10sdp,
  },
  mStyleMine2_1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: sizes._18sdp,
    alignItems: 'center',
  },

  mStyleMine3_1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: sizes._18sdp,
  },
  mStyleFlashList: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    flex: 10,
    marginTop: sizes._10sdp,
  },
});
