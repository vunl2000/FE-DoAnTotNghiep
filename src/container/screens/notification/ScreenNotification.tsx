import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import AppHeader from '../../../components/header/AppHeader';
import sizes from '../../../res/sizes/sizes';
import ArrayColors from '../../../res/colors/ArrayColors';
import HeaderShown from '../../../components/accounts/HeaderShown';
import axios from 'axios';
const ScreenNotification = ({ navigation }: any) => {

    const [dataNotification, setDataNotification] = React.useState<any>([])
    const [loadMore, setLoadMore] = React.useState<any>(false)

    React.useEffect(() => {
        mCallDataNotification();
    }, [])

    function mCallDataNotification() {
        var config = {
            method: 'GET',
            url: 'http://52.141.50.48:3000/api/user-data-notification/get-data-notification',
            headers: {},

        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setDataNotification(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    function onBackPress() {
        navigation.goBack();
    }
    function onScroll() {

    }

    function renderItem({ item, index }: any) {
        console.log(item.title);

        return (
            <View style={[styles.mContainerData, { marginVertical: index % 2 == 0 ? sizes._10sdp : 0 }]}>
                <View style={{ flexDirection: "column", padding: sizes._10sdp }}>
                    <Text style={{
                        fontSize: sizes._20sdp,
                        color: ArrayColors._color_black,
                        fontWeight: "bold"
                    }}>
                        {item?.title}
                    </Text>

                    <Text style={{ marginVertical: sizes._6sdp }}
                        numberOfLines={2}
                    >{item?.body}</Text>
                    <Text style={{}}
                        numberOfLines={2}
                    >{item?.createdAt}</Text>
                </View>
            </View>

        )
    }

    return (
        <SafeAreaView style={styles.mContainer}>
            <AppHeader
                content
                customContent={
                    <HeaderShown titleScreen="TIN NHẮN" onBackPress={onBackPress} />
                }></AppHeader>
            <View style={{
                width: sizes._screen_width, height: sizes._1sdp / 3,
                backgroundColor: ArrayColors._color_gray
            }}></View>
            <FlatList
                data={dataNotification}
                renderItem={renderItem}
                onScroll={onScroll}
                // ListFooterComponent={RenderView}
                listKey="Screen_Notification"
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
            />

        </SafeAreaView>
    )
}

export default ScreenNotification

const styles = StyleSheet.create({
    mContainer: {
        flex: 1,
        backgroundColor: ArrayColors._color_white_black,
    },
    mContainerData: {
        width: sizes._screen_width - sizes._20sdp,
        // height: sizes._screen_width / 5,
        backgroundColor: ArrayColors._color_white,
        marginHorizontal: sizes._10sdp,

    }
})


