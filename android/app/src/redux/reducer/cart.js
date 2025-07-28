const initCart = {
  cartItems: [], // Menyimpan data keranjang yang diambil dari API
};

export const cartReducer = (state = initCart, action) => {
  if (action.type === 'SET_CART_ITEMS') {
    return {
      ...state,
      cartItems: action.value, // Mengupdate cartItems dengan data yang baru
    };
  }
  if (action.type === 'ADD_TO_CART') {
    return {
      ...state,
      cartItems: [...state.cartItems, action.value], // Menambahkan produk ke cartItems
    };
  }
  if (action.type === 'REMOVE_FROM_CART') {
    return {
      ...state,
      cartItems: state.cartItems.filter(item => item.id !== action.value), // Menghapus produk berdasarkan ID
    };
  }
  return state;
};
