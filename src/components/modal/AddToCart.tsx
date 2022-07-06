import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';

export interface Props {
  isShow?: any;
  onChangeShow?: any;
}

const AddToCart = ({isShow, onChangeShow}: Props) => {
  return (
    <Modal
      visible={isShow}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onChangeShow}>
          <View style={styles.emtyView} />
        </TouchableWithoutFeedback>
        <View style={styles.content}></View>
      </View>
    </Modal>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArrayColors._color_gray_translucen,
  },
  emtyView: {
    width: '100%',
    flex: 1,
    zIndex: 0,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'blue',
  },
});
