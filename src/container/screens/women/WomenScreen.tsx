import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const WomenScreen = (props: Props) => {
  return (
    <View>
      <Text>WomenScreen</Text>
    </View>
  );
};

export default WomenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
