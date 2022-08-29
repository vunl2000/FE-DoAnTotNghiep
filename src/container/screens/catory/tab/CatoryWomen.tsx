import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Catory from '../../../../components/catory/Catory';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import sizes from '../../../../res/sizes/sizes';
import ArrayColors from '../../../../res/colors/ArrayColors';

type Props = {};

const CatoryWomen = (props: Props) => {
  const isFocused = useIsFocused();
  const {women, accessory} = useSelector((state: any) => state.catory);
  const [data, setdata] = useState<any[]>([]);

  useEffect(() => {
    try {
      if (isFocused && accessory.length != 0) {
        let newData: any = women.concat(
          accessory.slice(accessory.length / 2, accessory.length),
        );

        setdata(newData);
      }
    } catch (error) {}
  }, [isFocused, accessory]);

  if (data.length === 0) {
    return (
      <View>
        <SkeletonPlaceholder>
          <View style={styles.content}>
            <View style={styles.contentLeft}></View>
            <View style={styles.contentRight}></View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <View>
      <Catory
        data={data}
        keyListLeft="menu_men_left"
        keyListRight="view_product_men_right"
      />
    </View>
  );
};

export default CatoryWomen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  textMenu: {
    fontSize: sizes._18sdp,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
  },
  contentLeft: {
    flex: 0.3,
  },
  contentRight: {
    flex: 0.7,
    backgroundColor: ArrayColors.white,
  },
});
