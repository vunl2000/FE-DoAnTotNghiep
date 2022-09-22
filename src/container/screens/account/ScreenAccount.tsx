import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import MyOffers from '../../../components/accounts/MyOffers';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import Images from '../../../res/require/Images';
import HeaderAccounts from '../../../components/accounts/HeaderAccounts';
import AnimatedTab from '../../../components/accounts/AnimatedTab';
import {useDispatch, useSelector} from 'react-redux';
import {NameScreen} from '../../navigators/TabNavigator';
import {
  clearInvoice,
  loadInvoiceUser,
} from '../../../store/actions/invoiceActions';
import {TypeBill} from '../../../store/actions/types';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {showToast} from '../../../components/modal/ToastCustom';
import {HomeName} from '../../navigators/AppContainer';
import ItemHeartShow from '../../../components/heart/ItemHearShow';
import image from '../../../res/require/Images';

const ScreenAccount = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const route: any = useRoute();
  const {navigate}: any = useNavigation();
  const {products} = useSelector((state: any) => state.product);
  const [numberDiscount, setNumberDiscount] = React.useState('0');
  const dispatch: any = useDispatch();
  const [scores, setScores] = React.useState('0');
  const [isShowImg, setIsShowImg] = React.useState<any>(false);
  const [dataImg, setDataImg] = React.useState<any>(null);

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
  const check = route.params?.loadBill;
  const [event, setEvent] = React.useState<string | any>(true);

  const accounts = useSelector((state: any) => state.account);
  const {listInvoice, isFalse, handle, processed, transport, done} =
    useSelector((state: any) => state.invoice);

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

  const navigateInvoice = (id: string) => {
    if (accounts.isAuthenticated) {
      navigate(NameScreen.INVOICE, {initialRoute: id});
    } else {
      showToast('Bạn cần đăng nhập để xem đơn hàng!');
    }
  };
  // console.log(accounts.result[0].photoUrl);
  const gotoQuestions = () => {
    navigate(NameScreen.SCREENCHECKQUESTIONS);
  };

  const gotoSupports = () => {
    navigate(NameScreen.ANSWERQUESTIONS);
  };

  React.useLayoutEffect(() => {
    try {
      if (isFocused) {
        if (accounts.isAuthenticated === null) {
          setStorageUser('Đăng nhập / Đăng Ký >');
          setIsShowImg(false);
          setEvent(true);
          setInvoiceStatus({
            handle: null,
            processed: null,
            transport: null,
            done: null,
          });
        } else {
          if (accounts.isAuthenticated === true) {
            setIsShowImg(true);
            setDataImg(accounts.result[0].photoUrl);
            setStorageUser(accounts.result[0].name);
            setEvent(false);
            dispatch(
              loadInvoiceUser(
                accounts.result[0]._id,
                `Bearer ${accounts.token}`,
              ),
            );
          } else {
            setStorageUser(accounts.result[0].name);
            setEvent(false);
            // setIsShowImg(true);
            setDataImg(accounts.result[0].photoUrl);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [accounts.isAuthenticated]);
  // console.log(invoiceStatus);

  useEffect(() => {
    try {
      let heart = products.filter((item: any) => item.heart_active);
      setListHeart(heart);
    } catch (err) {
      console.log(err);
    }
  }, [products]);

  useEffect(() => {
    try {
      setInvoiceStatus({
        handle,
        processed,
        transport,
        done,
      });
    } catch (err) {
      console.log(err);
    }
  }, [handle]);

  function eventCart() {
    navigate(HomeName.CART);
  }
  async function eventSettings() {
    navigate(NameScreen.SETTINGS);
  }

  function eventLogInAndRegister() {
    navigate(NameScreen.LOGIN);
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {isShowImg && (
            <View
              style={{
                width: sizes._screen_width / 6.5,
                height: sizes._screen_width / 6.5,
                borderRadius: sizes._screen_width / 2,
                borderColor: ArrayColors._color_black,
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: sizes._screen_width / 7,
                  height: sizes._screen_width / 7,
                  borderRadius: sizes._screen_width / 2,
                }}
                source={{uri: dataImg}}
              />
            </View>
          )}
          <Text style={styles.mStyleTextLoginAndRegister}>{storageUser}</Text>
        </View>
      </Pressable>
    );
  }

  const renderContent = (
    <>
      <View style={styles.mContinerBody}>
        <LoginAndRegister />
        {/* <View>
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
              onPress={() => {
                navigation.navigate(NameScreen.SCREENWALET);
              }}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_giftcard}
              mStringTitles="Thẻ quà tặng"
              styleContent={styles.spaceMax}
              onPress={() => {
                navigation.navigate(NameScreen.SCREENGIF);
              }}
            />
          </View>
        </View> */}
        <View style={styles.space} />
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
              key="confrim_invoice"
              status={1}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_send}
              mStringTitles="Đang xử lý"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.processed}
              onPress={navigateInvoice}
              key="progress_invoice"
              status={2}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_handle}
              mStringTitles="Đang vận chuyển"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.transport}
              onPress={navigateInvoice}
              key="transfrom_invoice"
              status={3}
            />
            <MyOffers
              textOrImg={false}
              mImager={Images.ic_back}
              mStringTitles="Đã hoàn thành"
              styleContent={styles.spaceMax}
              badge={invoiceStatus.done}
              onPress={navigateInvoice}
              key="done_invoice"
              status={4}
            />
          </View>
        </View>
        <View style={styles.spaceSmall} />
        <View style={styles.mStyleMine2}>
          <Text
            style={{
              fontSize: sizes._20sdp,
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              fontWeight: '600',
              marginHorizontal: sizes._18sdp,
              marginTop: sizes._6sdp,
            }}>
            Dịch vụ
          </Text>
          <View style={styles.mStyleMine3_1}>
            <MyOffers
              onPress={gotoQuestions}
              textOrImg={false}
              mImager={Images.ic_headsetphone}
              mStringTitles="Câu hỏi"
              styleContent={styles.spaceMax}
            />
            <MyOffers
              onPress={gotoSupports}
              textOrImg={false}
              mImager={Images.ic_survey_center}
              mStringTitles="Trung tâm khảo sát"
              styleContent={styles.spaceMax}
            />
          </View>
        </View>

        <View style={styles.mStyleFlashList}>
          {/* <AnimatedTab
            animatedValues={animatedValues}
            marginLeft={marginLeft}
            marginRight={marginRight}
            setMarginLeft={setMarginLeft}
            setMarginRight={setMarginRight}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            textLeft="Danh sách yêu thích"
            textRight="Đã xem gần đây"
          /> */}
          <Text style={[styles.textLabel, {marginLeft: sizes._18sdp}]}>
            Danh sách yêu thích
          </Text>
          <View style={styles.space} />
          {accounts.isAuthenticated ? (
            <>
              {listHeart.length != 0 ? (
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
                <View style={styles.boxEmpty}>
                  <Image
                    source={image.heart_empty}
                    resizeMode="contain"
                    style={styles.imgEmpty}
                  />
                  <View style={styles.spaceHeightSmall} />
                  <Text style={styles.textEmptyHeart}>
                    Bạn chưa thích sản phẩm nào
                  </Text>
                  <View style={styles.spaceHeightMedium} />
                  <View></View>
                </View>
              )}
            </>
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
    </>
  );

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
      <View style={{flex: 1}}>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          showsVerticalScrollIndicator={false}
          listKey={'more-service'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreenAccount;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
  },
  mContinerBody: {
    backgroundColor: ArrayColors.darkGrayAccount,
    flex: 1,
  },
  mStyleText: {
    width: sizes._screen_width,
    backgroundColor: ArrayColors._color_white,
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
    marginTop: sizes._18sdp,
    paddingTop: sizes._10sdp,
    borderStartColor: ArrayColors._color_white,
  },
  mStyleTextLoginAndRegister: {
    fontSize: sizes._22sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
  },
  textLink: {
    fontSize: sizes._16sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    color: ArrayColors._color_blue_light,
  },
  textLabel: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
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
    paddingVertical: sizes._10sdp,
  },
  space: {
    height: sizes._18sdp,
    backgroundColor: ArrayColors._color_white,
  },
  spaceSmall: {
    height: sizes._10sdp,
  },
  spaceMax: {
    flex: 1,
  },
  contentFavorite: {
    flex: 1,
    height: sizes._102sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxEmpty: {
    height: sizes._250sdp,
    width: '100%',
    backgroundColor: ArrayColors._color_white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgEmpty: {
    width: sizes._50sdp,
    height: sizes._50sdp,
  },
  spaceHeightSmall: {
    height: sizes._10sdp,
  },
  textEmptyHeart: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
  },
  spaceHeightMedium: {
    height: sizes._18sdp,
  },
});
