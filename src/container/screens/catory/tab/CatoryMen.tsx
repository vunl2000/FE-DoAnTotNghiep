import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Catory from '../../../../components/catory/Catory';

type Props = {};

const CatoryMen = (props: Props) => {
  const {men} = useSelector((state: any) => state.catory);
  return (
    <View>
      <Catory
        data={men}
        keyListLeft="menu_women_left"
        keyListRight="view_product_right"
      />
    </View>
  );
};

export default CatoryMen;

const styles = StyleSheet.create({});
