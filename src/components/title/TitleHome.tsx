import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface Props {
  style?: string | any;
  title?: string | any;
}
const TitleHome: React.FC<Props> = props => {
  return (
    <>
      <Text style={props.style}>{props.title}</Text>
    </>
  );
};

export default TitleHome;
