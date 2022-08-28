import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import image from '../../../res/require/Images';
import AppHeader from '../../../components/header/AppHeader';
import CustomeStar from '../../../components/ratiings/CustomeStar';
import ImagePicker from 'react-native-image-picker';
import Images from '../../../res/require/Images';

const RatingProduct = ({navigation}: any) => {
  const [selectedImage, setSelectedImage] = React.useState<string | any>(null);
  const [croppedImage, setCroppedImage] = React.useState<string | any>(null);
  //lấy value text nhập
  const [noteValue, setNoteValue] = React.useState<string | any>();

  // imgpicker
  function eventUpLoadFileImager() {
    ImagePicker.showImagePicker(
      {
        maxWidth: 800,
        maxHeight: 600,
      },
      response => {
        if (response.error) {
          console.log('image error');
          console.log(response.error);
          setSelectedImage(Images.user_no_bgr);
        } else {
          console.log('Image: ' + response.uri);
          setSelectedImage({uri: response.uri});
          setCroppedImage(response.uri);
        }
      },
    );
  }
  // custom HEADER
  function HeaderContent() {
    return (
      <View style={styles.containerHeader}>
        <IconHeader
          name="chevron-back"
          sizes={sizes._24sdp}
          color={ArrayColors._color_black}
          style={styles.iconHeader}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contentHeader}>
          <Text style={styles.textLabel}>Đánh giá sản phẩm</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  //   renderBody
  const bodyRender = (
    <View style={styles.mContainerBody}>
      {/* tên và phân loại sản phẩm */}
      <View
        style={[
          styles.mBody,
          {
            borderBottomColor: ArrayColors.gray_custom,
            borderBottomWidth: sizes._1sdp,
            paddingBottom: sizes._10sdp,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image source={Images.ao_nam} style={styles.img_product} />
          <View style={styles.mtitleContainer}>
            <Text style={styles.mTitle_name}>{'Tên sản phẩm'}</Text>
            <Text style={styles.mTitle_cate}>{'Phân loại: XS'}</Text>
          </View>
        </View>
      </View>
      {/* đánh giá sao */}
      <View style={styles.mBody}>
        <View style={styles.mStar}>
          <Text style={styles.mTitle_star}>Đánh giá sao:</Text>
          <CustomeStar defaultRating={5} />
        </View>
      </View>

      {/* đánh giá hình ảnh */}
      <View
        style={[
          styles.mBody,
          {alignItems: 'center', paddingTop: sizes._15sdp},
        ]}>
        <TouchableOpacity
          onPress={eventUpLoadFileImager}
          style={styles.mLibraryCamera}>
          <Image
            source={Images.ic_camera}
            style={{
              paddingTop: sizes._15sdp,
              width: sizes._28sdp,
              height: sizes._28sdp,
            }}
          />
          <Text style={styles.mTitle_camera}>Thêm hình ảnh</Text>
        </TouchableOpacity>
      </View>
      {/* viết bình luận */}
      <View style={styles.mBody}>
        <Text style={[styles.mTitle_star, {paddingBottom: sizes._12sdp}]}>
          Nội dung
        </Text>
        <TextInput
          style={styles.Note}
          numberOfLines={7}
          textAlignVertical={'top'}
          onChangeText={(val: any) => {
            setNoteValue(val);
          }}
        />
      </View>
      <View style={[styles.mBody, {alignItems: 'flex-end'}]}>
        <TouchableOpacity style={styles.mbutton} onPress={()=>console.log('lưu')}>
          <Text style={styles.mtitle_button}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainer_body}>
        <FlatList
          data={[]}
          renderItem={null}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListFooterComponent={bodyRender}
        />
      </View>
    </View>
  );
};

export default RatingProduct;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContainer_body: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
    borderTopColor: ArrayColors._color_gray,
    borderTopWidth: sizes._1sdp,
  },
  viewConten: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizes._10sdp,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  text: {
    fontSize: sizes._font_size_big_large,
    fontWeight: '200',
    fontStyle: 'normal',
    marginTop: sizes._20sdp,
    color: ArrayColors._color_black,
  },
  mContainerBody: {
    flex: 1,
  },
  mBody: {
    paddingHorizontal: sizes._19sdp,
    paddingTop: sizes._10sdp,
  },
  img_product: {
    width: sizes._60sdp,
    height: sizes._70sdp,
    resizeMode: 'contain',
  },
  mtitleContainer: {
    paddingHorizontal: sizes._12sdp,
    justifyContent: 'center',
  },
  mTitle_name: {
    fontSize: sizes._font_size_large,
    paddingBottom: sizes._12sdp,
    color: ArrayColors.black,
  },
  mTitle_cate: {
    fontSize: sizes._font_size_large,
    paddingBottom: sizes._12sdp,
  },
  mStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mTitle_star: {
    fontSize: sizes._font_size_big_large,
    color: ArrayColors.black,
    fontWeight: '500',
    paddingRight: sizes._12sdp,
  },
  mLibraryCamera: {
    width: sizes._screen_width / 2,
    height: sizes._55sdp,
    backgroundColor: ArrayColors._color_white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ArrayColors._color_black,
    borderWidth: sizes._1sdp,
    borderRadius: sizes._5sdp,
  },
  mTitle_camera: {
    fontSize: sizes._font_size_large,
    color: ArrayColors.black,
  },
  Note: {
    borderColor: ArrayColors.gray_custom,
    borderWidth: 1,
    backgroundColor: ArrayColors.gray_bg_light,
    paddingHorizontal: sizes._15sdp,
  },
  mbutton: {
    width: sizes._120sdp,
    height: sizes._50sdp,
    borderColor: ArrayColors.gray_custom,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ArrayColors._color_black,
  },
  mtitle_button: {
    color: ArrayColors._color_white,
    fontSize: sizes._font_size_big,
    fontWeight: '600',
  },
});
