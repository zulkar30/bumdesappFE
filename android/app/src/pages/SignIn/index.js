import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Gap, Header, TextInput } from '../../components';
import { signInAction } from '../../redux/action';
import { showMessage, useForm } from '../../utils';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const onSubmit = () => {
    if (!form.email || !form.password) {
      showMessage({
        message: 'Form Tidak Lengkap',
        description: 'Email dan password harus diisi.',
        type: 'danger',
      });
      return;
    }
    dispatch(signInAction(form, navigation));
  };
  return (
    <View style={styles.page}>
      <Header title="Masuk" subTitle="Temukan apa yang Anda cari" />
      <View style={styles.container}>
        <TextInput
          label="Email"
          placeholder="Masukkan email yang valid"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Katasandi"
          placeholder="Masukkan password yang valid"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
          inputStyle={{ color: '#020202' }}
        />
        <Gap height={24} />
        <Button text="Masuk" onPress={onSubmit} />
        <Gap height={12} />
        <Button
          text="Buat Akun Baru"
          color="#8D92A3"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
