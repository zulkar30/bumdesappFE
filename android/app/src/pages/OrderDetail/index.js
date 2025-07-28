import axios from 'axios';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Gap,
  Header,
  ItemListProduct,
  ItemValue
} from '../../components';
import { BASE_URL } from '../../config';
import { getData } from '../../utils';

const OrderDetail = ({ route, navigation }) => {
  const order = route.params;

  const onCancel = () => {
    const data = {
      status: 'CANCELLED',
    };
    getData('token').then(resToken => {
      axios
        .post(`${BASE_URL}/api/transaction/${order.id}`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then(res => {
          navigation.reset({ index: 0, routes: [{ name: 'AppUtama' }] });
        })
        .catch(err => { });
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title="Pembayaran"
        subTitle="Produk lokal terbaik, hanya untuk Anda"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Produk Dipesan</Text>
        <ItemListProduct
          image={{ uri: order.product.picturePath }}
          items={order.quantity}
          type="order-summary"
          name={order.product.name}
          price={order.product.price}
        />
        <Text style={styles.label}>Detail Transaksi</Text>
        <ItemValue
          label={order.product.name}
          value={order.product.price * order.quantity}
          type="currency"
        />
        <ItemValue label="Driver" value={order.user?.city?.zone?.price || 0} type="currency" />
        <ItemValue
          label="Total Harga"
          value={order.total}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Dikirim Kepada:</Text>
        <ItemValue label="Nama" value={order.user.name} />
        <ItemValue label="No. Telepon" value={order.user.phoneNumber} />
        <ItemValue label="Alamat" value={order.user.address} />
        <ItemValue label="No. Rumah" value={order.user.houseNumber} />
        <ItemValue label="Kota" value={order.user?.city?.name || 'Tidak Diketahui'} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Status Pesanan:</Text>
        <ItemValue
          label={`#ORDER${order.id}`}
          value={
            order.status === 'PENDING'
              ? 'BELUM BAYAR'
              : order.status === 'PACKED'
                ? 'SEDANG DIKEMAS'
                : order.status === 'ON_DELIVERY'
                  ? 'SEDANG DIKIRIM'
                  : order.status === 'CANCELLED'
                    ? 'DIBATALKAN'
                    : order.status === 'DELIVERED'
                      ? 'PESANAN DITERIMA'
                      : order.status
          }
          valueColor={
            order.status === 'CANCELLED'
              ? '#D9435E'
              : order.status === 'PENDING'
                ? 'orange'
                : order.status === 'ON_DELIVERY'
                  ? 'black'
                  : '#1ABC9C'
          }
        />
      </View>
      <View style={styles.button}>
        {order.status === 'PENDING' && (
          <Button text="Batalkan Pesanan" color="#D9435E" onPress={onCancel} />
        )}
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderDetail;

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
