import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { IcBackWhite, IcCart, IcPay } from '../../assets';
import {
  Button,
  Counter,
  Gap,
  Number,
  Rating,
  TextInput,
} from '../../components';
import { BASE_URL } from '../../config';
import {
  addToCart,
  fetchReviews,
  getData,
  onOrder,
  submitReview,
} from '../../utils';

const ProductDetail = ({ navigation, route, userId, productId }) => {
  const { id, name, description, picturePath, price, rate, stock } = route.params;
  const [totalItem, setTotalItem] = useState(1);
  const [userProfile, setUserProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rate: 5, review: '' });
  const [averageRating, setAverageRating] = useState(rate);
  const dispatch = useDispatch();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(true);

  // Cek Review Produk
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/check-purchase?user_id=${userId}&product_id=${productId}`);
        const text = await response.text();
        const data = JSON.parse(text);
        console.log('RESPONSE:', text);
        setHasPurchased(data.hasPurchased);
      } catch (error) {
        console.error('Gagal mengecek status pembelian:', error);
      } finally {
        setLoadingCheck(false);
      }
    };

    checkPurchase();
  }, [userId, productId]);

  // Ambil data review
  useEffect(() => {
    fetchReviews(id, setReviews);
  }, [id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getData('userProfile');
      setUserProfile(profile); // Mengatur state userProfile dengan data yang diambil
    };

    fetchUserProfile();
  }, []);

  // Menambahkan review
  const handleReviewSubmit = () => {
    submitReview(id, newReview, reviews, setReviews, setNewReview);
  };

  // Menambahkan jumlah produk
  const onCounterChange = value => {
    setTotalItem(value);
  };

  // Pemesanan Produk
  const handleOrder = () => {
    console.log('Data yang dikirim:', {
      id, name, price, picturePath, totalItem, userProfile
    });
    onOrder({
      id, name, price, picturePath, totalItem, userProfile, navigation,
      onSuccess: data => {
        console.log('Sukses:', data);
      },
      onError: error => {
        console.error('Terjadi kesalahan:', error);
      },
    });
  };

  // Menambahkan Produk ke Keranjang
  const handleAddToCart = () => {
    console.log('Data yang dikirim:', {
      id,
      userProfile,
      totalItem,
      stock,
      BASE_URL,
    });
    addToCart({
      id,
      userProfile,
      totalItem,
      stock,
      BASE_URL,
      onSuccess: data => {
        console.log('Sukses:', data);
      },
      onError: error => {
        console.error('Terjadi kesalahan:', error);
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <ImageBackground source={{ uri: picturePath }} style={styles.cover}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <IcBackWhite />
          </TouchableOpacity>
        </ImageBackground>

        {/* Produk Detail */}
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.productContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{name}</Text>
                <Rating number={rate} />
              </View>
              <Counter onValueChange={onCounterChange} />
            </View>
            <Text style={styles.stock}>Stok: {stock}</Text>
            <Text style={styles.desc}>{description}</Text>
          </View>
        </View>

        {/* Beri Rating dan Ulasan */}
        {loadingCheck ? (
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>Memeriksa status pembelian...</Text>
        ) : hasPurchased ? (
          <View style={styles.reviewsSection}>
            <View style={styles.reviewForm}>
              <Text style={styles.reviewsTitle}>Beri Rating dan Ulasan</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Pilih Rating:</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setNewReview({ ...newReview, rate: star })}>
                      <Text
                        style={
                          newReview.rate >= star
                            ? styles.starFilled
                            : styles.starEmpty
                        }>
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <Text style={styles.ratingLabel}>Tulis Ulasan:</Text>
              <TextInput
                style={styles.reviewInput}
                value={newReview.review}
                onChangeText={
                  text => setNewReview({ ...newReview, review: text }) // Update review text
                }
                placeholder="Tulis ulasan Anda"
              />
              <Button
                text="Kirim Ulasan"
                onPress={handleReviewSubmit} // Submit review function
              />
            </View>
          </View>
        ) : (
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>
            Anda belum pernah membeli produk ini, jadi tidak bisa memberi ulasan.
          </Text>
        )}

        {/* Ulasan Produk */}
        <View style={styles.userReviewsSection}>
          {reviews.map(item => (
            <View style={styles.reviewItem} key={item.id}>
              {/* Menampilkan Foto Pengguna */}
              {item.user && item.user.name ? (
                <View style={styles.userInfoContainer}>
                  <Image
                    source={{
                      uri: item.picturePath
                        ? `${BASE_URL}/storage/${item.picturePath}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item.name,
                        )}&color=FFFFFF&background=000000`,
                    }}
                    style={styles.userPhoto}
                  />
                  <Text style={styles.userName}>{item.user.name}</Text>
                </View>
              ) : (
                <Text style={styles.userName}>Pengguna Tidak Dikenal</Text> // Tampilkan pesan jika data pengguna tidak ada
              )}

              {/* Menampilkan Rating dan Ulasan */}
              <Rating number={item.rate} />
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tombol Pesan */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.labelTotal}>Total Harga:</Text>
          <Number style={styles.priceTotal} number={totalItem * price} />
        </View>
        <View style={styles.buttonContainer}>
          {/* Tombol Pesan Sekarang dengan Ikon */}
          <TouchableOpacity
            style={[styles.button, styles.leftButton]}
            onPress={handleOrder}>
            <IcPay style={styles.icon} />
          </TouchableOpacity>
          <Gap width={10} />

          {/* Tombol Tambahkan ke Keranjang dengan Ikon */}
          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPress={handleAddToCart}>
            <IcCart style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  page: { flex: 1 },
  cover: {
    height: 330,
    resizeMode: 'cover',
    paddingTop: 26,
    paddingLeft: 22,
  },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 16,
  },
  footer: {
    position: 'absolute', // Menjadikan footer tetap di bagian bawah layar
    bottom: 0, // Menempel di bagian bawah
    width: '100%', // Lebar penuh
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white', // Warna latar belakang footer
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Garis pemisah di atas footer
  },
  priceContainer: {
    flex: 1,
  },
  reviewsSection: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 16,
  },
  userReviewsSection: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 16,
    paddingBottom: 200,
  },
  reviewsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  reviewItem: {
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20, // Membuat foto berbentuk lingkaran
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  reviewForm: {
    marginVertical: 10,
  },
  reviewLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  reviewInput: {
    borderColor: '#8D92A3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  // button: {
  //   width: 160,
  // },
  labelTotal: { fontSize: 13, fontFamily: 'Poppins-Regular', color: '#8D92A3' },
  priceTotal: { fontSize: 18, fontFamily: 'Poppins-Regular', color: '#020202' },
  stock: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    textAlign: 'right',
  },
  ratingContainer: {
    marginVertical: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  starFilled: {
    fontSize: 24,
    color: '#FFD700', // Warna emas
    marginHorizontal: 5,
  },
  starEmpty: {
    fontSize: 24,
    color: '#CCC', // Warna abu-abu
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: 'auto',
    justifyContent: 'center', // Agar ikon dan teks terpusat
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10, // Jarak antara ikon dan teks
  },
  leftButton: {
    backgroundColor: '#1ABC9C', // Sesuaikan warna tombol
  },
  rightButton: {
    backgroundColor: '#FFA500', // Sesuaikan warna tombol
  },
});
