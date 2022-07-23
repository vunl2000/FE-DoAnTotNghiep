import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import Icons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {onStoreApp, version} from '../../../utils/StoreApp';
import {NameScreen} from '../../navigators/TabNavigator';

const ScreensSettings = ({navigation}: any) => {
  const [event, setEvent] = React.useState<string | any>(true);

  const accounts = useSelector((state: any) => state.account);
  const [storageUser, setStorageUser] = React.useState<string | any>(
    'Đăng nhập / Đăng Ký ',
  );

  React.useLayoutEffect(() => {
    try {
      console.log('acccccccc', accounts.result[0].name);
      if (accounts === undefined) {
        console.log('undefined');
        //setStorageUser('Đăng nhập / Đăng Ký >');
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
  }, [accounts]);
  const CheckLogin = () => {
    if (accounts.isAuthenticated === true) {
      navigation.navigate(NameScreen.HOME);
    } else {
      navigation.navigate(NameScreen.LOGIN_AND_REGISTER);
    }
  };

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
          <Text style={styles.textLabel}>Cài đặt</Text>
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
            <Text style={styles.title_user}>{storageUser}</Text>
            <TouchableOpacity onPress={CheckLogin}>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
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
          {/* Xác thực tài khoản */}
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Xác thực tài khoản'}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NameScreen.SCREENOTPSETTING);
              }}>
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
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Đánh giá và Phản hồi'}</Text>
            <TouchableOpacity onPress={onStoreApp}>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
          </View>
          {/* Ứng dụng của tôi*/}
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Ứng dụng của tôi'}</Text>
            <TouchableOpacity onPress={onStoreApp}>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
          </View>
          {/* Giới thiệu */}
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>{'Giới thiệu'}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(NameScreen.INTRODUCE)}>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Đổi mật khẩu */}
        <View style={styles.item_container}>
          <View style={styles.item_conten}>
            <Text style={styles.title_conten}>Đổi mật khẩu</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NameScreen.CHANGEPASS);
              }}>
              <Icons
                name="chevron-forward"
                size={24}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Đăng xuất */}

        <View style={styles.item_container}>
          <View style={styles.item_conten}>
            <TouchableOpacity style={styles.item_tochable}>
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
            <Text style={styles.text_version}>{'Phiên bản V' + version}</Text>
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
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
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
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: ArrayColors._color_black,
  },
  title_user: {
    fontSize: sizes._21sdp,
    fontWeight: '600',
    fontFamily: 'OpenSans',
    color: ArrayColors._color_black,
  },
  title_tochable: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans',
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
    color: ArrayColors.gray,
  },
});
