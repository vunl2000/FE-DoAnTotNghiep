import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {};

const MenScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>MenScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MenScreen;
