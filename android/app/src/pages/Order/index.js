import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, OrderEmpty, OrderTabSection } from '../../components';
import { getOrders } from '../../redux/action';

const Order = () => {
  const [isEmpty] = useState(false);
  const dispatch = useDispatch();
  const {orders} = useSelector(state => state.orderReducer);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  
  return (
    <View style={styles.page}>
      {orders.length < 1 ? (
        <OrderEmpty />
      ) : (
        <View style={styles.content}>
          <Header title="Pesanan" subTitle="Tunggu pesanan Anda tiba" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    marginTop: 24,
  },
});
