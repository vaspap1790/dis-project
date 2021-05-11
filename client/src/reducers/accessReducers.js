import {
  ACCESS_PROFILE_REQUEST,
  ACCESS_PROFILE_SUCCESS,
  ACCESS_PROFILE_FAIL,
  ACCESS_PROFILE_EMPTY_ERROR,
  ACCESS_PROFILE_RESET
} from '../constants/accessConstants';

export const accesssUserReducer = (state = { userAccess: [] }, action) => {
  switch (action.type) {
    case ACCESS_PROFILE_REQUEST:
      return { loading: true, userAccess: [] };
    case ACCESS_PROFILE_SUCCESS:
      return { loading: false, userAccess: action.payload };
    case ACCESS_PROFILE_FAIL:
      return { loading: false, userAccess: [], error: action.payload };
    case ACCESS_PROFILE_RESET:
      return { userAccess: [] };
    case ACCESS_PROFILE_EMPTY_ERROR:
      return { error: null, ...state };
    default:
      return state;
  }
};
