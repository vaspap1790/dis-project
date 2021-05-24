import axios from 'axios';
import EthCrypto from 'eth-crypto';
import {
  ACTION_CREATE_EMPTY_ERROR,
  ACTION_CREATE_FAIL,
  ACTION_CREATE_REQUEST,
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
      payload: 'Something went wrong'
    });
    console.log(error);
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
      payload: 'Something went wrong'
    });
    console.log(error);
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
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

//////////////////////////////// Create Packet Actions ///////////////////////////////////
export const createAction =
  (
    packetId,
    requesterId,
    receiverId,
    type,
    price,
    account,
    contract,
    pKey,
    web3
  ) =>
  async (dispatch, getState) => {
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

      if (data.type === 'Sample') {
        const { data } = await axios.get(`/api/packets/keys/${packetId}`);
        const { keys, ipfsHashes } = data;
        let encryptedKeys = [];
        let encryptedKeysHashed = [];

        for (var i = 0; i < keys.length; i++) {
          const encryptedObj = await EthCrypto.encryptWithPublicKey(
            pKey,
            keys[i]
          );
          const string = EthCrypto.cipher.stringify(encryptedObj);
          encryptedKeys.push(string);

          const encoded = web3.eth.abi.encodeParameters(['string'], [string]);
          const hash = web3.utils.sha3(encoded, { encoding: 'hex' });
          encryptedKeysHashed.push(hash);
        }

        let result = await contract.methods
          .addSampleRequest(requesterId, packetId, encryptedKeysHashed)
          .send({ from: account });

        let index = result.events.SampleRequestResult.returnValues.index;

        response.ipfsHash = ipfsHashes[index];
        response.encryptionKey = encryptedKeys[index];

        await axios.post(
          `/api/action/store/info`,
          { actionId, account, encryptedKeys },
          config
        );
      } else {
        //let priceInWei = web3.utils.toWei(price.toString(), 'ether');
        let priceInWei = price.toString();
        let result = await web3.eth.sendTransaction({
          from: account,
          to: contract._address,
          value: priceInWei
        });
        console.log(result);
        response = data;
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
      console.log(message);
      dispatch({
        type: ACTION_CREATE_FAIL,
        payload: 'Something went wrong'
      });
    }
  };

export const emptyCreateActionError = () => async (dispatch) => {
  dispatch({
    type: ACTION_CREATE_EMPTY_ERROR
  });
};

//////////////////////////////// Update Action Actions ///////////////////////////////////
export const updateAction =
  (actionId, update, userId, account, contract, web3) =>
  async (dispatch, getState) => {
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

      if (update === 'Reject') {
        const { data } = await axios.get(
          `/api/action/purchase/request/${actionId}`
        );
        let packetId = data.packet._id;
        let requesterAddress = data.requesterAddress;
        // let priceInWei = web3.utils.toWei(
        //   data.packet.price.toString(),
        //   'ether'
        // );
        let priceInWei = data.packet.price.toString();
        let keys = [];

        let result = await contract.methods
          .addPurchase(
            userId,
            packetId,
            requesterAddress,
            keys,
            priceInWei,
            false
          )
          .send({ from: account });
        console.log(result);

        await axios.put(
          `/api/action/update`,
          { actionId, update, userId },
          config
        );
      } else if (update === 'Approve') {
        const { data } = await axios.get(
          `/api/action/purchase/request/${actionId}`
        );
        let packetId = data.packet._id;
        let requesterAddress = data.requesterAddress;
        // let priceInWei = web3.utils.toWei(
        //   data.packet.price.toString(),
        //   'ether'
        // );
        let priceInWei = data.packet.price.toString();
        let encryptedKeys = data.encryptedKeys;

        let result = await contract.methods
          .addPurchase(
            userId,
            packetId,
            requesterAddress,
            encryptedKeys,
            priceInWei,
            true
          )
          .send({ from: account });
        console.log(result);

        if (result.events.SendMoneyEvent === undefined) {
          console.log('Match failed');
        } else {
          console.log('Match succeed');
          await axios.put(
            `/api/action/update`,
            { actionId, update, userId },
            config
          );
        }
      } else {
        await axios.put(
          `/api/action/update`,
          { actionId, update, userId },
          config
        );
      }

      dispatch({
        type: ACTION_UPDATE_SUCCESS,
        payload: 'Success'
      });
    } catch (error) {
      console.log(error);
      const message = 'Something went rong';
      if (message === 'Not authorized!') {
        dispatch(logout());
      }
      console.log(message);
      dispatch({
        type: ACTION_UPDATE_FAIL,
        payload: 'Something went wrong'
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
