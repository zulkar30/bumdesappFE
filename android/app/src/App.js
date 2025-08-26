import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
import {Alert, Linking} from 'react-native';
import {SuccessSignUp} from './pages';
import {navigationRef, navigate} from './navigationRef';
import {BASE_URL} from './config';

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
          navigationRef.navigate('OrderDetail', {
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
          navigationRef.navigate('OrderDetail', {
            orderId: remoteMessage.data.order_id,
          });
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  React.useEffect(() => {
    // listener deep link
    const handleDeepLink = event => {
      const url = event.url;
      console.log('Deep link diterima:', url);

      if (url.includes('/email/verify/')) {
        // arahkan ke SuccessSignUp
        navigationRef.navigate('SuccessSignUp');
      }
    };

    // saat app sudah running, listen link yang masuk
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // kalau app dibuka dari terminated state
    Linking.getInitialURL().then(url => {
      if (url && url.includes('/email/verify/')) {
        navigationRef.navigate('SuccessSignUp');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const linking = {
    prefixes: ['myapp://', `${BASE_URL}`],
    config: {
      screens: {
        SuccessSignUp: 'email/verify/:id/:hash',
      },
    },
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
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
