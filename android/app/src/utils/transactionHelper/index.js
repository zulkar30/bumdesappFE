import axios from 'axios';
import { getData, setData, storeData } from '../storage';
import { BASE_URL } from '../../config';
import { removeFromCart } from '../../redux/action';

// Order
export const onOrder = async ({
  id,
  name,
  price,
  picturePath,
  totalItem,
  userProfile,
  navigation,
  onSuccess,
  onError,
}) => {
  try {
    console.log('Token yang digunakan:', userProfile.token); // debug token

    // Ambil ongkir dari API
    const response = await axios.get(`${BASE_URL}/api/shipping-price`, {
      headers: {
        Authorization: `Bearer ${userProfile.token}`,
        Accept: 'application/json',
      },
    });

    const driver = Number(response.data.driver_price);
    const totalPrice = totalItem * price;
    const total = totalPrice + driver;

    const data = {
      item: {
        id,
        name,
        price,
        picturePath,
      },
      transaction: {
        totalItem,
        totalPrice,
        driver,
        total,
      },
      userProfile,
    };

    console.log('Data yang dikirim dari Order:', data);
    navigation.navigate('OrderSummary', data);
    if (onSuccess) onSuccess(data);

  } catch (error) {
    console.log('Gagal mengambil ongkir:', error?.response?.data || error.message);
    Alert.alert('Error', 'Gagal mengambil ongkir. Silakan coba lagi.');
    if (onError) onError(error);
  }
};

// Review
export const fetchReviews = async (id, setReviews) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/${id}/review`);
    setReviews(response.data.data);
    console.log('Reviews:', response.data.data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    console.error('URL:', `${BASE_URL}/api/product/${id}/review`);
    // Tambahkan error handling sesuai kebutuhan
  }
};
export const submitReview = async (
  id,
  newReview,
  reviews,
  setReviews,
  setNewReview,
) => {
  if (!newReview.rate) {
    alert('Silakan pilih rating sebelum mengirim ulasan!');
    return;
  }

  if (!newReview.review) {
    alert('Silakan isi ulasan sebelum mengirim!');
    return;
  }

  const reviewData = {
    product_id: id,
    rate: newReview.rate,
    review: newReview.review,
    url: `${BASE_URL}/api/product/${id}/review`,
  };
  console.log('Data yang akan dikirim:', reviewData);

  try {
    const token = await getData('token');
    const response = await axios.post(
      `${BASE_URL}/api/product/${id}/review`,
      reviewData,
      {
        headers: {
          Authorization: token.value,
        },
      },
    );
    console.log('Response setelah mengirim ulasan:', response.data.data);
    alert('Ulasan Anda berhasil dikirim!');
    setReviews([...reviews, response.data.data]);
    setNewReview({ rate: 0, review: '' });
  } catch (error) {
    console.error('Error submitting review:', error);
    alert('Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi nanti.');
  }
};

// Keranjang
export const addToCart = async ({
  id,
  userProfile,
  totalItem,
  stock,
  BASE_URL,
  onSuccess,
  onError,
}) => {
  console.log('Data yang diterima di addToCart:', {
    id,
    userProfile,
    totalItem,
    stock,
  });
  try {
    // Validasi apakah user sudah login
    if (!userProfile?.id) {
      alert(
        'Silakan login terlebih dahulu untuk menambahkan produk ke keranjang!',
      );
      return;
    }

    // Validasi jumlah item dengan stok
    if (totalItem > stock) {
      alert('Jumlah produk melebihi stok yang tersedia!');
      return;
    }

    // Ambil token autentikasi
    const token = (await getData('token')).value;
    console.log('Token yang diambil dari AsyncStorage:', token);
    if (!token) {
      alert('Sesi Anda telah habis. Silakan login kembali.');
      return;
    }

    // Ambil data keranjang dari AsyncStorage
    const currentCart = (await getData('cart')) || [];
    console.log('Data cart yang diambil dari AsyncStorage:', currentCart);

    // Cek apakah produk sudah ada di keranjang
    if (currentCart.some(item => item.product_id === id)) {
      alert('Produk ini sudah ada di keranjang!');
      return;
    }

    // Data produk yang akan ditambahkan ke keranjang
    const product = {
      id,
      quantity: totalItem,
      user_id: userProfile.id,
      productId: id,
    };

    console.log('Data yang akan dikirimkan ke server:', {
      product,
      token,
      url: `${BASE_URL}/api/cart`,
    });

    // Kirim permintaan ke server
    const response = await axios.post(`${BASE_URL}/api/cart`, product, {
      headers: { Authorization: `Bearer ${token}` },
      'Content-Type': 'application/json',
    });

    console.log('Produk berhasil ditambahkan ke keranjang:', response.data);
    alert('Produk berhasil ditambahkan ke keranjang!');

    // Perbarui data keranjang di AsyncStorage
    const updatedCart = [...currentCart, product];
    await storeData('cart', updatedCart);

    // Panggil callback jika sukses
    if (onSuccess) onSuccess(response.data);
  } catch (error) {
    console.error('Error saat menambahkan ke keranjang:', error);

    // Tangani kesalahan
    if (error.response?.status === 401) {
      alert('Sesi Anda telah habis. Silakan login kembali.');
    } else {
      alert('Gagal menambahkan produk ke keranjang. Periksa koneksi Anda.');
    }

    // Panggil callback jika ada error
    if (onError) onError(error);
  }
};

// Hapus Produk di Keranjang
export const handleRemoveFromCart = async (
  itemId,
  dispatch,
  BASE_URL,
  token,
) => {
  try {
    // Hapus data di server
    const response = await axios.delete(`${BASE_URL}/api/cart/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Produk berhasil dihapus dari server:', response.data);

    // Jika berhasil, hapus data di AsyncStorage
    const cartData = await getData('cart');
    const updatedCart = cartData.filter(item => item.productId !== itemId);
    await setData('cart', updatedCart);
    console.log('Data keranjang yang baru:', updatedCart);

    // Dispatch Redux untuk memperbarui state
    dispatch(removeFromCart(itemId));
  } catch (err) {
    console.error('Gagal menghapus produk di server:', err);
  }
};

// Bayar di Keranjang
export const handleOrder = async ({
  id,
  name,
  price,
  picturePath,
  userProfile,
  totalItem,
  navigation,
  onSuccess,
  onError,
}) => {

  try {
    // Panggil API untuk ambil ongkir berdasarkan zona user
    const response = await axios.get(`${BASE_URL}/api/shipping-price`, {
      headers: {
        Authorization: `Bearer ${userProfile.token}`, // pastikan userProfile berisi token login
      },
    });

    const driver = Number(response.data.driver_price);
    const totalPrice = totalItem * price;
    const total = totalPrice + driver;

    const data = {
      item: {
        id,
        name,
        price,
        picturePath,
      },
      transaction: {
        totalItem,
        totalPrice,
        driver,
        total,
      },
      userProfile,
    };
    console.log('Data yang dikirim dari Order Summary:', data);
    if (onSuccess) onSuccess(data);
    // navigation.navigate('OrderSummary', data);
  } catch (error) {
    console.log('Gagal mengambil ongkir:', error);
    alert('Gagal mengambil ongkir. Silakan coba lagi.');
    if (onError) onError(error);
  }

};
