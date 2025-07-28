import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPastOrder} from '../../../redux/action';
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
    tabStyle={{width: 'auto', paddingHorizontal: 24}}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.orderReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getInProgress());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getInProgress());
    setTimeout(() => setRefreshing(false), 1000); // Simulasi waktu refresh
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {inProgress.map(order => {
          return (
            <ItemListProduct
              key={order.id}
              image={{uri: order.product.picturePath}}
              onPress={() => navigation.navigate('OrderDetail', order)}
              type="in-progress"
              items={order.quantity}
              price={order.total}
              name={order.product.name}
              status={order.status}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector(state => state.orderReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getPastOrder());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPastOrder());
    setTimeout(() => setRefreshing(false), 1000); // Simulasi waktu refresh
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {pastOrders.map(order => {
          return (
            <ItemListProduct
              key={order.id}
              type="past-orders"
              items={order.quantity}
              price={order.total}
              name={order.product.name}
              date={order.created_at}
              status={order.status}
              image={{uri: order.product.picturePath}}
              onPress={() => navigation.navigate('OrderDetail', order)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const OrderTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    {key: '1', title: 'Proses'},
    {key: '2', title: 'Pesanan Sebelumnya'},
  ];
  const renderScene = SceneMap({
    1: InProgress,
    2: PastOrders,
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

export default OrderTabSection;

const styles = StyleSheet.create({});
