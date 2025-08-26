import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Gap, HomeProfile, HomeTabSection, ProductCard } from '../../components';
import { getProductByCategories, searchProducts } from '../../redux/action';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    produkBatik,
    produkTenun,
    produkTanjak,
    produkAksesoris,
    searchResults,
  } = useSelector(state => state.homeReducer);

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    dispatch(getProductByCategories('BATIK'));
    dispatch(getProductByCategories('TENUN'));
    dispatch(getProductByCategories('TANJAK'));
    dispatch(getProductByCategories('AKSESORIS'));
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCategories();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const onSearch = (text) => {
    setSearchQuery(text);
    if (text.length >= 2) {
      dispatch(searchProducts(text));
    }
  };

  return (
    <View style={styles.page}>
      <HomeProfile />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari produk..."
          value={searchQuery}
          onChangeText={onSearch}
        />
      </View>

      {/* Jika ada query dan hasil search */}
      {searchQuery.length >= 2 && (
        <ScrollView
          style={{ marginTop: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Gap height={10} />
          <View style={{ paddingHorizontal: 24 }}>
            {searchResults.length > 0 ? (
              searchResults.map(item => (
                <View key={item.id} style={{ marginBottom: 16 }}>
                  <ProductCard
                    name={item.name}
                    rating={item.rate}
                    image={{ uri: item.picturePath }}
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        picturePath: item.picturePath,
                        price: item.price,
                        rate: item.rate,
                        stock: item.stock,
                      })
                    }
                  />
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
                Produk tidak ditemukan
              </Text>
            )}
          </View>
          <Gap height={10} />
        </ScrollView>
      )}

      {/* Kategori */}
      {searchQuery.length < 2 && (
        <>
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
                    image={{ uri: produkBatik[0].picturePath }}
                    onPress={() =>
                      navigation.navigate('Product', { kategori: 'BATIK' })
                    }
                  />
                )}
                {produkTenun.length > 0 && (
                  <ProductCard
                    key={`tenun-${produkTenun[0].id}`}
                    name={produkTenun[0].categories}
                    rating={produkTenun[0].rate}
                    image={{ uri: produkTenun[0].picturePath }}
                    onPress={() =>
                      navigation.navigate('Product', { kategori: 'TENUN' })
                    }
                  />
                )}
                {produkTanjak.length > 0 && (
                  <ProductCard
                    key={`tanjak-${produkTanjak[0].id}`}
                    name={produkTanjak[0].categories}
                    rating={produkTanjak[0].rate}
                    image={{ uri: produkTanjak[0].picturePath }}
                    onPress={() =>
                      navigation.navigate('Product', { kategori: 'TANJAK' })
                    }
                  />
                )}
                {produkAksesoris.length > 0 && (
                  <ProductCard
                    key={`aksesoris-${produkAksesoris[0].id}`}
                    name={produkAksesoris[0].categories}
                    rating={produkAksesoris[0].rate}
                    image={{ uri: produkAksesoris[0].picturePath }}
                    onPress={() =>
                      navigation.navigate('Product', { kategori: 'AKSESORIS' })
                    }
                  />
                )}
              </View>
            </ScrollView>
          </View>

          <View style={styles.tabContainer}>
            <HomeTabSection />
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  productCard: {
    marginVertical: 24,
    flexDirection: 'row',
  },
  tabContainer: { flex: 1 },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginLeft: 24,
    marginTop: 24,
  },
});
