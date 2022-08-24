import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';

import {List} from 'react-native-paper';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icons from 'react-native-vector-icons/Ionicons';
const MyComponent = ({
  titleHeader,
  idList,
  nameIconLeft,
  dataItem,
  stateList,
  onPress,
}: any) => {
  const [expanded, setExpanded] = React.useState<any>(dataItem);

  const handleCheckItem = (id: any, types: any) => {
    const newData = dataItem?.map((item: any) =>
      item.id === id ? {...item, checkItem: true} : {...item, checkItem: false},
    );

    setExpanded(types ? dataItem : newData);
  };

  return stateList ? (
    <List.Accordion
      expanded={stateList}
      onPress={() => onPress({idList, stateList})}
      title={titleHeader}
      id={idList}
      style={styles.mContainerActive}
      titleStyle={styles.titleActive}
      left={props => (
        <Icons
          {...props}
          name={nameIconLeft}
          color={ArrayColors._color_white}
          size={24}
        />
      )}
      right={props => (
        <List.Icon
          {...props}
          icon="chevron-up"
          color={ArrayColors._color_white}
        />
      )}>
      {expanded.map((item: any, index: any) => {
        return (
          <List.Accordion
            title={item?.title}
            expanded={item?.checkItem}
            onPress={()=>{handleCheckItem(item.id, item.checkItem)}}
            titleStyle={styles.titleItem}
            style={[
              styles.styleItem,
              {
                borderBottomColor:
                  index == dataItem.length - 1
                    ? ArrayColors.gray_custom
                    : '#fff',
                borderBottomWidth: index == dataItem.length - 1 ? 1 : 0,
              },
            ]}
            left={props => <View {...props} style={styles.iconItem}></View>}
            // @ts-ignore
            right={props => <View {...props}></View>}>
            <View style={styles.styleListItem}>
              <Text style={styles.titleListItem}>{item?.titlebody}</Text>
            </View>
          </List.Accordion>
        );
      })}
    </List.Accordion>
  ) : (
    <List.Accordion
      expanded={stateList}
      onPress={() => onPress(idList)}
      title={titleHeader}
      id={idList}
      style={styles.mContainer}
      titleStyle={styles.titleUnactive}
      left={props => (
        <Icons
          {...props}
          name={nameIconLeft}
          color={ArrayColors.black}
          size={24}
        />
      )}
      right={props => (
        <List.Icon {...props} icon="chevron-down" color={ArrayColors.black} />
      )}>
      <></>
    </List.Accordion>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  mContainer: {
    borderColor: ArrayColors.gray_custom,
    borderWidth: 1,
    marginLeft: sizes._20sdp,
    marginRight: sizes._20sdp,
    marginTop: sizes._25sdp,
    height: sizes._50sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mContainerActive: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black',
    marginLeft: sizes._20sdp,
    marginRight: sizes._20sdp,
    marginTop: sizes._25sdp,
    height: sizes._50sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleActive: {
    color: '#fff',
  },
  titleUnactive: {
    color: '#000',
  },
  styleItem: {
    borderLeftColor: ArrayColors.gray_custom,
    borderLeftWidth: 1,
    borderRightColor: ArrayColors.gray_custom,
    borderRightWidth: 1,
    backgroundColor: '#fff',
    marginLeft: sizes._20sdp,
    marginRight: sizes._20sdp,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,
    // elevation:5
  },
  titleItem: {
    // marginLeft: -sizes._40sdp,
  },
  iconItem: {
    width: sizes._7sdp,
    height: sizes._15sdp,
    backgroundColor: ArrayColors._color_black,
    marginTop: sizes._5sdp,
    marginLeft: sizes._27sdp,
  },
  styleListItem: {
    backgroundColor: '#fff',
    marginLeft: sizes._20sdp,
    marginRight: sizes._20sdp,
    borderLeftColor: ArrayColors.gray_custom,
    borderLeftWidth: 1,
    borderRightColor: ArrayColors.gray_custom,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleListItem: {
    marginLeft: -sizes._62sdp,
    textAlign: 'auto',
    width: sizes._305sdp,
  },
});
