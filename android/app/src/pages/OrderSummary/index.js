import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  Button,
  Gap,
  Header,
  ItemListProduct,
  ItemValue,
  Loading,
} from '../../components';
import { BASE_URL } from '../../config';
import { getData } from '../../utils';

const OrderSummary = ({ navigation, route }) => {
  const { item, transaction, userProfile } = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('https://google.com');

  const onCheckout = () => {
    const data = {
      product_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total,
      status: 'PENDING',
      url: `${BASE_URL}/api/checkout`
    };
    console.log('Data yang dikirim dari Order Summary:', data);

    getData('token').then(resToken => {
      console.log('🔑 Token dari AsyncStorage:', resToken);
      axios
        .post(`${BASE_URL}/api/checkout`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then(res => {
          setIsPaymentOpen(true);
          setPaymentUrl(res.data.data.payment_url);
        })
        .catch(err => {
          if (err.response) {
            console.log('❌ Error response:', err.response.data);
          } else if (err.request) {
            console.log('❌ No response received:', err.request);
          } else {
            console.log('❌ Request error:', err.message);
          }
        });
    });
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Pembayaran"
          subTitle="Pembayaran pesanan Anda"
          onBack={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{ uri: paymentUrl }}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
        />
      </>
    );
  }
  return (
    <ScrollView>
      <Header
        title="Pesanan"
        subTitle="Produk lokal terbaik"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Produk Dipesan</Text>
        <ItemListProduct
          image={{ uri: item.picturePath }}
          items={transaction.totalItem}
          type="order-summary"
          name={item.name}
          price={item.price}
        />
        <Text style={styles.label}>Detail Transaksi</Text>
        <ItemValue
          label={item.name}
          value={transaction.totalPrice}
          type="currency"
        />
        <ItemValue label="Ongkir" value={transaction.driver} type="currency" />
        <ItemValue
          label="Total Harga"
          value={transaction.total}
          type="currency"
          valueColor="#1ABC9C"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Dikirim Kepada:</Text>
        <ItemValue label="Nama" value={userProfile.name} />
        <ItemValue label="No. Telepon" value={userProfile.phoneNumber} />
        <ItemValue label="Alamat" value={userProfile.address} />
        <ItemValue label="No. Rumah" value={userProfile.houseNumber} />
        <ItemValue label="Kota" value={userProfile.city?.name || 'Tidak diketahui'} />
      </View>
      <View style={styles.button}>
        <Button text="Bayar Sekarang" onPress={onCheckout} />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#020202',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
