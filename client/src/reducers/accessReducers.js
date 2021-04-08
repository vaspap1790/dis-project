import {
  ACCESS_ADD_REQUEST,
  ACCESS_ADD_SUCCESS,
  ACCESS_ADD_FAIL,
  ACCESS_EMPTY_SUCCESS
} from '../constants/accessConstants';

export const accessAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESS_ADD_REQUEST:
      return {
        loadingAccess: true
      };
    case ACCESS_EMPTY_SUCCESS:
      return {
        success: false
      };
    case ACCESS_ADD_SUCCESS:
      return {
        loadingAccess: false,
        success: true,
        access: action.payload
      };
    case ACCESS_ADD_FAIL:
      return {
        loadingAccess: false,
        error: action.payload
      };
    default:
      return state;
  }
};