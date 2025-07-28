import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../showMessage';

export const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
    // console.log(
    //   `Data disimpan ke AsyncStorage dengan key ${storageKey}:`,
    //   jsonValue,
    // );
  } catch (e) {
    showMessage('Gagal menyimpan data di LocalStorage');
  }
};

export const getData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showMessage('Gagal mengambil data dari LocalStorage');
  }
};

export const removeData = async key => {
  try {
    // Ambil data sebelum dihapus
    const data = await AsyncStorage.getItem(key);

    if (data) {
      // console.log('Data yang akan dihapus:', JSON.parse(data)); // Menampilkan data yang akan dihapus ke console
    } else {
      // console.log('Data dengan kunci', key, 'tidak ditemukan');
    }

    // Menghapus data dari AsyncStorage
    await AsyncStorage.removeItem(key);
    // console.log('Data dengan kunci', key, 'telah dihapus');
  } catch (error) {
    // console.error('Error removing data from AsyncStorage:', error);
  }
};

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // Menyimpan data ke AsyncStorage
  } catch (error) {
    // console.error('Error saving data to AsyncStorage:', error);
  }
};

const clearAllData = async () => {
  try {
    await AsyncStorage.clear(); // Menghapus semua data
    // console.log('Seluruh data di AsyncStorage telah dihapus');
  } catch (error) {
    // console.error('Gagal menghapus data dari AsyncStorage:', error);
  }
};

// Panggil fungsi ini untuk menghapus semua data
// clearAllData();
