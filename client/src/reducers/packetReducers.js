import {
  PACKET_LIST_REQUEST,
  PACKET_LIST_SUCCESS,
  PACKET_LIST_FAIL
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
