import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import IconHeader from '../../../components/icons/IconHeader';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import AppHeader from '../../../components/header/AppHeader';
import ButtonSub from '../../../components/button/ButtonSub';
import {useSelector} from 'react-redux';
import ListAddressItem from '../../../components/address/ListAddress.Item';
import image from '../../../res/require/Images';
import {NameScreen} from '../../navigators/TabNavigator';

type Props = {};

const ScreenListAddress = (props: Props) => {
  const [list, setList] = useState([]);
  const {listAddress} = useSelector((state: any) => state.address);
  const {navigate, goBack}: any = useNavigation();

  const goToAddress = () => navigate(NameScreen.ADDRESS);

  useEffect(() => {
    setList(listAddress);
  }, [listAddress]);

  const HeaderContent = () => (
    <View style={styles.containerHeader}>
      <IconHeader
        name="chevron-back"
        sizes={sizes._24sdp}
        color={ArrayColors._color_black}
        style={styles.iconHeader}
        onPress={() => goBack()}
      />
      <View style={styles.contentHeader}>
        <Text style={styles.textLabel}>Địa chỉ của tôi</Text>
      </View>
      <View style={styles.spaceIcon} />
    </View>
  );

  const renderItem = ({item, index}: any) => <ListAddressItem item={item} />;

  const keyExtractor = (item: any) => item.id;

  const renderContent = (
    <>
      {list.length > 0 ? (
        <View style={styles.content}>
          <FlatList data={list} extraData={list} renderItem={renderItem} />
        </View>
      ) : (
        <View style={[styles.container, {alignItems: 'center'}]}>
          <Text style={styles.textPlaholder}>Không tìm thấy địa chỉ nào!</Text>
          <Image
            source={image.box_empty}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.spaceMax}>
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={renderContent}
          keyExtractor={keyExtractor}
          listKey="my_list_address"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.btnAddress}>
        <ButtonSub
          bgColor="black"
          size="lager"
          value="Thêm địa chỉ"
          onPress={goToAddress}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreenListAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors.darkGrayAccount,
  },
  spaceMax: {
    flex: 1,
  },
  spaceMedium: {
    height: sizes._18sdp,
  },
  content: {
    paddingTop: sizes._18sdp,
  },
  topBanner: {
    height: sizes._48sdp,
    width: '100%',
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
  textPlaholder: {
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    color: ArrayColors._color_black,
    fontSize: sizes._18sdp,
    marginVertical: sizes._18sdp,
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
  btnAddress: {
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
  image: {
    width: sizes._102sdp,
    height: sizes._102sdp,
  },
});
