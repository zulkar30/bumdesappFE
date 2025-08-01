import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Gap, Header, Select, TextInput } from '../../components';
import { setLoading, signUpAction } from '../../redux/action';
import { useForm } from '../../utils';
import axios from 'axios';
import { BASE_URL } from '../../config';

const SignUpAddress = ({ navigation }) => {
  const [form, setForm] = useForm({
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city_id: '',
  });

  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const registerReducer = useSelector(state => state.registerReducer);
  const photoReducer = useSelector(state => state.photoReducer);

  useEffect(() => {
    // Ambil data kota dari server
    axios.get(`${BASE_URL}/api/cities`)
      .then(res => {
        console.log(res.data.data);
        setCities(res.data.data); // pastikan response berbentuk array kota
      })
      .catch(err => {
        console.error('Gagal mengambil data kota:', err);
      });
  }, [dispatch]);

  const onSubmit = () => {
    const data = {
      ...form,
      ...registerReducer,
    };
    dispatch(setLoading(true));
    // API Register
    dispatch(signUpAction(data, photoReducer, navigation));
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.page}>
        <Header
          title="Daftar"
          subTitle="Daftarkan diri Anda"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon Anda"
            value={form.phoneNumber}
            onChangeText={value => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Alamat"
            placeholder="Masukkan alamat Anda"
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nomor Rumah"
            placeholder="Masukkan nomor rumah Anda"
            value={form.houseNumber}
            onChangeText={value => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="Kota"
            value={form.city_id?.toString()} // konversi ke string
            items={cities.map(city => ({
              label: city.name,
              value: city.id.toString(), // konversi ke string
            }))}
            onSelectChange={value => {
              console.log('City ID terpilih:', value);
              setForm('city_id', value); // simpan sebagai string
            }}
          />
          <Gap height={24} />
          <Button text="Daftar Sekarang" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: { flex: 1 },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
    justifyContent: 'center',
  },
  teksFoto: {
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});
