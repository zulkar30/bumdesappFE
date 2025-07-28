import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config';
import { getCartItems } from '../../../redux/action';
import { getData, handleOrder, handleRemoveFromCart } from '../../../utils';
import ItemListProduct from '../ItemListProduct';

const CartTabSection = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cartReducer);
  const [token, setToken] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const navigation = useNavigation();
  // console.log('navigation in CartTabSection:', navigation);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getData('userProfile');
      setUserProfile(profile); // Mengatur state userProfile dengan data yang diambil
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const token = (await getData('token')).value;
      setToken(token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // Tombol Hapus
  const handleRemove = async item => {
    try {
      await handleRemoveFromCart(item.product_id, dispatch, BASE_URL, token);
      dispatch(getCartItems());
      Alert.alert('Berhasil', 'Produk berhasil dihapus dari keranjang.');
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menghapus produk.');
    }
  };

  // Tombol Bayar
  const handlePay = async (id, name, price, picturePath, totalItem) => {
    try {
      await handleOrder({
        id,
        name,
        price,
        picturePath,
        userProfile,
        totalItem,
        navigation,
        onSuccess: data => {
          console.log('Pembayaran berhasil, data:', data);
          navigation.navigate('OrderSummary', data);
        },
        onError: error => {
          console.error('Gagal proses order:', error);
          Alert.alert('Gagal', 'Gagal memproses order.');
        },
      });

      // Jika order berhasil, baru hapus dari keranjang
      await handleRemoveFromCart(id, dispatch, BASE_URL, token);
      dispatch(getCartItems());
    } catch (error) {
      console.error('Terjadi kesalahan saat handlePay:', error);
    }
  };


  return (
    <ScrollView style={{ paddingTop: 8, paddingHorizontal: 24 }}>
      <View style={styles.content}>
        <ItemListProduct
          key={item.id}
          name={item.product?.name || 'Produk tidak ditemukan'}
          type="cart"
          price={item.product?.price || 0}
          items={item.quantity}
          image={{ uri: item.product?.picturePath || '' }}
          onRemoveFromCart={() => handleRemove(item)}
          onPay={() =>
            handlePay(
              item.product.id,
              item.product?.name,
              item.product?.price,
              item.product?.picturePath,
              item.quantity,
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginVertical: 16,
  },
  itemContainer: { marginBottom: 20 },
  removeButton: { backgroundColor: '#FF5C5C', padding: 10, marginTop: 10 },
  removeText: { color: '#fff' },
});

export default CartTabSection;
