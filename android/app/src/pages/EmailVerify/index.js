import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoSuccessSignUp} from '../../assets';
import {Button, Gap} from '../../components';

const EmailVerify = ({navigation}) => {
  return (
    <View style={styles.page}>
      <LogoSuccessSignUp />
      <Gap height={30} />
      <Text style={styles.title}>VERIFIKASI EMAIL</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Berhasil Daftar</Text>
      <Text style={styles.subTitle}>
        Silakan cek Gmail Anda dan untuk verifikasi
      </Text>
      <Gap height={30} />
    </View>
  );
};

export default EmailVerify;

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
