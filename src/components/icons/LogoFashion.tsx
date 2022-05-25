import {StyleSheet, Text, Image} from 'react-native';
import React from 'react';

interface Props {
  style?: string | any;
  source?: string | any;
}
const LogoFashion: React.FC<Props> = props => {
  return (
    <>
      <Image source={props.source} style={props.style} resizeMode='contain' />
    </>
  );
};

export default LogoFashion;
