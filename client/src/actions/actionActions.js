import axios from 'axios';
import EthCrypto from 'eth-crypto';
import {
  ACTION_CREATE_EMPTY_ERROR,
  ACTION_CREATE_FAIL,
  ACTION_CREATE_REQUEST,
  ACTION_CREATE_RESET,
  ACTION_CREATE_SUCCESS,
  NOTIF_LIST_FAIL,
  NOTIF_LIST_REQUEST,
  NOTIF_LIST_SUCCESS,
  REQUESTS_LIST_FAIL,
  REQUESTS_LIST_REQUEST,
  REQUESTS_LIST_SUCCESS,
  ACTION_UPDATE_EMPTY_ERROR,
  ACTION_UPDATE_EMPTY_SUCCESS,
  ACTION_UPDATE_FAIL,
  ACTION_UPDATE_REQUEST,
  ACTION_UPDATE_SUCCESS,
  COUNT_UNREAD_ACTIONS_REQUEST,
  COUNT_UNREAD_ACTIONS_SUCCESS,
  COUNT_UNREAD_ACTIONS_FAIL
} from '../constants/actionConstants';
import { logout } from './userActions';

export const getUserNotifications = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTIF_LIST_REQUEST });

    const { data } = await axios.get(`/api/action/notif/user/${id}`);

    dispatch({
      type: NOTIF_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NOTIF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUserRequests = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUESTS_LIST_REQUEST });

    const { data } = await axios.get(`/api/action/requests/user/${id}`);

    dispatch({
      type: REQUESTS_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REQUESTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const countUnreadActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUNT_UNREAD_ACTIONS_REQUEST });

    const { data } = await axios.get(`/api/action/count/user/${id}`);

    dispatch({
      type: COUNT_UNREAD_ACTIONS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: COUNT_UNREAD_ACTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

//////////////////////////////// Create Packet Actions ///////////////////////////////////
export const createAction = (
  packetId,
  requesterId,
  receiverId,
  type,
  account,
  contract,
  pKey
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const action = { packetId, requesterId, receiverId, type };
    const { data } = await axios.post(`/api/action`, action, config);

    let response = {};
    let actionId = data._id;

    if (data.type !== 'Sample') {
      response = data;
    } else {
      const { data } = await axios.get(`/api/packets/keys/${packetId}`);
      const { keys, ipfsHashes } = data;
      let encryptedKeys = [];

      const publicKey = EthCrypto.publicKeyByPrivateKey(pKey);

      for (var i = 0; i < keys.length; i++) {
        const encrypted = await EthCrypto.encryptWithPublicKey(
          publicKey,
          keys[i]
        );
        encryptedKeys.push(encrypted.ciphertext);
      }

      let result = await contract.methods
        .addSampleRequest(requesterId, packetId, encryptedKeys)
        .send({ from: account });

      let index = result.events.SampleRequestResult.returnValues.index;

      let requesterAddress =
        result.events.SampleRequestResult.returnValues.requester;

      await axios.post(
        `/api/action/store/address`,
        { actionId, requesterAddress },
        config
      );

      response.ipfsHash = ipfsHashes[index];
      response.encryptionKey = encryptedKeys[index];
    }

    dispatch({
      type: ACTION_CREATE_SUCCESS,
      payload: response
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized!') {
      dispatch(logout());
    }
    dispatch({
      type: ACTION_CREATE_FAIL,
      payload: message
    });
  }
};

export const emptyCreateActionError = () => async (dispatch) => {
  dispatch({
    type: ACTION_CREATE_EMPTY_ERROR
  });
};

//////////////////////////////// Update Action Actions ///////////////////////////////////
export const updateAction = (actionId, update, userId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ACTION_UPDATE_REQUEST
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
      `/api/action/update`,
      { actionId, update, userId },
      config
    );

    dispatch({
      type: ACTION_UPDATE_SUCCESS,
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
    dispatch({
      type: ACTION_UPDATE_FAIL,
      payload: message
    });
  }
};

export const emptyUpdateAccessError = () => async (dispatch) => {
  dispatch({
    type: ACTION_UPDATE_EMPTY_ERROR
  });
};

export const emptyUpdateAccessSuccess = () => async (dispatch) => {
  dispatch({
    type: ACTION_UPDATE_EMPTY_SUCCESS
  });
};
