import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
// import Icons from 'react-native-vector-icons/Fontisto';
import sizes from '../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';

import ArrayColors from '../../res/colors/ArrayColors';
interface Props {
  name?: string | any;
  sizes?: number | any;
  color?: string | any;
  style?: string | any;
  onPress?: () => void;
}
const IconHeader: React.FC<Props> = (props: any) => {
  return (
    <>
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? ArrayColors.light
              : ArrayColors._color_white,
          },
          props.style,
        ]}>
        {() => (
          <Icons
            size={props.sizes}
            name={props.name}
            color={props.color}
            // onPress={props.onPress}
          ></Icons>
        )}
      </Pressable>
    </>
  );
};

export default IconHeader;
