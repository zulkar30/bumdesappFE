import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {
  ProductDummy1,
  ProductDummy2,
  ProductDummy3,
  ProductDummy4,
} from '../../../assets';
import ItemListProduct from '../ItemListProduct';
import ItemListMenu from '../ItemListMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignIn} from '../../../pages';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
      width: 0.5,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto', paddingHorizontal: 24}}
  />
);

const Akun = () => {
  const navigation = useNavigation();
  const logOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListMenu text="Edit Profil" />
        <ItemListMenu text="Keluar" onPress={logOut} />
      </View>
    </ScrollView>
  );
};

const Bumdes = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListMenu text="Beri Nilai" />
        <ItemListMenu text="Pusat Bantuan" />
        <ItemListMenu text="Kebijakan & Privasi" />
        <ItemListMenu text="Syarat & Ketentuan" />
      </View>
    </ScrollView>
  );
};

const ProfileTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    {key: '1', title: 'AKUN'},
    {key: '2', title: 'BUMDES'},
  ];
  const renderScene = SceneMap({
    1: Akun,
    2: Bumdes,
  });

  return (
    <TabView
      commonOptions={{
        label: ({route, labelText, focused, color}) => (
          <Text
            style={{
              color: focused ? '#020202' : '#8D92A3',
              fontFamily: 'Poppins-Medium',
            }}>
            {route.title}
          </Text>
        ),
      }}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default ProfileTabSection;

const styles = StyleSheet.create({});
