import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProfileTabSection} from '../../components';
import {getData, showMessage, storeData} from '../../utils';
import {BASE_URL} from '../../config';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [photo, setPhoto] = useState('');
  const [dataImage, setDataImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);

  const choosePhoto = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda belum memilih foto');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const resPhoto = response.assets[0];
          const source = {uri: resPhoto.uri};
          setPhoto(source); // untuk preview
          setDataImage({
            uri: resPhoto.uri,
            type: resPhoto.type,
            name: resPhoto.fileName,
          });
        }
      },
    );
  };

  const savePhoto = async () => {
    if (!dataImage) {
      showMessage({
        message: 'Tidak ada foto yang dipilih',
        type: 'warning',
      });
      return;
    }

    try {
      const tokenData = await getData('token');
      const token = tokenData?.value;

      console.log('token', token);
      const formData = new FormData();
      formData.append('file', dataImage);

      console.log('file', dataImage);
      const resUpload = await axios.post(
        `${BASE_URL}/api/user/photo`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const uploadedPath = Array.isArray(resUpload.data.data)
        ? resUpload.data.data[0]
        : resUpload.data.data;

      const updatedProfile = {
        ...userProfile,
        profile_photo_url: `${BASE_URL}/storage/${uploadedPath}`,
        picturePath: uploadedPath,
      };

      await storeData('userProfile', updatedProfile);
      setUserProfile(updatedProfile);

      console.log('foto', updatedProfile);
      // reset state photo kalau mau
      setPhoto('');

      showMessage({
        message: 'Foto berhasil disimpan',
        type: 'success',
      });
    } catch (err) {
      if (err.response?.status === 401) {
        showMessage({
          message: 'Sesi anda sudah habis',
          description: 'Silakan login kembali.',
          type: 'danger',
        });
        // misalnya redirect ke login
        // navigation.reset({index: 0, routes: [{name: 'Login'}]});
      } else {
        console.log('Upload error:', err.response?.data || err.message);
        showMessage({
          message: 'Upload foto gagal',
          description:
            err.response?.data?.message || err.message ||
            'Pastikan koneksi stabil lalu coba lagi.',
          type: 'danger',
        });
      }
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={choosePhoto}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              {photo ? (
                <Image source={photo} style={styles.photoContainer} />
              ) : (
                <View style={styles.photoContainer}>
                  <Image
                    source={{
                      uri: userProfile.picturePath
                        ? `${BASE_URL}/storage/${userProfile.picturePath}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            userProfile.name,
                          )}&color=FFFFFF&background=000000`,
                    }}
                    style={styles.photoContainer}
                  />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
        {/* Tombol simpan muncul hanya jika ada foto baru */}
        {photo ? (
          <TouchableOpacity
            onPress={savePhoto}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: '#4CAF50',
              borderRadius: 8,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Simpan Foto
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {flex: 1},
  profile: {backgroundColor: '#03987A', paddingBottom: 26},
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: 'black',
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
  content: {
    flex: 1,
    marginTop: 24,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: 'white',
    textAlign: 'center',
  },
});
