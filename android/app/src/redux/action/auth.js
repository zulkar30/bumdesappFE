import axios from 'axios';
import {
  getDeviceToken,
  saveDeviceToken,
  showMessage,
  storeData,
} from '../../utils';
import {setLoading} from './global';
import {BASE_URL} from '../../config';

export const signUpAction = (dataRegister, navigation) => async dispatch => {
  try {
    dispatch(setLoading(true));

    // Tambahkan device_token ke data registrasi
    const registerData = {
      ...dataRegister,
    };
    console.log('📦 Data yang dikirim ke /api/register:', registerData);

    const res = await axios.post(`${BASE_URL}/api/register`, registerData);

    // Navigasi ke halaman sukses daftar
    navigation.reset({index: 0, routes: [{name: 'EmailVerify'}]});
    dispatch(setLoading(false));
    console.log('Register success:', res.data);
  } catch (err) {
    dispatch(setLoading(false));
    const fallbackMessage = 'Terjadi kesalahan, coba lagi.';
    const errorMessage =
      err?.response?.data?.data?.message || // Laravel-style error message
      err?.response?.data?.message || // Beberapa API pakai struktur ini
      err?.message || // Error dari axios atau JS
      fallbackMessage;
    console.log('Error Default', fallbackMessage);
    console.log(
      'Error Laravel',
      err?.response?.data?.data?.message || 'Tak Tau',
    );
    console.log('Error API', err?.response?.data?.message || 'Tak Tau');
    console.log('Error JS', err?.message || 'Tak Tau');
    showMessage({
      message: 'Register Gagal',
      description: errorMessage,
      type: 'danger',
    });
  }
};

export const signInAction = (form, navigation) => async dispatch => {
  dispatch(setLoading(true));

  // 👉 Tambahkan log URL dan data form sebelum request
  console.log('🔗 URL yang dipanggil:', `${BASE_URL}/api/login`);
  console.log('📦 Data yang dikirim ke backend:', form);

  try {
    const res = await axios.post(`${BASE_URL}/api/login`, form, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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
    storeData('token', {value: token});
    storeData('userProfile', {...profile, token});

    // Navigasi ke halaman utama
    navigation.reset({index: 0, routes: [{name: 'AppUtama'}]});

    // Tampilkan pesan sukses
    showMessage({
      message: 'Login Berhasil',
      description: 'Selamat datang!',
      type: 'success',
    });
  } catch (error) {
    dispatch(setLoading(false));
    // Cek response error dari backend
    if (error.response) {
      const {status, data} = error.response;

      if (status === 401) {
        showMessage({
          message: 'Login gagal',
          description: 'Email atau password salah.',
          type: 'danger',
        });
      } else if (status === 403) {
        showMessage({
          message: 'Akun belum aktif',
          description: 'Email kamu belum diverifikasi, silakan cek gmail.',
          type: 'warning',
        });
      } else {
        showMessage({
          message: 'Terjadi kesalahan',
          description: data.message || 'Coba lagi nanti.',
          type: 'danger',
        });
      }
    } else {
      // Error di luar response (misalnya timeout / no internet)
      showMessage({
        message: 'Tidak ada koneksi',
        description: 'Periksa internet kamu.',
        type: 'danger',
      });
    }
  }
};
