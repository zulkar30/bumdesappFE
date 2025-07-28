const initHome = {
  product: [],
  produkBaru: [],
  produkFavorit: [],
  produkRekomendasi: [],
  produkBatik: [],
  produkTenun: [],
  produkTanjak: [],
  produkAksesoris: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'SET_PRODUCT') {
    return {
      ...state,
      product: action.value,
    };
  }
  if (action.type === 'SET_BARU') {
    return {
      ...state,
      produkBaru: action.value,
    };
  }
  if (action.type === 'SET_FAVORIT') {
    return {
      ...state,
      produkFavorit: action.value,
    };
  }
  if (action.type === 'SET_REKOMENDASI') {
    return {
      ...state,
      produkRekomendasi: action.value,
    };
  }
  if (action.type === 'SET_BATIK') {
    return {
      ...state,
      produkBatik: action.value,
    };
  }
  if (action.type === 'SET_TENUN') {
    return {
      ...state,
      produkTenun: action.value,
    };
  }
  if (action.type === 'SET_TANJAK') {
    return {
      ...state,
      produkTanjak: action.value,
    };
  }
  if (action.type === 'SET_AKSESORIS') {
    return {
      ...state,
      produkAksesoris: action.value,
    };
  }
  return state;
};
