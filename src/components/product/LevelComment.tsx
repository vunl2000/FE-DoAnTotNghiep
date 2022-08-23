import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProgressBar, Surface} from 'react-native-paper';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';

type Props = {
  label?: any;
  progress?: any;
};

const LevelComment = ({label, progress}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text numberOfLines={2} style={styles.textDefault}>
          {label}
        </Text>
      </View>
      <Surface style={styles.spaceMax}>
        <ProgressBar
          progress={progress}
          color={'#333333'}
          style={styles.progress}
        />
      </Surface>
    </View>
  );
};

export default LevelComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
  },
  progress: {
    backgroundColor: ArrayColors.white,
    height: sizes._10sdp,
    width: undefined,
  },
  label: {
    flex: 1.5,
  },
  spaceMax: {
    flex: 3.5,
    elevation: 4,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    flexWrap: 'wrap',
    marginRight: sizes._10sdp,
  },
});
