import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getData} from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../config';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>BUMDES</Text>
        <Text style={styles.desc}>Temukan produk kebutuhan Anda</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.jumpTo('Profile')}>
        <Image
          source={{
            uri: userProfile.picturePath
              ? `${BASE_URL}/storage/${userProfile.picturePath}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userProfile.name,
                )}&color=FFFFFF&background=000000`,
          }}
          style={styles.profile}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 32,
    backgroundColor: '#03987A',
    // backgroundColor: 'white',
  },
  appName: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: 'white',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
