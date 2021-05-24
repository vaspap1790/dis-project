import axios from 'axios';
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
  PACKET_CREATE_REQUEST,
  PACKET_CREATE_SUCCESS,
  PACKET_CREATE_FAIL,
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
  REMOVE_FROM_WATCHLIST,
  PACKET_CREATE_EMPTY_SUCCESS
} from '../constants/packetConstants';
import { logout } from './userActions';

///////////////////////////////// List Actions ////////////////////////////////////
// thunk allows to make async requests here
export const listPackets =
  (
    keyword = '',
    pageNumber = '',
    sorting = 'createdAt_desc',
    filters = {
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
      priceFrom: 0,
      priceTo: 0,
      category: 'All Categories'
    }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PACKET_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/packets?keyword=${keyword}&sorting=${sorting}
      &rating1=${filters.rating1}&rating2=${filters.rating2}&rating3=${filters.rating3}&rating4=${filters.rating4}
      &rating5=${filters.rating5}&priceFrom=${filters.priceFrom}&priceTo=${filters.priceTo}&category=${filters.category}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PACKET_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PACKET_LIST_FAIL,
        payload: 'Something went wrong'
      });
      console.log(error);
    }
  };

/////////////////////////////// Details Actions ///////////////////////////////////
export const listPacketDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PACKET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/packets/${id}`);

    dispatch({
      type: PACKET_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PACKET_DETAILS_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

export const prelistPacketDetails = () => async (dispatch) => {
  try {
    dispatch({ type: PRE_PACKET_DETAILS_REQUEST });
  } catch (error) {
    dispatch({
      type: PACKET_DETAILS_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

//////////////////////////////// User Actions ///////////////////////////////////
export const getUserPackets =
  (id, pageNumber = '', sorting = 'createdAt_desc') =>
  async (dispatch) => {
    try {
      dispatch({ type: PACKET_USER_REQUEST });

      const { data } = await axios.get(
        `/api/packets/user/${id}?sorting=${sorting}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PACKET_USER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PACKET_USER_FAIL,
        payload: 'Something went wrong'
      });
      console.log(error);
    }
  };

export const emptyUserPacketsError = () => async (dispatch) => {
  dispatch({
    type: PACKET_USER_EMPTY_ERROR
  });
};

//////////////////////////////// Create Packet Actions ///////////////////////////////////
export const createPacket =
  (packet, account, contract) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PACKET_CREATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`/api/packets`, packet, config);
      let result = await contract.methods
        .addUpload(userInfo._id, data._id, packet.ipfsHashes)
        .send({ from: account });

      if(result.events.UploadResult === undefined) {
        throw new Error();
      }else{
        dispatch({
          type: PACKET_CREATE_SUCCESS,
          payload: data
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized!') {
        dispatch(logout());
      }
      console.log(message);
      dispatch({
        type: PACKET_CREATE_FAIL,
        payload: 'Something went wrong'
      });
    }
  };

export const emptyCreatePacketError = () => async (dispatch) => {
  dispatch({
    type: PACKET_CREATE_EMPTY_ERROR
  });
};

export const emptyCreatePacketSuccess = () => async (dispatch) => {
  dispatch({
    type: PACKET_CREATE_EMPTY_SUCCESS
  });
};

//////////////////////////////// Update Packet Actions ///////////////////////////////////
export const updatePacket = (packet) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PACKET_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/packets/${packet._id}`,
      packet,
      config
    );

    dispatch({
      type: PACKET_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized!') {
      dispatch(logout());
    }
    console.log(message);
    dispatch({
      type: PACKET_UPDATE_FAIL,
      payload: 'Something went wrong'
    });
  }
};

export const emptyUpdatePacketError = () => async (dispatch) => {
  dispatch({
    type: PACKET_UPDATE_EMPTY_ERROR
  });
};

export const emptyUpdatePacketSuccess = () => async (dispatch) => {
  dispatch({
    type: PACKET_UPDATE_EMPTY_SUCCESS
  });
};

//////////////////////////////// Top Actions ///////////////////////////////////
export const listTopPackets = () => async (dispatch) => {
  try {
    dispatch({ type: PACKET_TOP_REQUEST });

    const { data } = await axios.get(`/api/packets/top`);

    dispatch({
      type: PACKET_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PACKET_TOP_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

//////////////////////////////// Top Actions ///////////////////////////////////
export const addToWatchlist = (packet) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_WATCHLIST,
    payload: packet
  });

  localStorage.setItem(
    'favourites',
    JSON.stringify(getState().watchlist.favourites)
  );
};

export const removeFromWatchlist = (packet) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WATCHLIST,
    payload: packet
  });

  localStorage.setItem(
    'favourites',
    JSON.stringify(getState().watchlist.favourites)
  );
};
