import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getItem = async key => {
    let value;

    try {
      value = await AsyncStorage.getItem(key);
    } catch (e) {
      throw new Error(e.message);
    }

    return value;
  };

  removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  multiRemoveItem = async keys => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  setObject = async (key: string, value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getObjectJson = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export default new Storage();
