import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  packetListReducer,
  packetDetailsReducer
} from './reducers/packetReducers';

const reducer = combineReducers({
  packetList: packetListReducer,
  packetDetails: packetDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
