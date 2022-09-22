import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL, GET_PRODUCT_BY_ID_OBJECT} from '@env';
import Banner from '../../../../components/home/banner/Banner';
import MenCatory from '../../../../components/home/catory/MenCatory';
import ProDucts from '../../../../components/product/Products';
import ArrayColors from '../../../../res/colors/ArrayColors';
import ProductItem from '../../../../components/product/Product.Item';
import sizes from '../../../../res/sizes/sizes';

type Props = {};
const renderProDuct = ({item, index}: any) => {
  return <ProductItem item={item} index={index} />;
};
const space = () => <View style={styles.spaceY} />;
const keyItem = (item: any) => item._id;
const MenScreen = (props: Props) => {
  const [listMen, setListMen] = useState<any[]>([]);
  const [isLoader, setIsLoader] = useState<any>(true);
  const {typeCatory} = useSelector((state: any) => state.catory);

  // let srcContent =
  //   'https://imgaz1.chiccdn.com/os/202207/20220725042455_348.jpg';
  // let srcTop =
  //   'https://img.ltwebstatic.com/images3_ach/2022/06/16/1655368170602f33678ebf79bfc4618dd8993d035b.webp';

  const {banner} = useSelector((state: any) => state.firstOpen);

  const searchUrl = (keySearch: any) => {
    return banner.filter((item: any) => item.title_ads === keySearch)[0]
      .image_ads;
  };

  const getData = async (id: string) => {
    let data = JSON.stringify({
      idTypeProduct: id.toString(),
    });
    await axios({
      method: 'POST',
      url: API_URL + GET_PRODUCT_BY_ID_OBJECT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
      .then(res => {
        let resData: any = res.data;
        setListMen(resData.result);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (typeCatory.length !== 0) {
      typeCatory.forEach((item: any) => {
        if (item.titleTypeProduct === 'Nam') {
          getData(item._id);
        }
      });
    }
  }, [typeCatory]);

  const renderContent = (
    <>
      <Banner size="medium" uri={searchUrl('Man_1')} mode="cover" />
      <MenCatory />
      <Banner size="medium" uri={searchUrl('Man_2')} mode="cover" />
      <View style={styles.label}>
        <Text style={styles.textLabel}>Khí chất phái mạnh!</Text>
      </View>
      {listMen.length != 0 ? (
        <FlatList
          data={listMen.slice(0, 10)}
          renderItem={renderProDuct}
          numColumns={2}
          listKey={'listmen-index'}
          keyExtractor={keyItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          ItemSeparatorComponent={space}
        />
      ) : null}
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
  spaceY: {
    height: sizes._16sdp,
  },
  label: {
    paddingVertical: sizes._16sdp,
  },
  textLabel: {
    fontSize: sizes._18sdp,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    lineHeight: sizes._26sdp,
    color: ArrayColors._color_black,
    marginVertical: sizes._10sdp,
    textAlign: 'center',
  },
});

export default MenScreen;
