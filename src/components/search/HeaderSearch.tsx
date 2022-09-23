import {StyleSheet, Platform, View, TextInput, Keyboard} from 'react-native';
import React, {useRef} from 'react';
import IconHeader from '../../components/icons/IconHeader';

import sizes from '../../res/sizes/sizes';
import ArrayColors from '../../res/colors/ArrayColors';

type Props = {
  onPressOnBack?: () => void;
  onPressMic?: () => void;
  value?: string | any;
  onChangeText?: string | any;
  onSubmitEditing?: () => void;
};

const HeaderSearch = (props: Props) => {
  const isAndroid = Platform.OS === 'android';

  const textInputRef: any = React.useRef<string | any>();

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <IconHeader
        sizes={sizes._24sdp}
        name={isAndroid ? 'arrow-back' : 'ios-arrow-back-outline'}
        style={styles.mStyleICons}
        onPress={props.onPressOnBack}
      />
      <View style={styles.mStyleBodyText}>
        <TextInput
          value={props.value}
          style={styles.mStyleText}
          placeholder="Từ khoá tìm kiếm..."
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType="search"
          autoFocus={true}
          ref={textInputRef}
          onLayout={() => textInputRef.current.focus()}
        />
      </View>

      <IconHeader
        sizes={sizes._24sdp}
        name={isAndroid ? 'mic-outline' : 'ios-mic-outline'}
        style={styles.mStyleIConsMic}
        onPress={props.onPressMic}
      />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  mStyleICons: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mStyleIConsMic: {
    borderRadius: sizes._42sdp / 2,
    width: sizes._42sdp,
    height: sizes._42sdp,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: sizes._12sdp,
  },
  mStyleText: {
    paddingLeft: sizes._10sdp,
  },
  mStyleBodyText: {
    backgroundColor: ArrayColors.darkGrayAccount,
    flex: 1,
    height: sizes._48sdp,
  },
});
