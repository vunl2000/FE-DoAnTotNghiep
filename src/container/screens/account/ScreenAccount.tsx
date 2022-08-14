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
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import MyOffers from '../../../components/accounts/MyOffers';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Images from '../../../res/require/Images';
import HeaderAccounts from '../../../components/accounts/HeaderAccounts';
import AnimatedTab from '../../../components/accounts/AnimatedTab';
import {useDispatch, useSelector} from 'react-redux';
import {NameScreen} from '../../navigators/TabNavigator';
import {loadInvoiceUser} from '../../../store/actions/invoiceActions';
import {TypeBill} from '../../../store/actions/types';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../components/modal/ToastCustom';
import {HomeName} from '../../navigators/AppContainer';
import ItemHeartShow from '../../../components/heart/ItemHearShow';

const ScreenAccount = ({navigation}: {navigation: any}) => {
  const {navigate}: any = useNavigation();
  const {products} = useSelector((state: any) => state.product);
  const [numberDiscount, setNumberDiscount] = React.useState('0');
  const dispatch: any = useDispatch();
  const [scores, setScores] = React.useState('0');

  const [marginLeft, setMarginLeft] = React.useState(0);
  const [listHeart, setListHeart] = React.useState<any>([]);
  const [invoiceStatus, setInvoiceStatus] = React.useState<any>({
    handle: null,
    processed: null,
    transport: null,
    done: null,
  });

  const [marginRight, setMarginRight] = React.useState(0);

  const [storageToken, setStorageToken] = React.useState<string | any>(null);
  const [storageUser, setStorageUser] = React.useState<string | any>(
    'Đăng nhập / Đăng Ký >',
  );

  const [event, setEvent] = React.useState<string | any>(true);

  const accounts = useSelector((state: any) => state.account);
  const {listInvoice, isFalse} = useSelector((state: any) => state.invoice);

  const [isLoading, setIsLoading] = React.useState<string | any>(true);

  const animatedValues: any = React.useRef(new Animated.Value(0)).current;
  //Heart
  const renderSpace = () => <View style={{height: sizes._16sdp}} />;
  const keySuggestions = (item: any) => item._id;
  const renderItem = ({item, index}: any) => (
    <ItemHeartShow
      item={item}
      index={index}
      onPress={(val: any) => navigate(NameScreen.HEART_PRODUCT)}
    />
  );

  const navigateInvoice = () => {
    if (accounts.isAuthenticated) {
      navigate(NameScreen.INVOICE);
    } else {
      showToast('Bạn cần đăng nhập để xem đơn hàng!');
    }
  };
  React.useLayoutEffect(() => {
    try {
      if (accounts.isAuthenticated === null) {
        setStorageUser('Đăng nhập / Đăng Ký >');
        setEvent(true);
      } else {
        if (accounts.isAuthenticated === true) {
          setStorageUser(accounts.result[0].name);
          setEvent(false);
        } else {
          setStorageUser(accounts.result[0].name);
          setEvent(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [accounts.isAuthenticated]);
  useEffect(() => {
    if (accounts.isAuthenticated) {
      dispatch(loadInvoiceUser(accounts.result[0]._id));
    }
  }, []);

  useEffect(() => {
    try {
      let handle: any = null,
        processed: any = null,
        transport: any = null,
        done: any = null;
      if (!isFalse && listInvoice) {
        listInvoice.forEach((item: TypeBill) => {
          if (item.status == 0) {
            handle += 1;
          }
          if (item.status == 1) {
            processed += 1;
          }
          if (item.status == 2) {
            transport += 1;
          }
          if (item.status == 3) {
            done += 1;
          }
        });
        setInvoiceStatus({
          handle,
          processed,
          transport,
          done,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [isFalse, listInvoice]);
  console.log(invoiceStatus);
  useEffect(() => {
    let heart = products.filter((item: any) => item.heart_active);
    setListHeart(heart);
  }, [products]);
  function eventCart() {
    navigation.navigate(HomeName.CART);
  }
  async function eventSettings() {
    navigation.navigate(NameScreen.SETTINGS);
  }

  function eventLogInAndRegister() {
    navigation.navigate(NameScreen.LOGIN);
  }

  function onPressLeft() {
    Animated.timing(animatedValues, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setMarginRight(animatedValues);
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
        }
      />
      <View style={styles.mContinerBody}>
        <LoginAndRegister />
        <View>
          <View style={styles.mStyleMine1}>
            <MyOffers
              onPress={() => {}}
              textOrImg={true}
              mStringText={numberDiscount}
              mStringTitles="Phiếu giảm giá"
              styleContent={styles.spaceMax}
            />
            <MyOffers
              textOrImg={true}
              mStringText={scores}
              mStringTitles="Điểm"
              styleContent={styles.spaceMax}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_wallet}
              mStringTitles="Ví"
              styleContent={styles.spaceMax}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_giftcard}
              mStringTitles="Thẻ quà tặng"
              styleContent={styles.spaceMax}
            />
          </View>
        </View>
        <View style={styles.mStyleMine2}>
          <Text
            style={{
              fontSize: sizes._20sdp,
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              fontWeight: '600',
              marginHorizontal: sizes._18sdp,
              marginTop: sizes._10sdp,
            }}>
            Đơn hàng của tôi
          </Text>
          <View style={styles.mStyleMine2_1}>
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_mark}
              mStringTitles="Chờ xác nhận"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.handle}
              onPress={navigateInvoice}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_send}
              mStringTitles="Đang xử lý"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.processed}
              onPress={navigateInvoice}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_handle}
              mStringTitles="Đang vận chuyển"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.transport}
              onPress={navigateInvoice}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_back}
              mStringTitles="Đã mua"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.done}
              onPress={navigateInvoice}
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
              styleContent={styles.spaceMax}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_survey_center}
              mStringTitles="Trung tâm khảo sát"
              styleContent={styles.spaceMax}
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
          {accounts.isAuthenticated ? (
            <FlatList
              data={listHeart}
              extraData={listHeart}
              keyExtractor={keySuggestions}
              renderItem={renderItem}
              listKey="list-heart"
              removeClippedSubviews
              numColumns={2}
              ItemSeparatorComponent={renderSpace}
              columnWrapperStyle={{
                flex: 1,
                paddingHorizontal: sizes._18sdp,
                justifyContent: 'flex-start',
              }}
            />
          ) : (
            <View style={styles.contentFavorite}>
              <Text>
                <TouchableWithoutFeedback onPress={eventLogInAndRegister}>
                  <Text style={styles.textLink}>Đăng nhập</Text>
                </TouchableWithoutFeedback>{' '}
                <Text style={styles.textDefault}>
                  để xem sản phẩm yêu thích
                </Text>
              </Text>
            </View>
          )}
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
    backgroundColor: ArrayColors.darkGrayAccount,
    paddingBottom: sizes._80sdp,
  },
  mContinerBody: {
    backgroundColor: ArrayColors.darkGrayAccount,
    flex: 1,
  },
  mStyleText: {
    width: sizes._screen_width,
    backgroundColor: ArrayColors._color_white,
    flexDirection: 'row',
    marginHorizontal: sizes._18sdp,
    marginTop: sizes._18sdp,
    paddingTop: sizes._10sdp,
    borderStartColor: ArrayColors._color_white,
  },
  mStyleTextLoginAndRegister: {
    fontSize: sizes._20sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
  },
  textLink: {
    fontSize: sizes._16sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    color: ArrayColors.skyBlue,
  },
  textDefault: {
    fontSize: sizes._16sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    color: ArrayColors._color_un_active,
  },
  mStyleMine1: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: sizes._14sdp,
  },
  mStyleMine2: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    marginTop: sizes._18sdp,
  },
  mStyleMine2_1: {
    flexDirection: 'row',
    paddingTop: sizes._14sdp,
  },

  mStyleMine3_1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: sizes._18sdp,
  },
  mStyleFlashList: {
    backgroundColor: ArrayColors._color_white,
    width: sizes._screen_width,
    flex: 1,
    marginTop: sizes._10sdp,
  },
  space: {
    height: sizes._18sdp,
  },
  spaceMax: {
    flex: 1,
  },
  contentFavorite: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
