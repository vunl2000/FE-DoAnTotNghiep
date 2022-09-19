import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Catory from '../../../../components/catory/Catory';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import sizes from '../../../../res/sizes/sizes';
import ArrayColors from '../../../../res/colors/ArrayColors';
type Props = {};

const CatoryMen = (props: Props) => {
  const isFocused = useIsFocused();

  const [data, setdata] = useState<any[]>([]);
  const {men, accessory} = useSelector((state: any) => state.catory);

  useEffect(() => {
    try {
      if (isFocused && accessory.length != 0) {
        let newData: any = men.concat(accessory.slice(0, accessory.length / 2));

        setdata(newData);
      }
    } catch (error) {}
  }, [isFocused, accessory]);

  if (men.length === 0) {
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
        keyListLeft="menu_women_left"
        keyListRight="view_product_right"
      />
    </View>
  );
};

export default CatoryMen;

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
