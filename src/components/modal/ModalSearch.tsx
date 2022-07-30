import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
  Platform,
  FlatList,
} from 'react-native';
import React, {memo} from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import HeaderSearch from '../search/HeaderSearch';
import AppHeader from '../header/AppHeader';
import Voice from '@react-native-voice/voice';
import ModalLotteView from './ModalLotteView';
import ItemSuggestions from '../search/ItemSuggestions';
import ItemHistory from '../search/ItemHistory';
import IconHeader from '../../components/icons/IconHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  eventAddItem,
  eventRemoveItem,
} from '../../store/actions/itemHistoryActions';

type Props = {
  visible?: boolean;
  visibleDisabled?: () => void;
  invisible?: () => void;
};

const ModalSearch = (props: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [textInput, setTextInput] = React.useState<string | any>('');
  const [error, setError] = React.useState<string | any>('');

  const [items, setItems] = React.useState<string | any>([]);

  const isAndroid = Platform.OS === 'android';

  const dispatch: string | any = useDispatch();

  const [showDiaLog, setShowDiaLog] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Đặt lệnh gọi lại cho trạng thái quy trình
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      //phá hủy quá trình sau khi chuyển đổi màn hình
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechError = (err: any) => {
    // Được gọi khi xảy ra lỗi.
    console.log('onSpeechError: ', err);

    setError(JSON.stringify(err.error));
    setShowDiaLog(false);
    ToastAndroid.show('Không nhận dạng được ', ToastAndroid.BOTTOM);
  };

  const onSpeechResults = (err: any) => {
    // Được gọi khi SpeechRecognizer nhận dạng xong
    console.log('onSpeechResults: ', err);

    setTextInput(err.value.join(' '));
    console.log(err.value.join(' '));

    setShowDiaLog(false);
  };
  const startRecognizing = async () => {
    try {
      await Voice.start('vi-VN');
      setError('');
      setTextInput('');
    } catch (e) {
      console.error(e);
    }
  };

  function onPressMic() {
    startRecognizing();
    setShowDiaLog(true);
  }
  function eventCancel() {
    setShowDiaLog(false);
  }

  function eventSetTextInput(text: string | any) {
    if (textInput !== ' ') {
      setTextInput(text);
    }
  }

  //xử lý sự kiện khi người dùng ấn tìm kiếm
  //{bug chưa show bàn phím khi focus vào textinput}
  async function onSubmitEditing() {
    try {
      if (textInput !== '') {
        dispatch(eventAddItem({textInput}));
        setTextInput('');
      }
    } catch (e) {
      console.log(e);
    }
  }
  //clear bộ nhớ
  async function onPressClear() {
    dispatch(eventRemoveItem());
  }

  const renderContent = (
    <>
      <View style={styles.mRecentSearch}>
        <Text style={styles.mText}>Tìm kiếm gần đây</Text>
        <IconHeader
          sizes={sizes._24sdp}
          name={isAndroid ? 'md-trash' : 'ios-md-trash'}
          style={styles.mStyleIConsDelete}
          onPress={onPressClear}
        />
      </View>
      <ItemHistory />
      <View style={styles.mSuggestions}>
        <Text style={styles.mText}>Gợi ý tìm kiếm</Text>
        <ItemSuggestions />
      </View>
    </>
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={props.visibleDisabled}>
        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          transparent={true}
          visible={props.visible}>
          <View
            style={{
              backgroundColor: ArrayColors._color_white,
              flex: 1,
            }}>
            <AppHeader
              content
              customContent={
                <HeaderSearch
                  value={textInput}
                  onChangeText={(text: string | any) => eventSetTextInput(text)}
                  onPressOnBack={props.invisible}
                  onPressMic={onPressMic}
                  onSubmitEditing={onSubmitEditing}
                />
              }
            />
            <FlatList
              data={null}
              renderItem={null}
              ListFooterComponent={renderContent}
              listKey="Modal_Search"
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
            />
            <View style={styles.mContainerBody} />
          </View>

          <ModalLotteView showDiaLog={showDiaLog} onPress={eventCancel} />
        </Modal>
      </TouchableWithoutFeedback>
    </>
  );
};

export default memo(ModalSearch);

const styles = StyleSheet.create({
  mContainerBody: {
    height: 1,
    width: sizes._screen_width,
    marginTop: sizes._12sdp,
    backgroundColor: ArrayColors.blue_item_catory,
  },
  mRecentSearch: {
    marginTop: sizes._18sdp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mSuggestions: {
    marginVertical: sizes._18sdp,
  },
  mText: {
    marginHorizontal: sizes._12sdp,
    fontSize: sizes._18sdp,
    fontWeight: 'bold',
    color: ArrayColors._color_black,
  },
  mStyleIConsDelete: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: sizes._12sdp,
  },
});
