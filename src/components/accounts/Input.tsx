import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
type Props = {
  placeholder?: string | any;
  onChangeText?: (text: string | any) => void;
  secureTextEntry?: boolean;
  titleInPut?: any;
  nameImgOn?: any;
  nameImgOff?: any;
};

const Input = (props: Props) => {
  return (
    <View style={{marginTop: sizes._32sdp}}>
      <Text
        style={{
          marginVertical: 10,
          fontSize: sizes._18sdp,
          fontWeight: 'bold',
          fontFamily: 'OpenSans-SemiBold',
        }}>
        {props.titleInPut}
      </Text>
      <View style={styles.mContainer}>
        <TextInput
          style={styles.mInput}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry || false}></TextInput>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image source={props.nameImgOn} />
          <View style={{width: sizes._12sdp}}></View>
          <Image source={props.nameImgOff} />
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mContainer: {
    width: sizes._screen_width - 40,
    height: sizes._48sdp,
    // borderWidth: 1,
    // borderRadius: 24,
    alignSelf: 'center',
    // backgroundColor: '#e3e3e3',
    marginVertical: sizes._6sdp,
    // borderColor: '#fff',

    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mInput: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: sizes._16sdp,
  },
});
