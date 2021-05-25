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

      let rating = review.rating;
      let comment = review.comment;

      //Call the Smart Contract
      let result = await contract.methods
        .addReview(userId, userInfo._id, rating, comment)
        .send({ from: account });
      console.log(result);

      //SUCCESSFUL Transaction
      if (result.events.ReviewResult !== undefined) {
        await axios.post(`/api/review/${userId}`, review, config);
        dispatch({
          type: REVIEW_CREATE_SUCCESS
        });
      }
      //FAILED Transaction
      else {
        throw new Error();
      }
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized!') {
        dispatch(logout());
      } else if (message === 'User already reviewed') {
        dispatch({
          type: REVIEW_CREATE_FAIL,
          payload: message
        });
      } else {
        dispatch({
          type: REVIEW_CREATE_FAIL,
          payload: 'Something went wrong'
        });
      }
      console.log(error);
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
