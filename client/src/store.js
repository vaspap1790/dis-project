import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  packetListReducer,
  packetDetailsReducer,
  packetsUserReducer,
  packetCreateReducer,
  packetUpdateReducer
} from './reducers/packetReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  accessAddReducer,
  accesssUserReducer
} from './reducers/accessReducers';
import { reviewCreateReducer } from './reducers/reviewReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from './reducers/userReducers';

// Initialise reducer
const reducer = combineReducers({
  packetList: packetListReducer,
  packetDetails: packetDetailsReducer,
  packetsUser: packetsUserReducer,
  packetCreate: packetCreateReducer,
  packetUpdate: packetUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  accessAdd: accessAddReducer,
  accessUser: accesssUserReducer,
  reviewCreate: reviewCreateReducer
});

// Get info from browser's local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initialise App State
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

// Initialise middleware
const middleware = [thunk];

// Initialise Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
