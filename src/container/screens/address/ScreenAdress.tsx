import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../../components/input/InputText';
import ButtonSub from '../../../components/button/ButtonSub';
import {useNavigation} from '@react-navigation/native';
import {NameScreen} from '../../navigators/TabNavigator';
import {useSelector} from 'react-redux';
import SelectAddress from '../../../components/modal/SelectAddress';

type Props = {};

const ScreenAdress = (props: Props) => {
  const {province} = useSelector((state: any) => state.address);
  console.log(province);

  const [cityProvince, setcityProvince] = useState('NaNaN');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [codeZip, setCodeZip] = useState('');
  const [payment, setPayment] = useState('');
  const [numberPhone, setNumberPhone] = useState();
  const [idUser, setIdUser] = useState();
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeLastName = (val: string) => setLastName(val);
  const onChangefirstName = (val: string) => setFirstName(val);
  const onChangeOpen = () => setIsOpen(!isOpen);

  const {navigate, goBack}: any = useNavigation();
  const goToOder = () => navigate(NameScreen.ORDER);
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
      <TouchableWithoutFeedback>
        <View style={styles.citySeleted}>
          <View style={[styles.spaceWidth, {justifyContent: 'space-around'}]}>
            <Text style={styles.textPlaholder}>* Thành phố</Text>
            <Text style={styles.textSub}>{cityProvince}</Text>
          </View>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="chevron-forward"
              size={sizes._24sdp}
              color={ArrayColors._color_black}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <InputText
        hint="* Họ"
        value={firstName}
        onChangeText={onChangefirstName}
        onPress={() => setFirstName('')}
      />

      <View style={styles.inline} />
      <InputText
        hint="* Tên"
        value={lastName}
        onChangeText={onChangeLastName}
        onPress={() => setLastName('')}
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
          <InputText hint="* Số điện thoại" value="" />
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
            value=""
          />
        </View>
      </View>

      <View style={{height: sizes._16sdp}} />
      <InputText hint="* Tỉnh" />
      <View style={styles.inline} />
      <InputText hint="* Quận / Huyện" />
      <View style={styles.inline} />
      <InputText hint="* Mã bưu điện" />
      <View style={styles.inline} />
      <InputText hint="* Địa chỉ" />
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
        <SelectAddress isOpen={false} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenAdress;

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
    marginVertical: sizes._16sdp,
    height: sizes._80sdp,
    paddingHorizontal: sizes._16sdp,
    flexDirection: 'row',
  },
  textPlaholder: {
    fontSize: sizes._14sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  textSub: {
    fontSize: sizes._20sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
    marginLeft: sizes._8sdp,
    fontWeight: '700',
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
