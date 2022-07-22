import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../../components/header/AppHeader';
import IconHeader from '../../../components/icons/IconHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import {Dataintroduce} from '../../../data/DataIntriduce';

type Props = {};

const ScreensIntroduce = ({navigation}: any) => {
  function HeaderContent() {
    return (
      <View style={styles.containerHeader}>
        <IconHeader
          name="chevron-back"
          sizes={sizes._24sdp}
          color={ArrayColors._color_black}
          style={styles.iconHeader}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.contentHeader}>
          <Text style={styles.textLabel}>Giới thiệu về chúng tôi</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  const RenderItemIntroduce = ({item}: any) => {
    return (
      <View style={{paddingBottom: sizes._15sdp}}>
        {/* Khổ 1  */}
        <View style={styles.item_container}>
          <View>
            <Text style={styles.item_header_title}>{item.header_title}</Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title}</Text>
          </View>
        </View>
        <View style={styles.img_intro}>
          <Image
            source={require('../../../assets/images/img_intrduce_2.png')}
            style={styles.img}
          />
        </View>
        {/* Khổ 2 */}
        <View style={styles.item_container}>
          <View>
            <Text style={styles.item_header_title}>{item.header_title_a}</Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title_a}</Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title_a_2}</Text>
          </View>
        </View>
        <View style={styles.img_intro}>
          <Image
            source={require('../../../assets/images/img_introduce.png')}
            style={styles.img}
          />
        </View>
        {/* Khổ 3 */}
        <View style={styles.item_container}>
          <View>
            <Text style={styles.item_header_title}>{item.header_title_b}</Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title_b}</Text>
          </View>
        </View>
        <View style={styles.img_intro}>
          <Image
            source={require('../../../assets/images/img_intrduce_1.png')}
            style={styles.img}
          />
        </View>
        {/* Khổ 4 */}
        <View style={styles.item_container}>
          <View>
            <Text style={styles.item_header_title}>{item.header_title_c}</Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title_c}</Text>
          </View>
        </View>

        <View style={styles.item_container}>
          <View>
            <Text style={styles.item_header_body_title}>
              {item.header_title_d}
            </Text>
          </View>
          <View>
            <Text style={styles.item_body_title}>{item.body_title_d}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainerbody}>
        <FlatList
          data={Dataintroduce}
          renderItem={RenderItemIntroduce}
          keyExtractor={item => `${item.id}`}
          listKey="introduce"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreensIntroduce;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
  mContainerbody: {
    flex: 1,
    backgroundColor: ArrayColors.gray_bg_light,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ArrayColors._color_white,
  },
  contentHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    width: sizes._42sdp,
    height: sizes._42sdp,
    borderRadius: sizes._42sdp / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
    fontSize: sizes._20sdp,
  },
  item_container: {
    margin: sizes._20sdp,
  },
  item_header_title: {
    fontSize: sizes._25sdp,
    fontWeight: '700',
    margin: sizes._10sdp,
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-SemiBold',
  },
  item_body_title: {
    fontSize: sizes._17sdp,
    fontWeight: 'normal',
    color: ArrayColors._color_black_gray,
    fontFamily: 'OpenSans-SemiBold',
  },
  item_header_body_title: {
    fontSize: sizes._19sdp,
    fontWeight: '500',
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: sizes._10sdp,
  },
  img_intro: {
    width: sizes._screen_width,
    margin: sizes._20sdp,
  },
  img: {
    width: sizes._screen_width / 1.1,
    height: sizes._screen_height / 3.5,
  },
});
