import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
  });

  // const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({type: 'SET_REGISTER', value: form});
    navigation.navigate('SignUpAddress');
  };

  // const addPhoto = () => {
  //   launchImageLibrary(
  //     {
  //       quality: 0.5,
  //       maxWidth: 200,
  //       maxHeight: 200,
  //     },
  //     response => {
  //       if (response.didCancel || response.error) {
  //         showMessage('Anda belum memilih foto');
  //       } else if (response.assets && response.assets.length > 0) {
  //         const resPhoto = response.assets[0];
  //         const source = {uri: resPhoto.uri};
  //         const dataImage = {
  //           uri: resPhoto.uri,
  //           type: resPhoto.type,
  //           name: resPhoto.fileName,
  //         };
  //         setPhoto(source);
  //         dispatch({type: 'SET_PHOTO', value: dataImage});
  //         dispatch({type: 'SET_UPLOAD_STATUS', value: true});
  //       }
  //     },
  //   );
  // };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Daftar"
          subTitle="Daftarkan diri Anda"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={addPhoto}>
            <View style={styles.photo}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.teksFoto}>Tambah Foto</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity> */}

          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap Anda"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email"
            placeholder="Masukkan email yang valid"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Katasandi"
            placeholder="Masukkan katasandi yang valid"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
            inputStyle={{ color: '#020202' }}
          />
          <Gap height={24} />
          <Button text="Lanjutkan" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {flex: 1},
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  teksFoto: {
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});
