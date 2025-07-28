import {combineReducers} from 'redux';
import {photoReducer, registerReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import {orderReducer} from './order';
import {cartReducer} from './cart';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
  homeReducer,
  orderReducer,
  cartReducer,
});

export default reducer;
