import {
  ACCESS_ADD_REQUEST,
  ACCESS_ADD_SUCCESS,
  ACCESS_ADD_FAIL,
  ACCESS_EMPTY_ERROR,
  ACCESS_EMPTY_SUCCESS,
  ACCESS_PROFILE_REQUEST,
  ACCESS_PROFILE_SUCCESS,
  ACCESS_PROFILE_FAIL,
  ACCESS_PROFILE_EMPTY_ERROR,
  ACCESS_PROFILE_RESET
} from '../constants/accessConstants';

export const accessAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESS_ADD_REQUEST:
      return {
        loading: true,
        error: null,
        success: null
      };
    case ACCESS_ADD_SUCCESS:
      return {
        loading: false,
        error: null,
        success: 'You successfully purchased the item',
        access: action.payload
      };
    case ACCESS_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: null
      };
    case ACCESS_EMPTY_ERROR:
      return {
        error: null
      };
    case ACCESS_EMPTY_SUCCESS:
      return {
        success: null
      };
    default:
      return state;
  }
};

export const accesssUserReducer = (state = { userAccess: [] }, action) => {
  switch (action.type) {
    case ACCESS_PROFILE_REQUEST:
      return { loading: true, userAccess: [] };
    case ACCESS_PROFILE_SUCCESS:
      return { loading: false, userAccess: action.payload };
    case ACCESS_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case ACCESS_PROFILE_RESET:
      return { userAccess: [] };
    case ACCESS_PROFILE_EMPTY_ERROR:
      return { error: null };
    default:
      return state;
  }
};
