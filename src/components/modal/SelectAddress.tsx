import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';

type Props = {
  isOpen?: any;
};

const SelectAddress = ({isOpen}: Props) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <View style={styles.contentLabel}>
          <Text style={styles.textLabel}>Chọn tỉnh</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
    marginTop: sizes._header_height + sizes._3sdp,
    paddingHorizontal: sizes._18sdp,
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  contentLabel: {
    flexDirection: 'row',
  },
});
