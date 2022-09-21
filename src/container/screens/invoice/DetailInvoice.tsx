import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageURISource,
  Image,
  TextInput,
  TouchableNativeFeedback,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import Pay from '../../../components/order/Pay';
import {Address} from '../../../store/reducer/addressReducer';
import {useSelector} from 'react-redux';
import Location from '../../../components/order/Location';
import InvoiceItemDetail from '../../../components/invoice/InvoiceItemDetail';
import SaleProDuct from '../../../components/order/SaleProDuct';
import {formartMoney, makeId} from '../../../utils/Utilities';
import ImagePicker from 'react-native-image-picker';
import {Chip, Divider} from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/vi';
import ButtonSub from '../../../components/button/ButtonSub';
import {Modal, Portal, Text as Textpp, Provider} from 'react-native-paper';
import image from '../../../res/require/Images';
import CustomeStar from '../../../components/ratiings/CustomeStar';
import axios from 'axios';
import {showToast} from '../../../components/modal/ToastCustom';
import {API_URL, RATE_COMENT_PRODUCT} from '@env';

type Props = {};

const sendToComment = async (
  userName: any,
  photoUrl: any,
  content: any,
  croppedImage: any,
  idUser: any,
  idProduct: any,
  isStars: any,
  token: any,
) => {
  const data = new FormData();

  data.append('userName', userName);
  croppedImage !== null &&
    data.append('croppedImage', {
      name: makeId(6) + '_image.jpg',
      uri: croppedImage,
      type: 'image/jpg',
    });
  data.append('photoUrl', photoUrl);
  data.append('content', content);
  data.append('idUser', idUser);
  data.append('idProduct', idProduct);

  isStars === 1
    ? data.append('oneStars', '1')
    : isStars === 2
    ? data.append('twoStars', '2')
    : isStars === 3
    ? data.append('threeStars', '3')
    : isStars === 4
    ? data.append('fourStars', '4')
    : data.append('fiveStars', '5');

  console.log(data);
  console.log(token);
  await axios({
    method: 'POST',
    url: API_URL + RATE_COMENT_PRODUCT,
    headers: {
      token: token,
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  })
    .then(response => {
      console.log('Cac', response.data);
      showToast('Đánh giá sản phẩm thành công!');
    })
    .catch(error => {
      console.log(error.response.data);
      showToast('Đánh giá sản phẩm thất bại!');
    });
};

const keyExtractor = (item: any) => item._id;

const DetailInvoice = (props: Props) => {
  //navigate
  const {goBack, navigate}: any = useNavigation();

  const route: any = useRoute();

  //State
  const [address, setAddress] = useState<Address>();
  const [content, setContent] = useState<any>(null);
  const [price, setPrice] = useState(0);
  const [start, setStart] = useState(5);
  const [sumQty, setSumQty] = useState(0);
  const {billDetail, isComment}: any = route?.params;
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | any>(null);
  const [croppedImage, setCroppedImage] = React.useState<string | any>(null);
  const accounts = useSelector((state: any) => state.account);
  //Actions
  console.log(croppedImage);
  const onBackPress = () => goBack();

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const changeStart = (val: number) => {
    setStart(val);
  };

  const submitComment = () => {
    if (content != null) {
      billDetail.billDetails.forEach((item: any) => {
        sendToComment(
          accounts.result[0].name,
          accounts.result[0].photoUrl,
          content,
          croppedImage,
          accounts.result[0]._id,
          item._id,
          start,
          `Bearer ${accounts.token}`,
        );
      });
    } else {
      showToast('Vui lòng cho chúng tôi biết nhận xét của bạn!');
    }
  };

  const eventUpLoadFileImager = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchImageLibrary(
          {
            maxWidth: 800,
            maxHeight: 600,
          },
          response => {
            if (response.error) {
              console.log('image error');
              console.log(response.error);
              setSelectedImage(image.ic_camera);
            } else {
              console.log('Image: ' + response.uri);
              setSelectedImage({uri: response.uri});
              setCroppedImage(response.uri);
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  //Header
  const HearderModalContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={hideModal}
      />
      <View style={styles.contentHeader}>
        <Text style={styles.textLabel}>Đánh giá sản phẩm</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );

  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={onBackPress}
      />
      <View style={styles.contentHeader}>
        <Text style={styles.textLabel}>Chi tiết đơn đặt hàng</Text>
      </View>
      <View style={{width: sizes._42sdp}} />
    </View>
  );

  //Color
  const Active = () => (
    <View style={styles.active}>
      <View style={styles.spaceMedium} />
      <Text style={styles.textSub}>Đặt mua sản phẩm ({sumQty} sản phẩm)</Text>
      <View style={styles.spaceMedium} />
      <View style={[styles.containerHeader, {alignItems: 'center'}]}>
        <View
          style={[
            styles.color,
            {
              backgroundColor:
                billDetail.status === 0
                  ? ArrayColors.red
                  : billDetail.status === 1
                  ? ArrayColors.green
                  : billDetail.status === 2
                  ? ArrayColors.skyBlue
                  : ArrayColors._color_orange,
              marginRight: sizes._18sdp,
            },
          ]}
        />

        <Text style={styles.textSub}>
          {billDetail.status === 0
            ? 'Chờ xác nhận'
            : billDetail.status === 1
            ? 'Đang xử lý'
            : billDetail.status === 2
            ? 'Đang vận chuyển'
            : 'Đã hoàn thành'}
        </Text>
      </View>
    </View>
  );
  console.log(start);

  const renderItem = ({item, index}: any) => (
    <InvoiceItemDetail item={item} index={index} />
  );

  const ListProduct = () => (
    <FlatList
      data={billDetail.billDetails}
      extraData={billDetail.billDetails}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      bounces={false}
      removeClippedSubviews
      scrollEventThrottle={32}
      listKey="deatil-handle-bill"
    />
  );
  const renderModal = (
    <>
      <View style={{width: '100%'}}>{billDetail ? <ListProduct /> : null}</View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <CustomeStar defaultRating={start} onPress={changeStart} />
      </View>
      <View style={styles.spaceMedium} />

      <View style={styles.img}>
        <TouchableNativeFeedback onPress={eventUpLoadFileImager}>
          <View style={styles.showImg}>
            <Image
              source={selectedImage ? selectedImage : image.ic_camera}
              style={{
                width: sizes._120sdp,
                height: sizes._120sdp,
              }}
              resizeMode="cover"
            />
          </View>
        </TouchableNativeFeedback>

        <View style={styles.spaceMediumX} />
        <TextInput
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          underlineColorAndroid="transparent"
          placeholder="Nhận xét của bạn"
          style={styles.textInput}
          value={content}
          onChangeText={(val: any) => setContent(val)}
        />
      </View>
      <View style={styles.spaceMedium} />
      <View
        style={[
          styles.content,
          {
            flexDirection: 'row',
            paddingHorizontal: sizes._18sdp,
            justifyContent: 'space-around',
          },
        ]}>
        <Chip icon="information" onPress={() => setContent('Sản phẩm oke')}>
          Sản phẩm oke
        </Chip>
        <Chip icon="information" onPress={() => setContent('Rất đáng tiền')}>
          Rất đáng tiền
        </Chip>
      </View>
      <View style={styles.spaceMedium} />
      <View
        style={[
          styles.content,
          {
            flexDirection: 'row',
            paddingHorizontal: sizes._18sdp,
            justifyContent: 'space-around',
          },
        ]}>
        <Chip icon="information" onPress={() => setContent('Không hài lòng')}>
          Không hài lòng
        </Chip>
        <Chip icon="information" onPress={() => setContent('Giao hàng chậm')}>
          Giao hàng chậm
        </Chip>
      </View>
      <View style={styles.spaceMedium} />
    </>
  );

  const renderContent = (
    <>
      <View style={styles.spaceMedium} />
      <Pay label="Phương thức thanh toán" />
      <Location address={billDetail} iconLefts={false} onPress={() => {}} />

      <View style={styles.spaceMedium} />
      <Active />
      {billDetail ? <ListProduct /> : null}
      <View style={styles.spaceMedium} />
      <SaleProDuct
        sumPrice={price}
        priceTranSport={billDetail.transportFee}
        salePrice={0}
      />
      <Divider />
      <View style={styles.allContent}>
        <Text style={[styles.textLabel, styles.content]}>Tổng cộng:</Text>
        <Text style={styles.textLabel}>{formartMoney(price)}</Text>
      </View>
      <View style={styles.spaceMedium} />
      <View
        style={[
          styles.active,
          {
            marginBottom: sizes._18sdp,
          },
        ]}>
        <View style={styles.spaceMedium} />
        <Text style={styles.textSub}>Thông tin đơn đặt hàng</Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textPlaholder}>Số đơn hàng</Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textDefault}>{billDetail.billingEncode}</Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textPlaholder}>Thời gian đặt hàng</Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textDefault}>
          {moment(billDetail.createdAt).format('MMMM Do YYYY, h:mm:ss')}
        </Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textPlaholder}>Phương pháp vận chuyển</Text>
        <View style={styles.spaceSmall} />
        <Text style={styles.textDefault}>Ship COD</Text>
        <View style={styles.spaceMedium} />
      </View>
    </>
  );
  //lifecycle

  useEffect(() => {
    if (billDetail) {
      let price = 0;
      let qty = 0;
      billDetail.billDetails.forEach((item: any) => {
        price += item.quantity * item.price;
        qty += item.quantity;
      });
      setPrice(price + billDetail.transportFee);
      setSumQty(qty);
    }
  }, [billDetail]);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <AppHeader content customContent={<HeaderContent />} />
        <View style={styles.content}>
          <FlatList
            data={null}
            renderItem={null}
            ListFooterComponent={renderContent}
            listKey="screen_oder"
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
          />
        </View>
        {isComment ? (
          <View style={styles.btnCreatBill}>
            <ButtonSub
              bgColor="black"
              value="Đánh giá sản phẩm"
              onPress={showModal}
            />
          </View>
        ) : null}
        <Portal>
          <Modal
            visible={visible}
            dismissable={false}
            contentContainerStyle={styles.contentModal}>
            <View style={styles.content}>
              <AppHeader content customContent={<HearderModalContent />} />
              <FlatList
                data={null}
                renderItem={null}
                ListFooterComponent={renderModal}
              />
              <View style={styles.btnCreatBill}>
                <ButtonSub
                  bgColor="black"
                  value="Đánh giá sản phẩm"
                  onPress={submitComment}
                />
              </View>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};

export default DetailInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  active: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentModal: {
    flex: 1,
    width: sizes._screen_width,
    height: sizes._screen_height,
    backgroundColor: ArrayColors._color_white,
  },
  textLabel: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    fontSize: sizes._22sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  textPlaholder: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  columeMedium: {
    height: sizes._72sdp,
  },
  spaceMedium: {
    height: sizes._18sdp,
  },
  spaceMediumX: {
    width: sizes._18sdp,
  },
  spaceSmall: {
    height: sizes._10sdp,
  },
  btnCreatBill: {
    backgroundColor: ArrayColors._color_white,
    padding: sizes._18sdp,
    shadowColor: ArrayColors._color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  allContent: {
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
    height: sizes._72sdp,
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
  color: {
    width: sizes._12sdp,
    height: sizes._12sdp,
    borderRadius: sizes._12sdp / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  img: {
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
  },
  showImg: {
    backgroundColor: ArrayColors.light,
    justifyContent: 'center',
  },
  textInput: {
    borderColor: ArrayColors.gray,
    borderWidth: sizes._1sdp,
    flex: 1,
    paddingHorizontal: sizes._10sdp,
    textAlignVertical: 'top',
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
});
