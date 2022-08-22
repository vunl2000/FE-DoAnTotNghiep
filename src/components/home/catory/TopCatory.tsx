import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import TopCatoryItem from './TopCatory.Item';
import image from '../../../res/require/Images';

type Props = {};

const renderItem = ({index, item}: any) => (
  <TopCatoryItem index={index} item={item} />
);

const data = [
  {
    id: 'menu_1',
    icon: image.ic_ticket_catory,
    label: 'Giảm 10%',
    subLabel: 'Đơn hàng đầu tiên',
  },
  {
    id: 'menu_2',
    icon: image.ic_ticket_catory,
    label: 'Flash sale',
    subLabel: '',
  },
  {
    id: 'menu_3',
    icon: image.ic_ticket_catory,
    label: 'Giảm 10%',
    subLabel: 'Đơn hàng đầu tiên',
  },
  {
    id: 'menu_4',
    icon: image.ic_ticket_catory,
    label: 'Giảm 10%',
    subLabel: 'Đơn hàng đầu tiên',
  },
  {
    id: 'menu_5',
    icon: image.ic_ticket_catory,
    label: 'Giảm 10%',
    subLabel: 'Đơn hàng đầu tiên',
  },
  {
    id: 'menu_6',
    icon: image.ic_ticket_catory,
    label: 'Giảm 10%',
    subLabel: 'Đơn hàng đầu tiên',
  },
];
const key = (item: any) => item.id;

const TopCatory = (props: Props) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        listKey="top_catory"
        keyExtractor={key}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
    </>
  );
};

export default TopCatory;

const styles = StyleSheet.create({});
