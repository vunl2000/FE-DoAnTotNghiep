import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import ArrayColors from '../../res/colors/ArrayColors';

type BetterImage = FastImageProps;

const BetterImage: React.FC<BetterImage> = ({...rest}) => {
  const [isLoader, setIsLoader] = useState(false);

  return (
    <View style={styles.container}>
      <FastImage
        onLoad={evt => {
          setIsLoader(true);
        }}
        {...rest}
      />
      {!isLoader && (
        <View>
          <View style={[styles.spinner, StyleSheet.absoluteFill]}>
            <ActivityIndicator color={ArrayColors._color_black} />
          </View>
        </View>
      )}
    </View>
  );
};

export default BetterImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
