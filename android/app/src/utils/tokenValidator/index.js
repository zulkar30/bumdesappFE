// helpers/tokenValidator.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

export const validateToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    console.log('Token tidak ditemukan di AsyncStorage');
    return false; // Token tidak valid
  }

  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log('User data:', result);
      return true; // Token valid
    } else {
      console.log('Token tidak valid atau sudah kedaluwarsa');
      return false; // Token tidak valid
    }
  } catch (error) {
    console.error('Error saat memvalidasi token:', error);
    return false; // Token tidak valid
  }
};
