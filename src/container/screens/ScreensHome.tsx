import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Animated,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import ArrayColors from '../../res/colors/ArrayColors';
import {FAKEDATA} from '../../data/fakedata/Data';
import sizes from '../../res/sizes/sizes';
const ScreensHome = () => {
  const [height, setHeight] = React.useState(0);

  const [booleanLogo, setBooleanLogo] = React.useState(true);

  const activeIndexAnimation = React.useRef(new Animated.Value(0)).current;

  if (height > 50) {
    // React.useEffect(() => {
    Animated.timing(activeIndexAnimation, {
      toValue: sizes._screen_width / 1.5,
      duration: 500,
      useNativeDriver: false,
    }).start();
    // }, [activeIndexAnimation,]);

    // setBooleanLogo(false);
  } else if (height < 50) {
    Animated.timing(activeIndexAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // setBooleanLogo(true);
  }

  const renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <View
        style={{
          height: 58,
          marginVertical: 5,
          marginHorizontal: 5,
          backgroundColor: '#000',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              lineHeight: 24,
              fontSize: 16,
              fontWeight: '400',
              color: '#fff',
            }}>
            {item?.mission}
          </Text>
        </View>
      </View>
    );
  };
  const {mContainer} = styles;

  return (
    <SafeAreaView style={mContainer}>
      <Header logo={booleanLogo} activeIndexAnimation={activeIndexAnimation} />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <View>
          
        </View> */}
        {/* <Animated.View
          style={{
            width: activeIndexAnimation,
            height: sizes._48sdp,
            backgroundColor: '#03BFF4',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            zIndex :0
          }}></Animated.View> */}

        <FlatList
          data={FAKEDATA || []}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item && item.id ? `${item?.id?.toString()}` : index?.toString()
          }
          onScroll={event => {
            setHeight(event.nativeEvent.contentOffset.y);
            console.log(event.nativeEvent.contentOffset.y);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScreensHome;

const styles = StyleSheet.create({
  mContainer: {
    flex: 1,
    backgroundColor: ArrayColors._color_white,
  },
});
