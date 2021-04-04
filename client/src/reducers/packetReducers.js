import {
  PACKET_LIST_REQUEST,
  PACKET_LIST_SUCCESS,
  PACKET_LIST_FAIL,
  PACKET_DETAILS_REQUEST,
  PACKET_DETAILS_SUCCESS,
  PACKET_DETAILS_FAIL
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

export const packetDetailsReducer = (
  state = { packet: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PACKET_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PACKET_DETAILS_SUCCESS:
      return { loading: false, packet: action.payload };
    case PACKET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
