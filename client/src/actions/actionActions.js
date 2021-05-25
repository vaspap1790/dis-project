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
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    let actionId;

    try {
      dispatch({
        type: ACTION_CREATE_REQUEST
      });

      const action = { packetId, requesterId, receiverId, type };
      const { data } = await axios.post(`/api/action`, action, config);

      let response = {};
      actionId = data._id;

      //***************************Request Sample********************************//
      if (data.type === 'Sample') {
        //Retrieve packet information
        const { data } = await axios.get(`/api/packets/keys/${packetId}`);
        const { keys, ipfsHashes } = data;
        let encryptedKeys = [];
        let encryptedKeysHashed = [];

        //Encrypt with buyer's public key and hash the encryption keys
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

        //Call the Smart Contract
        let result = await contract.methods
          .addSampleRequest(requesterId, packetId, encryptedKeysHashed)
          .send({ from: account });

        //SUCCESSFUL Transaction
        if (result.events.SampleRequestResult !== undefined) {
          let index = result.events.SampleRequestResult.returnValues.index;

          response.ipfsHash = ipfsHashes[index];
          response.encryptionKey = encryptedKeys[index];

          await axios.post(
            `/api/action/store/info`,
            { actionId, account, encryptedKeys },
            config
          );

          dispatch({
            type: ACTION_CREATE_SUCCESS,
            payload: response
          });
        }
        //FAILED Transaction - Rollback
        else {
          const rollback = await axios.delete(
            `/api/action/delete/${actionId}`,
            config
          );
          console.log(rollback);
          throw new Error();
        }
      }
      //***************************Request Purchase********************************//
      else {
        let priceInWei = price.toString();

        //Call the Smart Contract
        let result = await web3.eth.sendTransaction({
          from: account,
          to: contract._address,
          value: priceInWei
        });
        //This result is handled in App.js in the Event Listener
        console.log(result);
      }
    } catch (error) {
      //***************************Handle Error********************************//
      if (actionId !== undefined) {
        await axios.delete(`/api/action/delete/${actionId}`, config);
      }

      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized!') {
        dispatch(logout());
      }
      dispatch({
        type: ACTION_CREATE_FAIL,
        payload: 'Something went wrong'
      });
      console.log(message);
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

      //***************************Reject a Request********************************//
      if (update === 'Reject') {
        //Retrieve information
        const { data } = await axios.get(
          `/api/action/purchase/request/${actionId}`
        );
        let packetId = data.packet._id;
        let requesterAddress = data.requesterAddress;
        let priceInWei = data.packet.price.toString();
        let keys = [];

        //Call the Smart Contract
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

        //SUCCESSFUL Transaction
        if (result.events.ReturnMoneyEvent !== undefined) {
          await axios.put(
            `/api/action/update`,
            { actionId, update, userId },
            config
          );
          dispatch({
            type: ACTION_UPDATE_SUCCESS,
            payload: 'Success'
          });
        }
        //FAILED Transaction
        else {
          throw new Error();
        }
      }
      //***************************Approve a Request********************************//
      else if (update === 'Approve') {
        //Retrieve information
        const { data } = await axios.get(
          `/api/action/purchase/request/${actionId}`
        );
        let packetId = data.packet._id;
        let requesterAddress = data.requesterAddress;
        let priceInWei = data.packet.price.toString();
        let encryptedKeys = data.encryptedKeys;

        //Call the Smart Contract
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

        //SUCCESSFUL transaction
        if (result.events.SendMoneyEvent !== undefined) {
          //Approve Request in DB
          await axios.put(
            `/api/action/update`,
            { actionId, update, userId },
            config
          );

          //Retrieve all other requests for this packet
          const { requests } = await axios.get(
            `/api/action/purchase/requests/${packetId}`
          );
          let reject = 'Reject';

          //Reject all other requests for this packet
          for (let i = 0; i < requests.length; i++) {
            //Retrieve information
            let actionId = requests[i]._id;
            let packetId = requests[i].packet._id;
            let requesterAddress = requests[i].requesterAddress;
            let priceInWei = requests[i].packet.price.toString();
            let keys = [];

            //Call the Smart Contract
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

            //SUCCESSFUL Transaction
            if (result.events.ReturnMoneyEvent !== undefined) {
              await axios.put(
                `/api/action/update`,
                { actionId, reject, userId },
                config
              );
            }
            //FAILED Transaction
            else {
              console.log('Failed to reject action with id ' + requests[i]._id);
            }
          }

          dispatch({
            type: ACTION_UPDATE_SUCCESS,
            payload: 'Success'
          });
        }
        //FAILED transaction
        else {
          throw new Error();
        }
      }
      //****Other Types of Update Action - No interaction with the Smart Contract****//
      else {
        await axios.put(
          `/api/action/update`,
          { actionId, update, userId },
          config
        );
        dispatch({
          type: ACTION_UPDATE_SUCCESS,
          payload: 'Success'
        });
      }
    } catch (error) {
      //***************************Handle Error********************************//
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized!') {
        dispatch(logout());
      }
      dispatch({
        type: ACTION_UPDATE_FAIL,
        payload: 'Something went wrong'
      });
      console.log(error);
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
