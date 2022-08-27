import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import ArrayColors from '../../res/colors/ArrayColors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type BetterImage = FastImageProps;

const BetterImage: React.FC<BetterImage> = ({style, onLoad, ...rest}) => {
  const [isLoader, setIsLoader] = useState(false);

  return (
    <View>
      {!isLoader ? (
        <SkeletonPlaceholder
          backgroundColor={ArrayColors.bg_inline}
          highlightColor={ArrayColors.white}>
          <View style={style} />
        </SkeletonPlaceholder>
      ) : (
        <FastImage
          onLoad={evt => {
            setIsLoader(true);
          }}
          {...rest}
          fallback
        />
      )}
    </View>
  );
};

export default BetterImage;
