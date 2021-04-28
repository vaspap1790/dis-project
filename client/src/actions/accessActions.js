import axios from 'axios';
import {
  ACCESS_ADD_REQUEST,
  ACCESS_ADD_SUCCESS,
  ACCESS_ADD_FAIL,
  ACCESS_EMPTY_ERROR,
  ACCESS_EMPTY_SUCCESS,
  ACCESS_PROFILE_REQUEST,
  ACCESS_PROFILE_SUCCESS,
  ACCESS_PROFILE_FAIL,
  ACCESS_PROFILE_EMPTY_ERROR
} from '../constants/accessConstants';

////////////////////////////////// Add Action ////////////////////////////////////
export const addNewAccess = (packetId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCESS_ADD_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    // TODO:
    // check if the user has already purchased
    // this item
    // (probably in the state, else GET request)
    const alreadyPurchased = false;

    if (alreadyPurchased) {
      dispatch({
        type: ACCESS_ADD_FAIL,
        payload: 'You have already purchased this item'
      });
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `/api/access`,
        { packetId: packetId },
        config
      );

      dispatch({
        type: ACCESS_ADD_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    dispatch({
      type: ACCESS_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const emptyAccessSuccess = () => async (dispatch) => {
  dispatch({
    type: ACCESS_EMPTY_SUCCESS
  });
};

export const emptyAccessError = () => async (dispatch) => {
  dispatch({
    type: ACCESS_EMPTY_ERROR
  });
};

/////////////////////////////// Profile Actions /////////////////////////////////
export const getUserAccess = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESS_PROFILE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/access/user/${id}`, config);

    dispatch({
      type: ACCESS_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCESS_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const emptyAccessProfileError = () => async (dispatch) => {
  dispatch({
    type: ACCESS_PROFILE_EMPTY_ERROR
  });
};
