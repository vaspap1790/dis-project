import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_EMPTY_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_EMPTY_ERROR,
  USER_REGISTER_EMPTY_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_PROFILE_EMPTY_SUCCESS,
  USER_PROFILE_EMPTY_ERROR,
  USER_DETAILS_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  PURCHASES_RESET,
  PURCHASES_REQUEST,
  PURCHASES_SUCCESS,
  PURCHASES_FAIL
} from '../constants/userConstants';
import { PACKET_USER_RESET } from '../constants/packetConstants';
import {
  NOTIF_LIST_RESET,
  COUNT_UNREAD_ACTIONS_RESET,
  REQUESTS_LIST_RESET
} from '../constants/actionConstants';
import axios from 'axios';

//////////////////////////////// Login Actions ///////////////////////////////////
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    let message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Invalid Credentials') {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: message
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: 'Something went wrong'
      });
    }
    console.log(error);
  }
};

export const emptyLoginError = () => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_EMPTY_ERROR
  });
};

/////////////////////////////// Register Actions /////////////////////////////////
export const register =
  (username, email, password, account, contract) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let newUserId;

    try {
      dispatch({
        type: USER_REGISTER_REQUEST
      });

      const { data } = await axios.post(
        '/api/users',
        { username, email, password },
        config
      );
      newUserId = data._id;

      //Call the Smart Contract
      const result = await contract.methods
        .registerUser(newUserId)
        .send({ from: account });

      //SUCCESSFUL Transaction
      if (result.events.Register !== undefined) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data
        });

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
      //FAILED Transaction - Rollback
      else {
        const rollback = await axios.delete(`/api/users/delete/${newUserId}`);
        console.log(rollback);
        throw new Error();
      }
    } catch (error) {
      //***************************Handle Error********************************//
      if (newUserId !== undefined) {
        await axios.delete(`/api/users/delete/${newUserId}`);
      }

      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === 'This email is already in use') {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: message
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: 'Something went wrong'
        });
      }
      console.log(error);
    }
  };

export const emptyRegisterError = () => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_EMPTY_ERROR
  });
};

export const emptyRegisterSuccess = () => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_EMPTY_SUCCESS
  });
};

//////////////////////////////// Logout Actions //////////////////////////////////
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: PACKET_USER_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: NOTIF_LIST_RESET });
  dispatch({ type: COUNT_UNREAD_ACTIONS_RESET });
  dispatch({ type: REQUESTS_LIST_RESET });
  dispatch({ type: PURCHASES_RESET });
};

/////////////////////////////// Profile Actions //////////////////////////////////
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
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

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

export const emptyProfileError = () => async (dispatch) => {
  dispatch({
    type: USER_PROFILE_EMPTY_ERROR
  });
};

export const emptyProfileSuccess = () => async (dispatch) => {
  dispatch({
    type: USER_PROFILE_EMPTY_SUCCESS
  });
};

/////////////////////////////// Details Actions //////////////////////////////////
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/packets/userDetails/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};

////////////////////////////// Purchases Actions /////////////////////////////////
export const getUserPurchases = (id) => async (dispatch) => {
  try {
    dispatch({ type: PURCHASES_REQUEST });

    const { data } = await axios.get(`/api/users/purchases/${id}`);

    dispatch({
      type: PURCHASES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PURCHASES_FAIL,
      payload: 'Something went wrong'
    });
    console.log(error);
  }
};
