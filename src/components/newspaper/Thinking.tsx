import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';
import TitleHome from '../../components/title/TitleHome';
import Images from '../../res/require/Images';
import {getDataUser} from '../../utils/GetToken';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  viewImportThinking?: () => void;
  onPress?: () => void;
  onPressQA?: () => void;
};

const Thinking = (props: Props) => {
  const accounts = useSelector((state: any) => state.account);
  const [userName, setUserName] = React.useState(null);
  const [urlAvatar, setUrlAvatar] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      getDataUser('@user_token')
        .then(data => data)
        .then((value: any) => {
          if (value === undefined) {
            console.log('undefined');
            //setStorageUser('Đăng nhập / Đăng Ký >');
          } else {
            const jsonValue = JSON.parse(value);
            setUserName(jsonValue.userNameSet);
            setUrlAvatar(jsonValue.photoUrlSet);
            console.log(jsonValue.photoUrlSet);
          }
        })
        .catch(err => console.log(err));
    }, 100);
  }, [accounts.isAuthenticated]);

  return (
    <View style={{backgroundColor: ArrayColors._color_white}}>
      <View style={styles.mContainer}>
        <View style={styles.mStyleImg}>
          <Image
            style={styles.mImage}
            source={{
              uri: `${urlAvatar}`,
            }}
          />
        </View>
        <View style={{marginHorizontal: sizes._24sdp}}>
          <TitleHome
            onPress={props.viewImportThinking}
            style={styles.title_home}
            title={
              userName
                ? userName + ` ơi bạn đang nghĩ gì vậy ?`
                : `Đăng nhập để đăng tin!`
            }
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: sizes._8sdp,
          marginBottom: sizes._8sdp,
        }}>
        <TouchableOpacity onPress={props.onPress} style={styles.mStyleFlex}>
          <Image
            style={{width: sizes._26sdp, height: sizes._26sdp}}
            source={Images.ic_spaper}
          />
          <TitleHome
            style={{
              fontSize: sizes._18sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_gray_sombre,
              marginHorizontal: sizes._12sdp,
            }}
            title="Ảnh/Video"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPressQA} style={styles.mStyleFlex}>
          <Image
            style={{width: sizes._26sdp, height: sizes._26sdp}}
            source={Images.qa}
          />
          <TitleHome
            style={{
              fontSize: sizes._18sdp,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-SemiBold',
              color: ArrayColors._color_gray_sombre,
              marginHorizontal: sizes._12sdp,
            }}
            title="Hỏi đáp?"
          />
        </TouchableOpacity>
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
    fontSize: sizes._16sdp,
    fontWeight: 'normal',
    fontFamily: 'OpenSans-SemiBold',
    color: ArrayColors._color_gray_sombre,
  },
  mStyleFlex: {
    flexDirection: 'row',
    marginHorizontal: sizes._16sdp,
  },
});
