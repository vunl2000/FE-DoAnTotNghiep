import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  placeholder?: string | any;
  onChangeText?: (text: string | any) => void;
  secureTextEntry?: boolean;
  titleInPut?: any;
  // nameImgOn?: any;
  nameImg_1?: any;
  nameImg_3?: any;
  nameImg_2?: any;
  onPress_1?: (text: string | any) => void;
  onPress_2?: (text: string | any) => void;
  value?: string | any;
  setIconView?: boolean;
  keyboardType?: string | any;
  setIconViewEmail?: boolean;
  setIconViewPassword?: boolean;
};

const Input = (props: Props) => {
  return (
    <View style={{marginTop: sizes._12sdp}}>
      <Text
        style={{
          marginVertical: sizes._6sdp,
          fontSize: sizes._18sdp,
          marginHorizontal : 3,
          fontWeight: 'bold',
          fontFamily: 'OpenSans-SemiBold',
          color: ArrayColors._color_gray_sombre,
        }}>
        {props.titleInPut}
      </Text>
      <View style={styles.mContainer}>
        <TextInput
          value={props.value}
          style={styles.mInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}></TextInput>

        <View
          style={{
            flexDirection: 'row',
            // marginHorizontal: sizes._10sdp,
            position: 'absolute',
            right: 0,
          }}>
          {props.setIconViewPassword && (
            <>
              {props.setIconView ? (
                <TouchableOpacity onPress={props.onPress_2}>
                  <Image
                    style={{
                      width: sizes._24sdp,
                      height: sizes._21sdp,
                      marginRight: sizes._24sdp,
                    }}
                    source={props.nameImg_2}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={props.onPress_2}>
                  <Image
                    style={{
                      marginRight: sizes._24sdp,
                      width: sizes._24sdp,
                      height: sizes._19sdp,
                    }}
                    source={props.nameImg_3}
                  />
                </TouchableOpacity>
              )}
            </>
          )}

          {props.setIconViewEmail && (
            <TouchableOpacity onPress={props.onPress_1 || props.onPress_2}>
              <Image
                style={{
                  width: sizes._24sdp,
                  height: sizes._24sdp,
                }}
                source={props.nameImg_1}
              />
            </TouchableOpacity>
          )}

          {/* <View style={{width: sizes._16sdp}}></View> */}
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mContainer: {
    width: sizes._screen_width - sizes._40sdp,
    height: sizes._48sdp,
    alignSelf: 'center',
    // marginVertical: sizes._12sdp,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mInput: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: sizes._18sdp,
    width: sizes._screen_width - sizes._120sdp,
    color: ArrayColors._color_black,
    fontWeight: 'bold',
  },
});
