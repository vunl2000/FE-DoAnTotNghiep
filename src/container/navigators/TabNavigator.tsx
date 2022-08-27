import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AppContainer from '../navigators/AppContainer';
import DetailProduct from '../screens/product/DetailProduct';
import ScreenLogin from '../screens/account/screen-acc/ScreenLogin';
import ScreenRegister from '../screens/account/screen-acc/ScreenRegister';
import ScreenRegisterDetail from '../screens/account/screen-acc/ScreenRegisterDetail';
import ScreenVeryfiOTP from '../screens/account/screen-acc/ScreenVeryfiOTP';
import OnboardingFirst from '../../container/screens/onboarding/OnboardingFirst';
import ScreenOrder from '../screens/order/ScreenOrder';
import ScreenUserSpaper from '../screens/userspaper/ScreenUserSpaper';
import {useDispatch, useSelector} from 'react-redux';
import ScreensSettings from '../screens/settings/ScreensSettings';
import ScreensIntroduce from '../screens/settings/ScreensIntroduce';
import ScreenVeryOTP from '../screens/settings/ScreenVeryOTP';
import ScreenChangePass from '../screens/settings/ScreenChangePass';
import ScreenListAddress from '../screens/address/ScreenListAddress';
import {getBanner} from '../../store/actions/fristOpenActions';
import {loadCatory} from '../../store/actions/catoryActions';
import {loadProducts} from '../../store/actions/productsActions';
import ScreenInvoice from '../screens/invoice/ScreenInvoice';
import SearchScreen from '../screens/search/SearchScreen';
import ProductView from '../screens/product/ProductView';
import ScreenForgotPassword from '../screens/account/screen-acc/ScreenForgotPassword';
import ProductHeart from '../screens/heart/ProductHeart';
import ScreenAddress from '../screens/address/ScreenAddress';
import AnswerQuestions from '../screens/questions/AnswerQuestions';
import ScreenWalet from '../screens/walet/ScreenWalet';
import ScreenGiftcard from '../screens/walet/ScreenGiftcard';
import ScreenCheckQuestions from '../screens/questions/ScreenCheckQuestions';
import ScreenRulerSize from '../screens/sizeandcolor/ScreenRulerSize';
import CodeRule from '../screens/coderule/CodeRule';
import Shipping from '../screens/coderule/Shipping';
export enum NameScreen {
  HOME = 'AppContainer',
  DETAIL_PRODUCT = 'DetailProduct',
  LOGIN = 'ScreenLogin',
  REGISTER = 'ScreenRegister',
  ADDRESS = 'ScreenAddress',
  ORDER = 'ScreenOrder',
  SETTINGS = 'ScreensSettings',
  INTRODUCE = 'ScreensIntroduce',
  VERY_OTP = 'ScreenVeryOTP',
  CHANGEPASS = 'ScreenChangePass',
  LIST_ADDRESS = 'ScreenListAddress',
  ONBOARDING = 'OnboardingFirst',
  PRODUCT_VIEW = 'ProductView',
  SEARCH_SCREEN = 'SearchScreen',
  HEART_PRODUCT = 'ProductHeart',
  OTP = 'ScreenVeryfiOTP',
  REGISTER_DETAIL = 'ScreenRegisterDetail',
  USER_SPAPER = 'ScreenUserSpaper',
  INVOICE = 'ScreenInvoice',
  ANSWERQUESTIONS = 'AnswerQuestions',
  SCREENWALET = 'ScreenWalet',
  SCREENGIF = 'ScreenGiftcard',
  SCREENCHECKQUESTIONS = 'ScreenCheckQuestions',
  SCREENRULERSIZE = 'ScreenRulerSize',
  SCREEN_CODE_RULE = 'CodeRule',
  SCREEN_SHIPPING='Shipping'
}

export default function TabNavigator() {
  const open = useSelector((state: any) => state.firstOpen.firstOpen);
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
    dispatch(loadCatory());
    dispatch(loadProducts());
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={open ? NameScreen.HOME : NameScreen.ONBOARDING}
       >
        <Stack.Screen
          name={NameScreen.ONBOARDING}
          component={OnboardingFirst}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.HOME}
          component={AppContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.DETAIL_PRODUCT}
          component={DetailProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.LOGIN}
          component={ScreenLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.REGISTER}
          component={ScreenRegister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.OTP}
          component={ScreenVeryfiOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.REGISTER_DETAIL}
          component={ScreenRegisterDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.ADDRESS}
          component={ScreenAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.LIST_ADDRESS}
          component={ScreenListAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.ORDER}
          component={ScreenOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.USER_SPAPER}
          component={ScreenUserSpaper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.SETTINGS}
          component={ScreensSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.INTRODUCE}
          component={ScreensIntroduce}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.VERY_OTP}
          component={ScreenVeryOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.CHANGEPASS}
          component={ScreenChangePass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.INVOICE}
          component={ScreenInvoice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenForgotPassword"
          component={ScreenForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.PRODUCT_VIEW}
          component={ProductView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.SEARCH_SCREEN}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.HEART_PRODUCT}
          component={ProductHeart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.ANSWERQUESTIONS}
          component={AnswerQuestions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.SCREENWALET}
          component={ScreenWalet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.SCREENGIF}
          component={ScreenGiftcard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NameScreen.SCREENCHECKQUESTIONS}
          component={ScreenCheckQuestions}
          options={{headerShown: false}}
        />
        {/* Man hinh huong dan kich thuoc */}
        <Stack.Screen
          name={NameScreen.SCREENRULERSIZE}
          component={ScreenRulerSize}
          options={{headerShown: false}}
        />
        {/* màn hình quy tắc code */}
        <Stack.Screen
          name={NameScreen.SCREEN_CODE_RULE}
          component={CodeRule}
          options={{headerShown: false}}
        />
        {/* Hình thức giao hàng */}
        <Stack.Screen
          name={NameScreen.SCREEN_SHIPPING}
          component={Shipping}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
