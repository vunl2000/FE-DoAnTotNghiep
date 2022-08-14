import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import {Divider} from 'react-native-paper';
import {API_URL, GET_PRODUCT_BY_ID} from '@env';
import axios from 'axios';
import CatoryItem from './Catory.Item';
import image from '../../res/require/Images';

type Props = {
  data?: any;
};

const Catory = ({data}: Props) => {
  const [selectMenu, setSelectMenu] = useState({
    index: 0,
    _id: data[0]._id,
  });

  const [datatCatory, setDatatCatory] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);

  const onSelectMenu = (_id: any, index: number) => {
    selectMenu._id !== _id && setSelectMenu({index, _id});
  };

  const getData = async () => {
    let data = JSON.stringify({
      titleCategoryProduct: selectMenu._id,
    });
    await axios({
      method: 'POST',
      url: API_URL + GET_PRODUCT_BY_ID,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then(res => {
        let resData = res.data;
        setDatatCatory(resData.result);
        setIsloading(true);
      })
      .catch(err => {
        setIsloading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [selectMenu]);

  const Exception = () => (
    <View style={styles.exception}>
      <Image
        source={image.box_empty}
        style={styles.imgEmpty}
        resizeMode="contain"
      />
      <View style={{height: sizes._18sdp}} />
      <Text style={styles.textPlaholders}>Không tìm thấy sản phẩm nào</Text>
    </View>
  );

  const renderItem = ({item, index}: any) => (
    <TouchableWithoutFeedback onPress={() => onSelectMenu(item._id, index)}>
      <View
        style={[
          styles.contentItem,
          {
            backgroundColor:
              index === selectMenu.index
                ? ArrayColors._color_black
                : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.textMenu,
            {
              color:
                index === selectMenu.index
                  ? ArrayColors._color_white
                  : ArrayColors._color_black,
              fontWeight: index === selectMenu.index ? '700' : '400',
              fontFamily:
                index === selectMenu.index
                  ? 'OpenSans-Bold'
                  : 'OpenSans-Regular',
            },
          ]}>
          {item.titleCategoryProduct}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderItemRigth = ({item, index}: any) => (
    <CatoryItem index={index} item={item} />
  );

  const key = (item: any) => item._id;
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <FlatList
            data={data}
            extraData={data}
            renderItem={renderItem}
            listKey="menu_catory"
            keyExtractor={key}
          />
        </View>
        <View style={styles.contentRight}>
          {isLoading ? (
            datatCatory.length > 0 ? (
              <FlatList
                data={datatCatory}
                extraData={datatCatory}
                renderItem={renderItemRigth}
                listKey="menu_catory_right"
                keyExtractor={key}
                numColumns={2}
              />
            ) : (
              <Exception />
            )
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Catory;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  img: {
    width: sizes._110sdp,
    height: sizes._140sdp,
  },
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
  contentItem: {
    width: '100%',
    height: sizes._60sdp,
    paddingHorizontal: sizes._18sdp,
    justifyContent: 'center',
  },
  textSub: {
    fontSize: sizes._14sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_black,
  },
  textDefault: {
    fontSize: sizes._18sdp,
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    color: ArrayColors._color_black,
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: sizes._8sdp,
  },
  topContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: sizes._12sdp,
  },
  maxWidth: {
    flex: 1,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemPrice: {
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    color: ArrayColors._color_black,
  },
  contentShow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArrayColors.gray_bg_light,
    height: sizes._24sdp,
    borderRadius: sizes._24sdp / 2,
    marginTop: sizes._12sdp,
    paddingHorizontal: sizes._8sdp,
  },
  spaceLager: {
    flex: 1,
  },
  color: {
    width: sizes._12sdp,
    height: sizes._12sdp,
    borderRadius: sizes._12sdp / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSize: {
    fontWeight: '700',
    fontSize: sizes._16sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
  },
  space: {
    width: sizes._16sdp,
  },
  exception: {
    paddingVertical: sizes._18sdp,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  textPlaholders: {
    fontSize: sizes._18sdp,
    color: ArrayColors._color_un_active,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  imgEmpty: {
    width: sizes._80sdp,
    height: sizes._80sdp,
  },
});
