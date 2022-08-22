import AsyncStorage from '@react-native-async-storage/async-storage';

export enum KeyStorage {
  TOKEN = '@user_token',
}

export const getDataUser = async (key: any) => {
  // get Data from Storage
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
