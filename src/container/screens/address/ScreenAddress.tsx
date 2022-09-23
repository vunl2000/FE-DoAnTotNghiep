import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../../components/input/InputText';
import ButtonSub from '../../../components/button/ButtonSub';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';
import SelectAddress from '../../../components/modal/SelectAddress';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress, loadProvince} from '../../../store/actions/addressActions';
import SelectDistrict from '../../../components/modal/SelectDistrict';
import SelectCommune from '../../../components/modal/SelectCommune';
import {API_COMMUNE, API_DISTRICT} from '@env';
import axios from 'axios';
import {showToast} from '../../../components/modal/ToastCustom';
import {isVietnamesePhoneNumber} from '../../../utils/Utilities';

type Props = {};
interface TextValue {
  value: string;
  err: string;
}
interface Address {
  numberPhone: string;
  subNumberPhone: string;
  lastName: string;
  firstName: string;
  fullAddress: string;
  cityProvince: string;
  district: string;
  commune: string;
  codeZip: string;
}

const ScreenAddress = (props: Props) => {
  const {listAddress} = useSelector((state: any) => state.address);

  const [cityProvince, setcityProvince] = useState({
    code: null,
    name: 'Thành phố',
    err: '',
  });

  const [lastName, setLastName] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [firstName, setFirstName] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [codeZip, setCodeZip] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [isAddress, setIsAddress] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [numberPhone, setNumberPhone] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [subNumberPhone, setSubNumberPhone] = useState<TextValue>({
    value: '',
    err: '',
  });
  const [idUser, setIdUser] = useState();
  const [isSave, setIsSave] = useState(false);

  const [district, setDistrict] = useState({
    code: null,
    name: 'Quận / Huyện',
    err: '',
  });

  const [commune, setCommune] = useState({
    code: null,
    name: 'Xã / Phường',
    err: '',
  });
  const loadDistrics = async (province: number | any) => {
    await axios({
      method: 'GET',
      url: API_DISTRICT,
      headers: {},
      params: {province: province},
    })
      .then(res => {
        setListDistrict(res.data.results);
      })
      .catch(err => {
        //console.log(err);
      });
  };
  const loadCommune = async (district: number | any) => {
    await axios({
      method: 'GET',
      url: API_COMMUNE,
      headers: {},
      params: {district: district},
    })
      .then(res => {
        setListCommune(res.data.results);
      })
      .catch(err => {});
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedCommune, setIsSelectedCommune] = useState(false);
  const [isSelectedDistrict, setIsSelectedDistrict] = useState(false);

  const onChangeCityProvince = (code: number | any, name: string | any) =>
    setcityProvince({code, name, err: ''});
  const onChangeDistrict = (code: number | any, name: string | any) =>
    setDistrict({code, name, err: ''});
  const onChangeCommune = (code: number | any, name: string | any) =>
    setCommune({code, name, err: ''});

  const onChangeLastName = (val: string) => setLastName({value: val, err: ''});
  const onChangefirstName = (val: string) =>
    setFirstName({value: val, err: ''});
  const onChangeNumber = (val: any) => setNumberPhone({value: val, err: ''});
  const onChangecodeZip = (val: any) => setCodeZip({value: val, err: ''});
  const onChangeAddress = (val: any) => setIsAddress({value: val, err: ''});
  const onChangeSubNumber = (val: any) =>
    setSubNumberPhone({value: val, err: ''});

  const onChangeOpen = () => setIsOpen(!isOpen);
  const onChangeSeletedDistrict = () =>
    setIsSelectedDistrict(!isSelectedDistrict);
  const onChangeSeletedCommune = () => {
    setIsSelectedCommune(!isSelectedCommune);
  };
  const dispatch: any = useDispatch();
  const {navigate, goBack}: any = useNavigation();
  const goToOder = () => {
    let check = true;
    if (cityProvince.code == null) {
      setcityProvince(prevState => ({
        ...prevState,
        err: 'Bạn chưa chọn thành phố',
      }));
      check = false;
    }

    if (district.code == null) {
      setDistrict(prevState => ({
        ...prevState,
        err: 'Bạn chưa chọn quận / huyện',
      }));
      check = false;
    }

    if (commune.code == null) {
      setCommune(prevState => ({
        ...prevState,
        err: 'Bạn chưa chọn xã / phường',
      }));
      check = false;
    }

    if (lastName.value.trim().length <= 0) {
      setLastName(prevState => ({
        ...prevState,
        err: 'Tên không được bỏ trống',
      }));
      check = false;
    }

    if (firstName.value.trim().length <= 0) {
      setFirstName(prevState => ({
        ...prevState,
        err: 'Họ không được bỏ trống',
      }));
      check = false;
    }

    if (numberPhone.value.trim().length <= 0) {
      setNumberPhone(prevState => ({
        ...prevState,
        err: 'Số điện thoại không được bỏ trống',
      }));
      check = false;
    }

    if (numberPhone.value.trim().length <= 0) {
      setNumberPhone(prevState => ({
        ...prevState,
        err: 'Số điện thoại không được bỏ trống',
      }));
      check = false;
    } else if (!isVietnamesePhoneNumber(numberPhone.value)) {
      setNumberPhone(prevState => ({
        ...prevState,
        err: 'Số điện thoại không đúng dịnh dạng.',
      }));
      check = false;
    }

    if (
      !isVietnamesePhoneNumber(subNumberPhone.value) &&
      subNumberPhone.value.length > 0
    ) {
      setNumberPhone(prevState => ({
        ...prevState,
        err: 'Số SĐT thay thế không đúng dịnh dạng.',
      }));
      check = false;
    }

    if (codeZip.value.trim().length <= 0) {
      setCodeZip(prevState => ({
        ...prevState,
        err: 'Mã bưu điện không được bỏ trống',
      }));
      check = false;
    }
    if (isAddress.value.trim().length <= 0) {
      setIsAddress(prevState => ({
        ...prevState,
        err: 'Địa chỉ chi tiết không được bỏ trống',
      }));
      check = false;
    }

    if (check) {
      const address: Address = {
        numberPhone: numberPhone.value,
        subNumberPhone: subNumberPhone.value,
        lastName: lastName.value,
        firstName: firstName.value,
        fullAddress: isAddress.value,
        cityProvince: cityProvince.name,
        district: district.name,
        commune: commune.name,
        codeZip: codeZip.value,
      };
      showToast('Lưu địa chỉ thành công!');
      dispatch(addAddress(address, isSave));
      goBack();
    }
  };
  const onBackPress = () => goBack();

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
        <Text style={styles.textLabel}>Địa chỉ giao hàng</Text>
      </View>
      <View style={styles.spaceIcon} />
    </View>
  );

  const renderContent = (
    <>
      <TouchableWithoutFeedback onPress={onChangeOpen}>
        <View style={[styles.citySeleted, {marginVertical: sizes._16sdp}]}>
          <View style={[styles.spaceWidth, {paddingTop: sizes._8sdp}]}>
            <Text style={styles.textPlaholder}>* Thành phố</Text>
            <Text style={styles.textSub}>{cityProvince.name}</Text>
            <Text style={styles.textError}>{cityProvince.err}</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-forward"
              size={sizes._24sdp}
              color={ArrayColors._color_black}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <InputText
        hint="* Họ"
        value={firstName.value}
        onChangeText={onChangefirstName}
        onPress={() => setFirstName({value: '', err: ''})}
        placeholder="Nhập họ"
        error={firstName.err}
      />
      <View style={styles.inline} />
      <InputText
        hint="* Tên"
        value={lastName.value}
        onChangeText={onChangeLastName}
        onPress={() => setLastName({value: '', err: ''})}
        placeholder="Nhập tên"
        error={lastName.err}
      />
      <View style={styles.inline} />

      <View style={styles.phoneNumber}>
        <Text
          style={[
            styles.textLabel,
            {marginLeft: sizes._16sdp, marginRight: sizes._8sdp},
          ]}>
          VN +84
        </Text>
        <View style={styles.spaceWidth}>
          <InputText
            hint="* Số điện thoại"
            value={numberPhone.value}
            onChangeText={onChangeNumber}
            onPress={() => setNumberPhone({value: '', err: ''})}
            placeholder="Nhập số điện thoại"
            error={numberPhone.err}
            typeKey="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inline} />

      <View style={styles.phoneNumber}>
        <Text
          style={[
            styles.textLabel,
            {marginLeft: sizes._16sdp, marginRight: sizes._8sdp},
          ]}>
          VN +84
        </Text>
        <View style={styles.spaceWidth}>
          <InputText
            hint="* Số điện thoại thay thế (không bắt buộc)"
            value={subNumberPhone.value}
            onChangeText={onChangeSubNumber}
            onPress={() => setSubNumberPhone({value: '', err: ''})}
            placeholder="Nhập SĐT thay thế"
            typeKey="phone-pad"
          />
        </View>
      </View>

      <View style={{height: sizes._16sdp}} />
      <TouchableWithoutFeedback onPress={onChangeSeletedDistrict}>
        <View style={styles.citySeleted}>
          <View style={[styles.spaceWidth, {paddingTop: sizes._8sdp}]}>
            <Text style={styles.textPlaholder}>* Quận / Huyện</Text>
            <Text style={styles.textDefault}>{district.name}</Text>
            <Text style={styles.textError}>{district.err}</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-forward"
              size={sizes._24sdp}
              color={ArrayColors._color_black}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inline} />
      <TouchableWithoutFeedback onPress={onChangeSeletedCommune}>
        <View style={styles.citySeleted}>
          <View style={[styles.spaceWidth, {paddingTop: sizes._8sdp}]}>
            <Text style={styles.textPlaholder}>* Xã / Phường</Text>
            <Text style={styles.textDefault}>{commune.name}</Text>
            <Text style={styles.textError}>{commune.err}</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="chevron-forward"
              size={sizes._24sdp}
              color={ArrayColors._color_black}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inline} />
      <InputText
        hint="* Mã bưu điện"
        value={codeZip.value}
        placeholder="Nhập mã bưu điện"
        onChangeText={onChangecodeZip}
        onPress={() => setCodeZip({value: '', err: ''})}
        error={codeZip.err}
      />
      <View style={styles.inline} />
      <InputText
        hint="* Địa chỉ"
        value={isAddress.value}
        placeholder="Nhập địa chỉ"
        onChangeText={onChangeAddress}
        onPress={() => setIsAddress({value: '', err: ''})}
        error={isAddress.err}
      />
      <View style={styles.citySeleted}>
        <View style={[styles.spaceWidth, {justifyContent: 'center'}]}>
          <Text style={styles.textSub}>Đặt làm địa chỉ mặc định</Text>
        </View>
        <Switch
          trackColor={{
            false: ArrayColors.white,
            true: ArrayColors._color_black,
          }}
          thumbColor={ArrayColors._color_white}
          value={isSave}
          onValueChange={() => setIsSave(!isSave)}
        />
      </View>
    </>
  );

  useEffect(() => {
    dispatch(loadProvince());
  }, []);

  useEffect(() => {
    if (cityProvince.code) {
      loadDistrics(cityProvince.code);
      setDistrict({code: null, name: 'Quận / Huyện', err: ''});
      setCommune({code: null, name: 'Xã / Phường', err: ''});
    }
  }, [cityProvince.code]);

  useEffect(() => {
    if (district.code) {
      setCommune({code: null, name: 'Xã / Phường', err: ''});
      loadCommune(district.code);
    }
  }, [district.code]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AppHeader content customContent={<HeaderContent />} />
        <View style={styles.content}>
          <FlatList
            data={null}
            renderItem={null}
            ListFooterComponent={renderContent}
            listKey="screen_adress"
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
          />
          <View style={styles.btnSave}>
            <ButtonSub
              size="lager"
              bgColor="black"
              value="Lưu"
              onPress={goToOder}
            />
          </View>
        </View>
        <SelectAddress
          isOpen={isOpen}
          onChangeOpen={onChangeOpen}
          onChangeCityProvince={onChangeCityProvince}
          cityProvince={cityProvince}
        />
        <SelectDistrict
          isOpen={isSelectedDistrict}
          onChangeOpen={onChangeSeletedDistrict}
          onChangeDistrict={onChangeDistrict}
          valueSelected={district}
          district={listDistrict}
        />
        <SelectCommune
          isOpen={isSelectedCommune}
          onChangeCommune={onChangeCommune}
          onChangeOpen={onChangeSeletedCommune}
          valueSelected={commune}
          commune={listCommune}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenAddress;

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
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  spaceIcon: {
    width: sizes._42sdp,
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
  },
  btnSave: {
    padding: sizes._16sdp,
  },
  citySeleted: {
    backgroundColor: ArrayColors._color_white,
    height: sizes._80sdp,
    paddingHorizontal: sizes._16sdp,
    flexDirection: 'row',
  },
  textDefault: {
    flex: 1,
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: sizes._10sdp,
    textAlignVertical: 'center',
  },
  textError: {
    fontSize: sizes._16sdp,
    color: ArrayColors._color_red_dark,
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: sizes._10sdp,
    textAlignVertical: 'center',
  },
  textPlaholder: {
    fontSize: sizes._14sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    flex: 1,
    fontSize: sizes._20sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    marginLeft: sizes._8sdp,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  spaceWidth: {
    flex: 1,
  },
  iconClear: {
    position: 'absolute',
    right: sizes._16sdp,
    zIndex: 10,
  },
  contentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
  icon: {
    marginLeft: sizes._10sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inline: {
    height: sizes._1sdp,
  },
  phoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
});
