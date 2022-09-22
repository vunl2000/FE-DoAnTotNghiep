import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import TopCatoryItem from './TopCatory.Item';
import image from '../../../res/require/Images';
import {NameScreen} from '../../../container/navigators/TabNavigator';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const data = [
  {
    id: 'menu_1',
    icon: image.ic_headsetphone,
    label: 'Câu hỏi',
    screen: 0,
  },
  {
    id: 'menu_2',
    icon: image.cod_icon,
    label: 'Vận chuyển',
    screen: 1,
  },
  {
    id: 'menu_3',
    icon: image.ic_info,
    label: 'Giới thiệu',
    screen: 2,
  },
  {
    id: 'menu_4',
    icon: image.ic_survey_center,
    label: 'Kích thước',
    screen: 3,
  },
];
const key = (item: any) => item.id;

const TopCatory = (props: Props) => {
  const {navigate}: any = useNavigation();
  const goToScreens = (index: any) => {
    navigate(
      index == 1
        ? NameScreen.ANSWERQUESTIONS
        : index == 2
        ? NameScreen.ANSWERQUESTIONS
        : index == 3
        ? NameScreen.ANSWERQUESTIONS
        : NameScreen.INTRODUCE,
    );
  };
  const renderItem = ({index, item}: any) => {
    return <TopCatoryItem index={index} item={item} onPress={goToScreens} />;
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        listKey="top_catory"
        keyExtractor={key}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
      />
    </>
  );
};

export default TopCatory;

const styles = StyleSheet.create({});
