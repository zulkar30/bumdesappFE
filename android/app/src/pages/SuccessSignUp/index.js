import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoSuccessSignUp} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessSignUp = ({navigation}) => {
  return (
    <View style={styles.page}>
      <LogoSuccessSignUp />
      <Gap height={30} />
      <Text style={styles.title}>SELAMAT!</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Akun Anda telah terdaftar</Text>
      <Text style={styles.subTitle}>Selamat berbelanja</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Belanja Sekarang"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'AppUtama'}]})
          }
        />
      </View>
    </View>
  );
};

export default SuccessSignUp;

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
