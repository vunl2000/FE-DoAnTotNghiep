import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import image from '../../res/require/Images';
import sizes from '../../res/sizes/sizes';

type Props = {defaultRating?: any};

const CustomeStar = ({defaultRating}: Props) => {
  const [maxRating, setMaxRating] = useState<any>([1, 2, 3, 4, 5]);
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item: any, key: any) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            style={{paddingHorizontal: sizes._10sdp}}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating ? image.star_active : image.star_unactive
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomeStar;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: 'row',
    marginLeft: sizes._10sdp,
  },
  starImageStyle: {
    width: sizes._30sdp,
    height: sizes._30sdp,
    resizeMode: 'cover',
  },
});
