import axios from 'axios';
import {BASE_URL} from '../../config';

export const getProductData = () => dispatch => {
  axios
    .get(`${BASE_URL}/api/product`)
    .then(res => {
      console.log('Produk: ', res.data.data)
      dispatch({type: 'SET_PRODUCT', value: res.data.data});
    })
    .catch(err => {});
};

export const getProductDataTypes = types => dispatch => {
  axios
    .get(`${BASE_URL}/api/product?types=${types}`)
    .then(res => {
      if (types === 'produk_baru') {
        dispatch({type: 'SET_BARU', value: res.data.data});
      }
      if (types === 'populer') {
        dispatch({type: 'SET_FAVORIT', value: res.data.data});
      }
      if (types === 'rekomendasi') {
        dispatch({type: 'SET_REKOMENDASI', value: res.data.data});
      }
    })
    .catch(err => {});
};

export const getProductByCategories = categories => dispatch => {
  axios
    .get(`${BASE_URL}/api/product?categories=${categories}`)
    .then(res => {
      if (categories === 'BATIK') {
        dispatch({type: 'SET_BATIK', value: res.data.data});
      }
      if (categories === 'TENUN') {
        dispatch({type: 'SET_TENUN', value: res.data.data});
      }
      if (categories === 'TANJAK') {
        dispatch({type: 'SET_TANJAK', value: res.data.data});
      }
      if (categories === 'AKSESORIS') {
        dispatch({type: 'SET_AKSESORIS', value: res.data.data});
      }
    })
    .catch(err => {});
};
