import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoSuccessOrder} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessOrder = ({navigation}) => {
  return (
    <View style={styles.page}>
      <LogoSuccessOrder />
      <Gap height={30} />
      <Text style={styles.title}>PESANAN BERHASIL DIBUAT!</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Silahkan tunggu pesan Anda tiba</Text>
      <Text style={styles.subTitle}>
        Kami akan mempersiapkannya sebaikmungkin
      </Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Cari produk lain"
          onPress={() => navigation.replace('AppUtama')}
        />
        <Gap height={12} />
        <Button
          text="Lihat pesanan"
          onPress={() => navigation.replace('AppUtama', {screen: 'Order'})}
          color="#8D92A3"
        />
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontColor: '#020202',
    fontFamily: 'Poppins-Regular',
  },
  subTitle: {
    fontSize: 14,
    fontColor: '#8D92A3',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
