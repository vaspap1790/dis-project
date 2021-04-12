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
  PRE_PACKET_DETAILS_REQUEST,
  PACKET_USER_RESET
} from '../constants/packetConstants';

export const packetListReducer = (state = { packets: [] }, action) => {
  switch (action.type) {
    case PACKET_LIST_REQUEST:
      return { loading: true, packets: [] };
    case PACKET_LIST_SUCCESS:
      return { loading: false, packets: action.payload };
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
      return { loading: false, error: action.payload };
    case PACKET_USER_RESET:
      return { userData: { packets: [], reviews: [], userRating: [] } };
    case PACKET_USER_EMPTY_ERROR:
      return { error: null };
    default:
      return state;
  }
};

export const packetDetailsReducer = (
  state = { packet: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PACKET_DETAILS_REQUEST:
      return { loadingDetails: true, ...state };
    case PRE_PACKET_DETAILS_REQUEST:
      return { loadingDetails: true, packet: {} };
    case PACKET_DETAILS_SUCCESS:
      return { loadingDetails: false, packet: action.payload };
    case PACKET_DETAILS_FAIL:
      return { loadingDetails: false, error: action.payload };
    default:
      return state;
  }
};
