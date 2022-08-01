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
import ScreenAdress from '../screens/address/ScreenAdress';
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


export enum NameScreen {
  HOME = 'AppContainer',
  DETAIL_PRODUCT = 'DetailProduct',
  LOGIN_AND_REGISTER = 'ScreenLogin',
  ADDRESS = 'ScreenAddress',
  ORDER = 'ScreenOrder',
  SETTINGS = 'ScreenSettings',
  INTRODUCE = 'ScreensIntroduce',
  SCREENOTPSETTING = 'ScreenVeryOTP',
  CHANGEPASS = 'ScreenChangePass',
  LIST_ADDRESS = 'ScreenListAddress',
  ONBOARDING = 'OnboardingFirst',
  INVOICE = 'ScreenStatusInvoice',
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
        initialRouteName={open ? NameScreen.HOME : NameScreen.ONBOARDING}>
        <Stack.Screen
          name="OnboardingFirst"
          component={OnboardingFirst}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppContainer"
          component={AppContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailProduct"
          component={DetailProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenLogin"
          component={ScreenLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenRegister"
          component={ScreenRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScreenVeryfiOTP"
          component={ScreenVeryfiOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenRegisterDetail"
          component={ScreenRegisterDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScreenAddress"
          component={ScreenAdress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenListAddress"
          component={ScreenListAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenOrder"
          component={ScreenOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenUserSpaper"
          component={ScreenUserSpaper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenSettings"
          component={ScreensSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreensIntroduce"
          component={ScreensIntroduce}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenVeryOTP"
          component={ScreenVeryOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenChangePass"
          component={ScreenChangePass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenStatusInvoice"
          component={ScreenInvoice}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
