import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  packetListReducer,
  packetDetailsReducer,
  packetDataReducer,
  packetsUserReducer,
  packetCreateReducer,
  packetUpdateReducer,
  packetTopRatedReducer,
  watchlistReducer
} from './reducers/packetReducers';
import {
  actionListReducer,
  actionCountReducer,
  actionCreateReducer,
  actionUpdateReducer
} from './reducers/actionReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  accessAddReducer,
  accesssUserReducer
} from './reducers/accessReducers';
import { reviewCreateReducer } from './reducers/reviewReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userDetailsReducer
} from './reducers/userReducers';

// Initialise reducer
const reducer = combineReducers({
  packetList: packetListReducer,
  packetDetails: packetDetailsReducer,
  packetData: packetDataReducer,
  packetsUser: packetsUserReducer,
  packetCreate: packetCreateReducer,
  packetUpdate: packetUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  accessAdd: accessAddReducer,
  accessUser: accesssUserReducer,
  reviewCreate: reviewCreateReducer,
  packetTopRated: packetTopRatedReducer,
  watchlist: watchlistReducer,
  actionList: actionListReducer,
  actionCount: actionCountReducer,
  actionCreate: actionCreateReducer,
  actionUpdate: actionUpdateReducer
});

// Get info from browser's local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const watchlistFromStorage = localStorage.getItem('favourites')
  ? JSON.parse(localStorage.getItem('favourites'))
  : [];

// Initialise App State
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  watchlist: { favourites: watchlistFromStorage }
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
