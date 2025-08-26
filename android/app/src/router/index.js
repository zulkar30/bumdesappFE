import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottNav } from '../components';
import {
  Cart,
  Home,
  Order,
  OrderDetail,
  OrderSummary,
  Product,
  ProductDetail,
  Profile,
  SignIn,
  SignUp,
  SignUpAddress,
  SplashScreen,
  SuccessOrder,
  SuccessSignUp,
  EmailVerify
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppUtama = () => {
  return (
    <Tab.Navigator tabBar={props => <BottNav {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}} />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppUtama"
        component={AppUtama}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessOrder"
        component={SuccessOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailVerify"
        component={EmailVerify}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
