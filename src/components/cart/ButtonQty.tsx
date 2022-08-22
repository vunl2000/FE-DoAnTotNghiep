import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../store/actions/productsActions';

type BtnProps = {
  value?: any;
  id?: any;
  onPress?: () => void;
};

const ButtonQty = ({value, id}: BtnProps) => {
  const dispatch: any = useDispatch();

  const minusProduct = (id: any) => {
    dispatch(decreaseQuantity(id));
  };
  const plusProduct = (id: any) => {
    dispatch(increaseQuantity(id));
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}: any) => [
          styles.containMinus,
          {
            borderColor: pressed
              ? ArrayColors._color_black
              : ArrayColors._color_gray,
          },
        ]}
        onPress={() => minusProduct(id)}>
        {({pressed}: any) => (
          <Icon
            name="minus"
            size={sizes._16sdp}
            color={pressed ? ArrayColors._color_black : ArrayColors._color_gray}
          />
        )}
      </Pressable>
      <TouchableWithoutFeedback>
        <View style={styles.count}>
          <Text style={styles.textLabelCount}>{value}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Pressable
        style={({pressed}: any) => [
          styles.containPlus,
          {
            borderColor: pressed
              ? ArrayColors._color_black
              : ArrayColors._color_gray,
          },
        ]}
        onPress={() => plusProduct(id)}>
        {({pressed}: any) => (
          <Icon
            name="plus"
            size={sizes._16sdp}
            color={pressed ? ArrayColors._color_black : ArrayColors._color_gray}
          />
        )}
      </Pressable>
    </View>
  );
};

export default ButtonQty;

const styles = StyleSheet.create({
  container: {
    height: sizes._30sdp,
    width: sizes._100sdp,
    flexDirection: 'row',
  },
  containMinus: {
    flex: 1,
    borderTopLeftRadius: sizes._15sdp,
    borderBottomLeftRadius: sizes._15sdp,
    borderWidth: sizes._2sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containPlus: {
    flex: 1,
    borderTopRightRadius: sizes._15sdp,
    borderBottomRightRadius: sizes._15sdp,
    borderWidth: sizes._2sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabelCount: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: sizes._font_size_medium,
    paddingHorizontal: sizes._16sdp,
    color: ArrayColors._color_black,
  },
  count: {
    borderTopWidth: sizes._2sdp,
    borderBottomWidth: sizes._2sdp,
    borderColor: ArrayColors._color_gray,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
