import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Catory from '../../../../components/catory/Catory';
import {useSelector} from 'react-redux';

type Props = {};

const CatoryWomen = (props: Props) => {
  const {women} = useSelector((state: any) => state.catory);
  return (
    <View>
      <Catory
        data={women}
        keyListLeft="menu_men_left"
        keyListRight="view_product_men_right"
      />
    </View>
  );
};

export default CatoryWomen;

const styles = StyleSheet.create({});
