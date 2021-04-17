import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  REVIEW_CREATE_EMPTY_ERROR,
  REVIEW_CREATE_EMPTY_SUCCESS
} from '../constants/reviewConstants';

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, success: 'Review successfully added' };
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_EMPTY_ERROR:
      return { ...state, error: null };
    case REVIEW_CREATE_EMPTY_SUCCESS:
      return { ...state, success: null };
    case REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
