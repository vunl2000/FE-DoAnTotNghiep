import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

const ItemRulersize = ({data, dataCell, title}: any) => {
  return (
    <DataTable key={'data'}>
      <Text style={styles.header}>{title}</Text>
      <DataTable.Header>
        {data.map((item: any) => (
          <DataTable.Title  textStyle={styles.titles}>
            {item?.titleHeader}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {dataCell.map((item: any) => (
        <DataTable.Row style={styles.rowContainer} >
          <DataTable.Cell textStyle={styles.titleRowLef}>
            {item?.nameLeft}
          </DataTable.Cell>
          {item?.dataRow.map((item: any) => (
            <DataTable.Cell  textStyle={styles.titleRow}>
              {item?.titleName}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default ItemRulersize;

const styles = StyleSheet.create({
  header: {
    marginTop: sizes._10sdp,
    textAlign: 'center',
    fontSize: sizes._font_size_big_big,
    fontWeight: 'bold',
    color: ArrayColors.black,
  },
  headerContainer: {
    height: sizes._screen_height / 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ArrayColors.gray_custom,
    borderWidth: sizes._1sdp,
  },
  titles: {
    marginLeft: sizes._15sdp,
    fontSize: sizes._font_size_big_big,
    fontWeight: 'bold',
    color: ArrayColors.black,
  },
  rowContainer: {
    borderColor: ArrayColors.gray_custom,
    borderWidth: sizes._1sdp,
  },
  titleRow: {
    marginLeft: sizes._12sdp,
    fontSize: sizes._font_size_large,
    fontStyle: 'italic',
    color: ArrayColors.black,
  },
  titleRowLef: {
    marginLeft: sizes._17sdp,
    fontSize: sizes._font_size_large,
    fontWeight: 'bold',
    color: ArrayColors.black,
  },
});