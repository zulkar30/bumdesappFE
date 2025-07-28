import axios from 'axios';
import {BASE_URL} from '../../config';
import {getData} from '../../utils';

export const getCartItems = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .get(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(res => {
        // console.log('Produk keranjang:', res.data);
        dispatch({type: 'SET_CART_ITEMS', value: res.data});
      })
      .catch(err => {});
  });
};

export const addToCart = product => dispatch => {
  getData('token').then(resToken => {
    // console.log('Token yang dikirim:', resToken); // Tambahkan log ini
    axios
      .post(
        `${BASE_URL}/api/cart`,
        {productId: product.id, quantity: product.quantity},
        {
          headers: {
            Authorization: resToken?.value || '', // Pastikan token tidak undefined
          },
        },
      )
      .then(res => {
        // console.log('Produk berhasil ditambahkan ke keranjang:', res.data);
        dispatch({type: 'ADD_TO_CART', value: res.data});
        alert('Produk berhasil ditambahkan ke keranjang!');
      })
      .catch(err => {
        // console.error('Error adding to cart:', err);
        alert('Gagal menambahkan produk ke keranjang, silakan coba lagi!');
      });
  });
};

export const removeFromCart = productId => dispatch => {
  getData('token').then(resToken => {
    // Ambil data keranjang terlebih dahulu untuk menemukan produk yang akan dihapus
    getData('cart').then(cartData => {
      const productToRemove = cartData.find(
        item => item.product_id === productId,
      );

      if (productToRemove) {
        // Menampilkan data produk yang akan dihapus
        // console.log('Produk yang akan dihapus:', productToRemove);
      } else {
        // console.error('Produk tidak ditemukan di keranjang');
      }
    });

    axios
      .delete(`${BASE_URL}/api/cart/${productId}`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(res => {
        // console.log('Produk dihapus dari keranjang:', res.data.data);
        dispatch({type: 'REMOVE_FROM_CART', value: productId});
      })
      .catch(err => {
        // console.error('Error removing from cart:', err);
      });
  });
};
