import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ItemListProduct } from '../../components';
import { getProductByCategories } from '../../redux/action';

const Product = ({route, navigation}) => {
  const {kategori} = route.params;
  const dispatch = useDispatch();
  const {produkBatik, produkTenun, produkTanjak, produkAksesoris} = useSelector(
    state => state.homeReducer,
  );
  const [refreshing, setRefreshing] = useState(false);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(getProductByCategories('BATIK'));
    dispatch(getProductByCategories('TENUN'));
    dispatch(getProductByCategories('TANJAK'));
    dispatch(getProductByCategories('AKSESORIS'));
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProductByCategories('BATIK'));
    dispatch(getProductByCategories('TENUN'));
    dispatch(getProductByCategories('TANJAK'));
    dispatch(getProductByCategories('AKSESORIS'));
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh delay
  };

  // Function to handle the product list for the selected category
  const renderProducts = () => {
    switch (kategori) {
      case 'BATIK':
        return produkBatik.map(batik => (
          <ItemListProduct
            key={batik.id}
            name={batik.name} // Assuming `batik.name` exists
            price={batik.price} // Assuming `batik.price` exists
            rating={batik.rate} // Assuming `batik.rate` exists
            image={{uri: batik.picturePath}} // Assuming `batik.picturePath` exists
            onPress={() => navigation.navigate('ProductDetail', batik)}
          />
        ));
      case 'TENUN':
        return produkTenun.map(tenun => (
          <ItemListProduct
            key={tenun.id}
            name={tenun.name}
            price={tenun.price}
            rating={tenun.rate}
            image={{uri: tenun.picturePath}}
            onPress={() => navigation.navigate('ProductDetail', tenun)}
          />
        ));
      case 'TANJAK':
        return produkTanjak.map(tanjak => (
          <ItemListProduct
            key={tanjak.id}
            name={tanjak.name}
            price={tanjak.price}
            rating={tanjak.rate}
            image={{uri: tanjak.picturePath}}
            onPress={() => navigation.navigate('ProductDetail', tanjak)}
          />
        ));
      case 'AKSESORIS':
        return produkAksesoris.map(aksesoris => (
          <ItemListProduct
            key={aksesoris.id}
            name={aksesoris.name}
            price={aksesoris.price}
            rating={aksesoris.rate}
            image={{uri: aksesoris.picturePath}}
            onPress={() => navigation.navigate('ProductDetail', aksesoris)}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header
        title="PRODUK"
        subTitle="Produk terbaik dari kategori"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Produk {kategori}</Text>
        <View style={{paddingTop: 8, paddingHorizontal: 24}}>
          {renderProducts()}
        </View>
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginVertical: 16,
  },
});
