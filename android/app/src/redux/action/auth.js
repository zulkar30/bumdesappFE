import axios from 'axios';
import {
  getDeviceToken,
  saveDeviceToken,
  showMessage,
  storeData,
} from '../../utils';
import { setLoading } from './global';
import { BASE_URL } from '../../config';

export const signUpAction =
  (dataRegister, photoReducer, navigation) => async dispatch => {
    try {
      dispatch(setLoading(true));

      // Ambil device token
      const deviceToken = await getDeviceToken();
      console.log('Device Token:', deviceToken);

      // Tambahkan device_token ke data registrasi
      const registerData = {
        ...dataRegister,
        device_token: deviceToken, // Kirim ke backend
      };
      console.log('📦 Data yang dikirim ke /api/register:', registerData);

      const res = await axios.post(`${BASE_URL}/api/register`, registerData);
      const profile = res.data.data.user;
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;

      // Simpan device token ke database (jika perlu dipanggil terpisah)
      await saveDeviceToken({ token, deviceToken });

      if (photoReducer.isUploadPhoto && photoReducer.uri) {
        const photoForUpload = new FormData();
        photoForUpload.append('file', {
          uri: photoReducer.uri,
          type: photoReducer.type,
          name: photoReducer.name,
        });

        try {
          const resUpload = await axios.post(
            `${BASE_URL}/api/user/photo`,
            photoForUpload,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          profile.profile_photo_url = `${BASE_URL}/storage/${resUpload.data.data[0]}`;
        } catch (err) {
          showMessage('Upload foto gagal');
        }
      }

      // Simpan data user
      storeData('token', { value: token });
      storeData('userProfile', { ...profile, token });

      // Navigasi ke halaman sukses daftar
      navigation.reset({ index: 0, routes: [{ name: 'SuccessSignUp' }] });
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      showMessage(
        err?.response?.data?.data?.message || 'Terjadi kesalahan, coba lagi.',
      );
    }
  };

export const signInAction = (form, navigation) => async dispatch => {
  dispatch(setLoading(true));

  // 👉 Tambahkan log URL dan data form sebelum request
  console.log('🔗 URL yang dipanggil:', `${BASE_URL}/api/login`);
  console.log('📦 Data yang dikirim ke backend:', form);

  try {
    const res = await axios.post(`${BASE_URL}/api/login`, form,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
    const profile = res.data.data.user;

    // Tunggu hasil device token
    const deviceToken = await getDeviceToken();
    console.log('Device Token:', deviceToken);

    await saveDeviceToken({
      token,
      deviceToken,
    });
    dispatch(setLoading(false));

    // Simpan data token
    storeData('token', { value: token });
    storeData('userProfile', { ...profile, token });

    // Navigasi ke halaman utama
    navigation.reset({ index: 0, routes: [{ name: 'AppUtama' }] });

    // Tampilkan pesan sukses
    showMessage({
      message: 'Login Berhasil',
      description: 'Selamat datang!',
      type: 'success',
    });
  } catch (err) {
    dispatch(setLoading(false));

    // Log URL dan form tetap untuk keperluan debugging saat error
    console.log('🔗 URL yang dipanggil:', `${BASE_URL}/api/login`);
    console.log('📦 Data yang dikirim ke backend:', form);

    const errorMessage =
      typeof err?.response?.data?.data?.message === 'string'
        ? err.response.data.data.message
        : 'Terjadi kesalahan, coba lagi.';

    console.log('❌ Full error:', err);
    console.log('❌ Response data:', err?.response?.data);

    console.log(errorMessage);
    showMessage({
      message: 'Login Gagal',
      description: errorMessage,
      type: 'danger',
    });
  }
};
