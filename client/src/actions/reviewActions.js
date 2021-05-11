import axios from 'axios';
import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_EMPTY_ERROR,
  REVIEW_CREATE_EMPTY_SUCCESS
} from '../constants/reviewConstants';
import { logout } from '../actions/userActions';

export const createUserReview =
  (userId, review, account, contract) => async (dispatch, getState) => {
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

      await axios.post(`/api/review/${userId}`, review, config);

      let rating = review.rating;
      let comment = review.comment;

      let result = await contract.methods
        .addReview(userId, userInfo._id, rating, comment)
        .send({ from: account });
      console.log(result);

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
