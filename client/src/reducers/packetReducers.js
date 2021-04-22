import {
  PACKET_LIST_REQUEST,
  PACKET_LIST_SUCCESS,
  PACKET_LIST_FAIL,
  PACKET_USER_REQUEST,
  PACKET_USER_SUCCESS,
  PACKET_USER_FAIL,
  PACKET_USER_EMPTY_ERROR,
  PACKET_DETAILS_REQUEST,
  PACKET_DETAILS_SUCCESS,
  PACKET_DETAILS_FAIL,
  PACKET_DATA_REQUEST,
  PACKET_DATA_SUCCESS,
  PACKET_DATA_FAIL,
  PRE_PACKET_DETAILS_REQUEST,
  PACKET_USER_RESET,
  PACKET_CREATE_REQUEST,
  PACKET_CREATE_SUCCESS,
  PACKET_CREATE_FAIL,
  PACKET_CREATE_RESET,
  PACKET_CREATE_EMPTY_ERROR,
  PACKET_UPDATE_REQUEST,
  PACKET_UPDATE_SUCCESS,
  PACKET_UPDATE_FAIL,
  PACKET_UPDATE_EMPTY_ERROR,
  PACKET_UPDATE_EMPTY_SUCCESS,
  PACKET_TOP_REQUEST,
  PACKET_TOP_SUCCESS,
  PACKET_TOP_FAIL,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST
} from '../constants/packetConstants';

export const packetListReducer = (state = { packets: [], page: 1 }, action) => {
  switch (action.type) {
    case PACKET_LIST_REQUEST:
      return { loading: true, packets: [] };
    case PACKET_LIST_SUCCESS:
      return {
        loading: false,
        packets: action.payload.packets,
        pages: action.payload.pages,
        page: action.payload.page
      };
    case PACKET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const packetsUserReducer = (
  state = { userData: { packets: [], reviews: [], userRating: [] } },
  action
) => {
  switch (action.type) {
    case PACKET_USER_REQUEST:
      return {
        loading: true,
        userData: { packets: [], reviews: [], userRating: [] }
      };
    case PACKET_USER_SUCCESS:
      return { loading: false, userData: action.payload };
    case PACKET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PACKET_USER_RESET:
      return { userData: { packets: [], reviews: [], userRating: [] } };
    case PACKET_USER_EMPTY_ERROR:
      return { error: null };
    default:
      return state;
  }
};

export const packetDetailsReducer = (
  state = {
    packet: { name: '', description: '', category: '', image: '' },
    reviews: []
  },
  action
) => {
  switch (action.type) {
    case PACKET_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRE_PACKET_DETAILS_REQUEST:
      return {
        loading: true,
        packet: { name: '', description: '', category: '', image: '' },
        reviews: []
      };
    case PACKET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        packet: action.payload.packet,
        reviews: action.payload.reviews
      };
    case PACKET_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const packetDataReducer = (
  state = {
    packet: { name: '', description: '', category: '', image: '' }
  },
  action
) => {
  switch (action.type) {
    case PACKET_DATA_REQUEST:
      return { loading: true, ...state };
    case PACKET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        packet: action.payload
      };
    case PACKET_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const packetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PACKET_CREATE_REQUEST:
      return { loading: true };
    case PACKET_CREATE_SUCCESS:
      return { loading: false, success: true, packet: action.payload };
    case PACKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PACKET_CREATE_RESET:
      return {};
    case PACKET_CREATE_EMPTY_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const packetUpdateReducer = (
  state = { packet: {}, loading: false },
  action
) => {
  switch (action.type) {
    case PACKET_UPDATE_REQUEST:
      return { loading: true };
    case PACKET_UPDATE_SUCCESS:
      return {
        loading: false,
        success: 'Packet Updated',
        packet: action.payload
      };
    case PACKET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PACKET_UPDATE_EMPTY_ERROR:
      return { ...state, error: null };
    case PACKET_UPDATE_EMPTY_SUCCESS:
      return { ...state, success: null };
    default:
      return state;
  }
};

export const packetTopRatedReducer = (state = { packets: [] }, action) => {
  switch (action.type) {
    case PACKET_TOP_REQUEST:
      return { loading: true, packets: [] };
    case PACKET_TOP_SUCCESS:
      return { loading: false, packets: action.payload };
    case PACKET_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const watchlistReducer = (state = { favourites: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return { favourites: [...state.favourites, action.payload] };
    case REMOVE_FROM_WATCHLIST:
      return {
        favourites: state.favourites.filter(
          (favourite) => favourite._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};
