import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key: string, defaultValue: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log("AsyncStorage.getData", error);
    return null;
  }
};

const setData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("AsyncStorage.setData", error);
  }
};

export default {
  getData,
  setData,
};
