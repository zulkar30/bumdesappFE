import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDataTypes } from '../../../redux/action';
import ItemListProduct from '../ItemListProduct';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: 'white',
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: '100%', paddingHorizontal: 24}}
  />
);

const Baru = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {produkBaru} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getProductDataTypes('produk_baru'));
  }, []);
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {produkBaru.map(item => {
          return (
            <ItemListProduct
              key={item.id}
              name={item.name}
              type={item.type}
              price={item.price}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('ProductDetail', item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
const Favorit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {produkFavorit} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getProductDataTypes('populer'));
  }, [dispatch]);
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {produkFavorit.map(item => {
          return (
            <ItemListProduct
              key={item.id}
              name={item.name}
              type={item.type}
              price={item.price}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('ProductDetail', item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
const Rekomendasi = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {produkRekomendasi} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getProductDataTypes('rekomendasi'));
  }, [dispatch]);
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {produkRekomendasi.map(item => {
          return (
            <ItemListProduct
              key={item.id}
              name={item.name}
              type={item.type}
              price={item.price}
              rating={item.rate}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('ProductDetail', item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const HomeTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    {key: '1', title: 'Baru'},
    {key: '2', title: 'Favorit'},
    {key: '3', title: 'Rekomendasi'},
  ];
  const renderScene = SceneMap({
    1: Baru,
    2: Favorit,
    3: Rekomendasi,
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

export default HomeTabSection;

const styles = StyleSheet.create({});
