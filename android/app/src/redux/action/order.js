import axios from 'axios';
import {BASE_URL} from '../../config';
import {getData} from '../../utils';

export const getOrders = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .get(`${BASE_URL}/api/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(res => {
        dispatch({type: 'SET_ORDER', value: res.data.data.data});
      })
      .catch(err => {});
  });
};

export const getInProgress = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .all([
        axios.get(`${BASE_URL}/api/transaction?status=PENDING`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
        axios.get(`${BASE_URL}/api/transaction?status=PACKED`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
        axios.get(`${BASE_URL}/api/transaction?status=ON_DELIVERY`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          console.log('PENDING', res1.data.data.data);
          console.log('PACKED', res2.data.data.data);
          console.log('ON DELIVERY', res3.data.data.data);
          const pending = res1.data.data.data;
          const success = res2.data.data.data;
          const onDelivery  = res3.data.data.data;
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...success, ...onDelivery],
          });
        }),
      )
      .catch(err => {});
  });
};

export const getPastOrder = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .all([
        axios.get(`${BASE_URL}/api/transaction?status=CANCELLED`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
        axios.get(`${BASE_URL}/api/transaction?status=DELIVERED`, {
          headers: {
            Authorization: resToken.value,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          const cancelled = res1.data.data.data;
          const delivered = res2.data.data.data;
          dispatch({
            type: 'SET_PAST_ORDER',
            value: [...cancelled, ...delivered],
          });
        }),
      )
      .catch(err => {});
  });
};
