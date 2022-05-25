import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Animated,
} from 'react-native';
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
  activeIndexAnimation: any;
}

const IconHeaderAnimated: React.FC<Props> = props => {
  const isAndroid = Platform.OS === 'android';

  return (
    <Animated.View
      style={{
        width: props.activeIndexAnimation,
        backgroundColor: ArrayColors._color_gray_light_light,
        borderRadius: sizes._3sdp,
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          numberOfLines={1}
          style={{fontSize: sizes._18sdp, marginHorizontal: sizes._10sdp}}>
          Tìm kiếm...
        </Text>
      </View>
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? ArrayColors._color_gray_light_light
              : ArrayColors._color_white,
          },
          props.style,
        ]}>
        {() => (
          <Icons
            size={props.sizes}
            name={props.name}
            color={props.color}></Icons>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default IconHeaderAnimated;
