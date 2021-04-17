import axios from 'axios';
import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_EMPTY_ERROR,
  REVIEW_CREATE_EMPTY_SUCCESS
} from '../constants/reviewConstants';
import { logout } from '../actions/userActions';

export const createPacketReview = (packetId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST
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

    await axios.post(`/api/review/${packetId}`, review, config);

    dispatch({
      type: REVIEW_CREATE_SUCCESS
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
      type: REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};

export const emptyCreateReviewError = () => async (dispatch) => {
  dispatch({
    type: REVIEW_CREATE_EMPTY_ERROR
  });
};

export const emptyCreateReviewSuccess = () => async (dispatch) => {
  dispatch({
    type: REVIEW_CREATE_EMPTY_SUCCESS
  });
};
