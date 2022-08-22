import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import ArrayColors from '../../res/colors/ArrayColors';
import sizes from '../../res/sizes/sizes';
import Icon from 'react-native-vector-icons/Ionicons';

interface ColumView {
  valueLeft?: string | any;
  customLeft?: any;
  customRight?: any;
  valueRight?: any;
  iconRight?: boolean;
  onPressIconRight?: () => void;
  styleContainer?: any;
  styleText?: any;
  styleTextLabel?: any;
}

const ColumView = ({
  styleContainer,
  onPressIconRight,
  iconRight,
  valueLeft,
  valueRight,
  customLeft,
  styleText,
  styleTextLabel,
  customRight,
}: ColumView) => {
  return (
    <TouchableWithoutFeedback>
      <View style={[styleContainer, styles.container]}>
        {customLeft ? (
          customLeft
        ) : (
          <Text style={styleTextLabel}>{valueLeft}</Text>
        )}
        {customRight ? (
          customRight
        ) : (
          <View style={styles.right}>
            {valueRight ? <Text style={styleText}>{valueRight}</Text> : null}
            {iconRight ? (
              <>
                <View style={styles.space} />
                <Icon
                  name="chevron-forward"
                  size={sizes._24sdp}
                  color={ArrayColors._color_black}
                />
              </>
            ) : null}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ColumView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArrayColors._color_white,
    paddingHorizontal: sizes._18sdp,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  right: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  space: {
    width: sizes._10sdp,
  },
});
