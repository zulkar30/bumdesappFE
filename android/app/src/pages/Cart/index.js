import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CartEmpty, CartTabSection, Header} from '../../components'; // Pastikan Anda punya komponen-komponen ini
import {getCartItems} from '../../redux/action'; // Action untuk mengambil data keranjang
import {getData} from '../../utils';

const Cart = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cartReducer); // Ambil data keranjang dari Redux
  const [isRefreshing, setIsRefreshing] = useState(false); // State untuk mengatur status refresh
  const navigation = useNavigation();

  // Ambil data keranjang dari server saat komponen dirender
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    // Ambil data keranjang dari AsyncStorage
    getData('cart').then(cartData => {});
  }, []);

  // Mendapatkan data keranjang
  const onRefresh = async () => {
    setIsRefreshing(true); // Set refreshing ke true
    dispatch(getCartItems()); // Ambil ulang data keranjang
    setIsRefreshing(false); // Set refreshing ke false setelah selesai
  };

  // Tampilkan data keranjang dari server di console setelah didapat
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
    } else {
    }
  }, [cartItems]);

  return (
    <View style={styles.page}>
      {cartItems && cartItems.length < 1 ? (
        <CartEmpty />
      ) : (
        <View style={styles.content}>
          <Header title="Keranjang Belanja" subTitle="Tunggu pesanan Anda" />
          <ScrollView
            style={styles.tabContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={['#9Bd35A', '#689F38']}
              />
            }>
            {cartItems.map((item, index) => (
              <CartTabSection
                key={item.id}
                item={item}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1},
  tabContainer: {marginTop: 10},
});
