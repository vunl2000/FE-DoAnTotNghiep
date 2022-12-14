import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Icons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {onStoreApp, version} from '../../../utils/StoreApp';
import {NameScreen} from '../../navigators/TabNavigator';
import {logOut} from '../../../store/actions/loginActions';
import {persistor} from '../../../store';

const ScreensSettings = ({navigation}: any) => {
  const [event, setEvent] = React.useState<string | any>(true);
  const dispatch: string | any = useDispatch();
  const accounts = useSelector((state: any) => state.account);
  const [storageUser, setStorageUser] = React.useState<string | any>(
    'Đăng nhập / Đăng Ký ',
  );

  React.useLayoutEffect(() => {
    try {
      console.log('acccccccc', accounts);
      if (accounts.isAuthenticated === null) {
        console.log('undefined');
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

  function eventLogOut() {
    console.log('pl');

    dispatch(logOut());
    //persistor.purge();
  }
  function eventLogInAndRegister() {
    navigation.navigate('ScreenLogin');
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
          {
            backgroundColor: ArrayColors._color_white,
            flexDirection: 'row',
          },
        ]}
        onPress={event ? eventLogInAndRegister : null}>
        <View>
          <Text
            style={{
              fontSize: sizes._20sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              lineHeight: sizes._32sdp,
              color: ArrayColors._color_black,
            }}>
            {storageUser}
          </Text>
        </View>
      </Pressable>
    );
  }

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
          <Text style={styles.textLabel}>CÀI ĐẶT</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  function Renderview() {
    return (
      <View>
        {/* Tên user */}
        <View style={styles.item_container}>
          <View style={styles.item_conten}>
            <LoginAndRegister />
          </View>
        </View>

        {/* Phần 2 */}
        <View style={styles.item_container}>
          {/* Vị trí */}
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Vị trí'}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title_conten}>VN</Text>
              <TouchableOpacity>
                <Icons
                  name="chevron-forward"
                  size={24}
                  color={ArrayColors._color_black}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: sizes._screen_width,
              backgroundColor: ArrayColors.gray,
            }}></View>
          {/* Địa chỉ */}
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Địa chỉ'}</Text>
            <TouchableOpacity>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần 3 */}

        <View style={styles.item_container}>
          {/*Đánh giá phản hồi*/}
          <TouchableOpacity onPress={onStoreApp} style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Đánh giá và Phản hồi'}</Text>
            <View>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: sizes._screen_width,
              backgroundColor: ArrayColors.gray,
            }}></View>
          {/* Ứng dụng của tôi*/}
          <TouchableOpacity onPress={onStoreApp} style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Ứng dụng của tôi'}</Text>
            <View>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: sizes._screen_width,
              backgroundColor: ArrayColors.gray,
            }}></View>
          {/* Giới thiệu */}
          <TouchableOpacity
            onPress={() => navigation.navigate(NameScreen.INTRODUCE)}
            style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Giới thiệu'}</Text>
            <View>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Đổi mật khẩu */}
        <View style={styles.item_container}>
          {/* Xác thực tài khoản */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NameScreen.SCREENOTPSETTING);
            }}
            style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Xác thực tài khoản'}</Text>
            <View>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: sizes._screen_width,
              backgroundColor: ArrayColors.gray,
            }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NameScreen.CHANGEPASS);
            }}
            style={styles.item_conten}>
            <Text style={styles.title_conten}>Đổi mật khẩu</Text>
            <View>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Đăng xuất */}
        <View style={styles.item_container}>
          <View style={styles.item_conten}>
            <TouchableOpacity
              onPress={eventLogOut}
              style={styles.item_tochable}>
              <Text style={styles.title_tochable}>{'Đăng xuất'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainerBody}>
        <FlatList
          renderItem={null}
          data={[]}
          ListFooterComponent={Renderview}
          listKey="screen_settings"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
        {/* version */}
        <View style={styles.version}>
          <View style={styles.item_conten}>
            <Text style={styles.text_version}>{'Phiên bản V\t' + version}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreensSettings;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white_gray,
  },
  mContainerBody: {
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
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._24sdp,
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_container: {
    backgroundColor: ArrayColors._color_white,
    marginTop: sizes._16sdp,
  },
  item_conten: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: sizes._19sdp,
  },
  title_conten: {
    fontSize: sizes._15sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
  },
  title_user: {
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: sizes._32sdp,
    color: ArrayColors._color_black,
  },
  title_tochable: {
    fontSize: sizes._20sdp,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: sizes._32sdp,
    color: ArrayColors.ruby,
  },
  item_tochable: {
    width: '100%',
    alignItems: 'center',
  },
  version: {
    marginBottom: sizes._13sdp,
    alignItems: 'center',
  },
  text_version: {
    fontSize: sizes._15sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: ArrayColors._color_black,
  },
});
