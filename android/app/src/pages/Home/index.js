import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, HomeProfile, HomeTabSection, ProductCard} from '../../components';
import {getProductByCategories} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {produkBatik, produkTenun, produkTanjak, produkAksesoris} = useSelector(
    state => state.homeReducer,
  );
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getProductByCategories('BATIK'));
    dispatch(getProductByCategories('TENUN'));
    dispatch(getProductByCategories('TANJAK'));
    dispatch(getProductByCategories('AKSESORIS'));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProductByCategories('BATIK'));
    dispatch(getProductByCategories('TENUN'));
    dispatch(getProductByCategories('TANJAK'));
    dispatch(getProductByCategories('AKSESORIS'));
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <Text style={styles.categoryTitle}>KATEGORI</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.productCard}>
            <Gap width={24} />
            {produkBatik.length > 0 && (
              <ProductCard
                key={`batik-${produkBatik[0].id}`}
                name={produkBatik[0].categories}
                rating={produkBatik[0].rate}
                image={{uri: produkBatik[0].picturePath}}
                onPress={() =>
                  navigation.navigate('Product', {kategori: 'BATIK'})
                }
              />
            )}
            {produkTenun.length > 0 && (
              <ProductCard
                key={`tenun-${produkTenun[0].id}`}
                name={produkTenun[0].categories}
                rating={produkTenun[0].rate}
                image={{uri: produkTenun[0].picturePath}}
                onPress={() =>
                  navigation.navigate('Product', {kategori: 'TENUN'})
                }
              />
            )}
            {produkTanjak.length > 0 && (
              <ProductCard
                key={`tanjak-${produkTanjak[0].id}`}
                name={produkTanjak[0].categories}
                rating={produkTanjak[0].rate}
                image={{uri: produkTanjak[0].picturePath}}
                onPress={() =>
                  navigation.navigate('Product', {kategori: 'TANJAK'})
                }
              />
            )}
            {produkAksesoris.length > 0 && (
              <ProductCard
                key={`aksesoris-${produkAksesoris[0].id}`}
                name={produkAksesoris[0].categories}
                rating={produkAksesoris[0].rate}
                image={{uri: produkAksesoris[0].picturePath}}
                onPress={() =>
                  navigation.navigate('Product', {kategori: 'AKSESORIS'})
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  productCard: {
    marginVertical: 24,
    flexDirection: 'row',
  },
  tabContainer: {flex: 1},
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginLeft: 24,
    marginTop: 24,
  },
});
