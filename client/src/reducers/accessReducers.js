import {
  ACCESS_ADD_REQUEST,
  ACCESS_ADD_SUCCESS,
  ACCESS_ADD_FAIL,
  ACCESS_EMPTY_ERROR,
  ACCESS_EMPTY_SUCCESS
} from '../constants/accessConstants';

export const accessAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESS_ADD_REQUEST:
      return {
        loadingAccess: true,
        error: null,
        success: null
      };
    case ACCESS_ADD_SUCCESS:
      return {
        loadingAccess: false,
        error: null,
        success: 'You successfully purchased the item',
        access: action.payload
      };
    case ACCESS_ADD_FAIL:
      return {
        loadingAccess: false,
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
