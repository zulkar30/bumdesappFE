import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import { BASE_URL } from '../../config';

export const getDeviceToken = async () => {
  try {
    // Cek izin untuk menerima push notification
    await messaging().requestPermission();

    // Mendapatkan device token
    const token = await messaging().getToken();
    console.log('Device Token:', token);

    return token;
  } catch (error) {
    console.error('Gagal mendapatkan token perangkat:', error);
    return null;
  }
};

export const saveDeviceToken = async ({token, deviceToken}) => {
  // console.log('Token yang diambil dari AsyncStorage:', token);
  // console.log('Mulai mengirim token perangkat: ', deviceToken);
  try {
    console.log('Data yang akan dikirimkan ke server:', {
      deviceToken,
      token,
      url: `${BASE_URL}/api/save-device-token`,
    });

    const response = await axios.post(
      `${BASE_URL}/api/save-device-token`,
      {device_token: deviceToken},
      {
        headers: {Authorization: `Bearer ${token}`},
        'Content-Type': 'application/json',
      },
    );

    console.log('Token Perangkat Berhasil Disimpan:', response.data);
  } catch (error) {
    console.error('Gagal Menyimpan Token Perangkat', error);
  }
};
