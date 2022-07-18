import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import TitleHome from '../../components/title/TitleHome';
import Images from '../../res/require/Images';
type Props = {
  viewImportThinking?: () => void;
};

const Thinking = (props: Props) => {
  const [userName, setUserName] = React.useState('');
  return (
    <View style={{backgroundColor: ArrayColors._color_white}}>
      <View style={styles.mContainer}>
        <View style={styles.mStyleImg}>
          <Image style={styles.mImage} source={Images.img_user} />
        </View>
        <View style={{marginHorizontal: sizes._24sdp}}>
          <TitleHome
            onPress={props.viewImportThinking}
            style={styles.title_home}
            title={
              userName
                ? userName + `ơi bạn đang nghĩ gì vậy ?`
                : `Đăng nhập để đăng tin`
            }
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: sizes._8sdp}}>
        <View style={styles.mStyleFlex}>
          <Image
            style={{width: sizes._26sdp, height: sizes._26sdp}}
            source={Images.ic_spaper}
          />
          <TitleHome
            style={{
              fontSize: sizes._18sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              marginHorizontal: sizes._6sdp,
            }}
            title="Ảnh/Video"
          />
        </View>
        <View style={styles.mStyleFlex}>
          <Image
            style={{width: sizes._26sdp, height: sizes._26sdp}}
            source={Images.ic_qa_spaper}
          />
          <TitleHome
            style={{
              fontSize: sizes._18sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_black,
              marginHorizontal: sizes._6sdp,
            }}
            title="Hỏi đáp?"
          />
        </View>
      </View>
    </View>
  );
};

export default Thinking;

const styles = StyleSheet.create({
  mContainer: {
    flexDirection: 'row',
    marginHorizontal: sizes._16sdp,
    marginVertical: sizes._16sdp,
    alignItems: 'center',
  },

  mStyleImg: {
    width: sizes._58sdp,
    height: sizes._58sdp,
    borderRadius: sizes._58sdp / sizes._2sdp,
    backgroundColor: ArrayColors._color_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mImage: {
    width: sizes._58sdp,
    height: sizes._58sdp,
    borderRadius: sizes._58sdp / sizes._2sdp,
  },
  title_home: {
    fontSize: sizes._18sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_black,
  },
  mStyleFlex: {
    flexDirection: 'row',
    marginHorizontal: sizes._16sdp,
  },
});
