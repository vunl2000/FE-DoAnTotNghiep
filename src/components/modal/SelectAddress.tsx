import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  TextStyle,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

type Props = {
  isOpen?: any;
  onChangeOpen?: any;
  onChangeCityProvince?: any;
  cityProvince?: any;
};

const SelectAddress = ({
  isOpen,
  onChangeOpen,
  onChangeCityProvince,
  cityProvince,
}: Props) => {
  const {province} = useSelector((state: any) => state.address);

  const activeColor = (code: number | any): TextStyle => ({
    fontWeight: cityProvince.code === code ? '700' : '400',
    fontFamily:
      cityProvince.code === code ? 'OpenSans-Bold' : 'OpenSans-Regular',
  });

  const renderItem = ({item, index}: any) => {
    return (
      <>
        <TouchableOpacity
          style={styles.contentLabel}
          onPress={() => {
            onChangeCityProvince(item.code, item.name);
            onChangeOpen();
          }}>
          <Text style={[styles.textDefault, activeColor(item.code)]}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };
  const keyExtracter = (item: any) => item.code.toString();
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => onChangeOpen()}>
          <View style={styles.emtyView} />
        </TouchableWithoutFeedback>
        <View style={styles.content}>
          <View style={styles.contentLabel}>
            <TouchableOpacity
              style={styles.iconClose}
              onPress={() => onChangeOpen()}>
              <Icon
                name="close"
                size={sizes._26sdp}
                color={ArrayColors._color_black}
              />
            </TouchableOpacity>
            <Text style={styles.textLabel}>Chọn tỉnh</Text>
            <View style={styles.spaceMedium} />
          </View>

          <Divider />
          <View style={{flex: 1}}>
            {province ? (
              <FlatList
                data={province}
                extraData={province}
                renderItem={renderItem}
                keyExtractor={keyExtracter}
                removeClippedSubviews
                showsVerticalScrollIndicator={false}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_gray_translucen,
  },
  textLabel: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
    flex: 1,
    textAlign: 'center',
  },
  textDefault: {
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
    flex: 1,
    textAlign: 'center',
  },
  contentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes._50sdp,
  },
  iconClose: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceMedium: {
    width: sizes._42sdp,
  },
  emtyView: {
    height: sizes._header_height + sizes._1sdp,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
  },
});
