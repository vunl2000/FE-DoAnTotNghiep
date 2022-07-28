import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import MenCatory from '../../../components/home/catory/MenCatory';
import Banner from '../../../components/home/banner/Banner';
import ProDucts from '../../../components/product/Products';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL, GET_PRODUCT_BY_ID_OBJECT} from '@env';

type Props = {};

const MenScreen = (props: Props) => {
  const [listMen, setListMen] = useState<any>([]);
  const [isLoader, setIsLoader] = useState<any>(true);
  const {typeCatory} = useSelector((state: any) => state.catory);

  let srcContent =
    'https://imgaz1.chiccdn.com/os/202207/20220725042455_348.jpg';
  let srcTop =
    'https://img.ltwebstatic.com/images3_ach/2022/06/16/1655368170602f33678ebf79bfc4618dd8993d035b.webp';

  useEffect(() => {
    typeCatory.forEach((item: any) => {
      if (item.titleTypeProduct === 'Nam') {
        let data = JSON.stringify({
          idTypeProduct: item._id,
        });
        axios({
          method: 'POST',
          url: API_URL + GET_PRODUCT_BY_ID_OBJECT,
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        })
          .then(res => {
            let resData = res.data;
            setListMen(resData.result);
            setIsLoader(false);
          })
          .catch(err => {
            setIsLoader(true);
            console.log(err);
          });
      }
    });
  }, [typeCatory]);
  const renderContent = (
    <>
      <Banner size="medium" uri={srcTop} mode="cover" />
      <MenCatory />
      <Banner size="medium" uri={srcContent} mode="cover" />
      <ProDucts title={'Khí chất dành cho bạn!'} data={listMen} />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={null}
        renderItem={null}
        ListFooterComponent={renderContent}
        listKey="home_Mmen"
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArrayColors._color_white,
  },
});

export default MenScreen;
