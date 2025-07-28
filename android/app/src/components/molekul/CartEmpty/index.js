import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {LogoOrderEmpty} from '../../../assets';
import {Button, Gap} from '../../atom'; // Komponen tombol dan gap

const CartEmpty = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <LogoOrderEmpty />
      <Gap height={30} />
      <Text style={styles.title}>MAAF!</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Keranjang Anda masih kosong</Text>
      <Text style={styles.subTitle}>
        Silahkan cari produk yang ingin Anda inginkan
      </Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Cari produk"
          onPress={() => navigation.replace('AppUtama')}
        />
      </View>
    </View>
  );
};

export default CartEmpty;

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
