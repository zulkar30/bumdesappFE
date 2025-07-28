import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const AppUtama = () => {
  const {isLoading} = useSelector(state => state.globalReducer);

  React.useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Pesan diterima di foreground:', remoteMessage);

      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });

    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Notifikasi ditekan di background:', remoteMessage);

        if (remoteMessage.data && remoteMessage.data.order_id) {
          navigation.navigate('OrderDetail', {
            orderId: remoteMessage.data.order_id,
          });
        }
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (
          remoteMessage &&
          remoteMessage.data &&
          remoteMessage.data.order_id
        ) {
          console.log('Notifikasi ditekan dari terminated:', remoteMessage);
          navigation.navigate('OrderDetail', {
            orderId: remoteMessage.data.order_id,
          });
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage
        position="top"
        message={{message: 'Pesan default', type: 'info'}}
      />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppUtama />
    </Provider>
  );
};

export default App;
