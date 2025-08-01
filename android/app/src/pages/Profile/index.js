import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ProfileTabSection } from '../../components';
import { getData } from '../../utils';
import { BASE_URL } from '../../config';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);

      const imageUrl = res.picturePath
        ? `${BASE_URL}/storage/${res.picturePath}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(res.name)}&color=FFFFFF&background=000000`;

      console.log('📸 URL Foto Profil:', res);
    });
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.profile}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
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
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: { flex: 1 },
  profile: { backgroundColor: '#03987A', paddingBottom: 26 },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: 'white',
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
