/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Logo} from '../../assets';
import {getData} from '../../utils';
import {Text, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(res => {
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'AppUtama'}]});
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#03987A',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Logo />
      <Text
        style={{
          fontSize: 32,
          fontColor: '#020202',
          fontFamily: 'Poppins-Medium',
        }}>
        BUMDES
      </Text>
    </View>
  );
};

export default SplashScreen;
