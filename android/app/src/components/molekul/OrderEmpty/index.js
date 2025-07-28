import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoOrderEmpty} from '../../../assets';
import {Button, Gap} from '../../atom';
import {useNavigation} from '@react-navigation/native';

const OrderEmpty = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <LogoOrderEmpty />
      <Gap height={30} />
      <Text style={styles.title}>MAAF!</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Anda belum melakukan pesanan</Text>
      <Text style={styles.subTitle}>
        Silahkan pesan produk terbaik keinginan Anda
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

export default OrderEmpty;

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
