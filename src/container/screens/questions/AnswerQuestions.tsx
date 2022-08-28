import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrayColors from '../../../res/colors/ArrayColors';
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import IconHeader from '../../../components/icons/IconHeader';
import ItemQuestions from '../../../components/questions/ItemQuestions';
import {dataAll} from '../../../data/fakedata/DataAnswerQuestion';
import {makeId} from '../../../utils/Utilities';

const key = (item: any, index: any) => makeId(4);

const AnswerQuestions = ({navigation}: any) => {
  const [expanded, setExpanded] = React.useState<any>(dataAll);

  const handlePress = (id: any, type: any) => {
    const newData = dataAll?.map((item: any) =>
      item.id === id ? {...item, check: true} : {...item, check: false},
    );

    setExpanded(type ? dataAll : newData);
  };
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
          <Text style={styles.textLabel}>Câu hỏi</Text>
        </View>
        <View style={{width: sizes._42sdp}} />
      </View>
    );
  }
  function RenderItemFlalist({item}: any) {
    return (
      <ItemQuestions
        titleHeader={item.headerTitle}
        idList={item.id}
        nameIconLeft={item.nameIcon}
        dataItem={item.data}
        stateList={item.check}
        onPress={handlePress}
      />
    );
  }
  return (
    <View style={styles.mContainer}>
      <AppHeader content customContent={<HeaderContent />} />
      <View style={styles.mContainerBody}>
        <FlatList
          data={expanded}
          extraData={expanded}
          renderItem={RenderItemFlalist}
          keyExtractor={key}
          removeClippedSubviews
          bounces
          showsVerticalScrollIndicator={false}
          listKey="answer_question"
        />
      </View>
    </View>
  );
};

export default AnswerQuestions;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
  },
  mContainerBody: {
    flex: 1,
    backgroundColor: ArrayColors.gray_bg_light,
    paddingBottom: sizes._20sdp,
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
    fontSize: sizes._22sdp,
    fontWeight: 'bold',
    color: ArrayColors._color_black,
    fontFamily: 'OpenSans-Bold',
  },
});
