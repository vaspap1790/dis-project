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
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  PURCHASES_REQUEST,
  PURCHASES_SUCCESS,
  PURCHASES_FAIL,
  PURCHASES_RESET
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_EMPTY_ERROR:
      return { ...state, error: null };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_EMPTY_ERROR:
      return { ...state, error: null };
    case USER_REGISTER_EMPTY_SUCCESS:
      return { ...state, success: null };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, error: null, success: null };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: 'Profile Updated',
        error: null
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: null, error: action.payload };
    case USER_PROFILE_EMPTY_ERROR:
      return { ...state, error: null };
    case USER_PROFILE_EMPTY_SUCCESS:
      return { ...state, success: null };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { userData: { reviews: [], userRating: [] } },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
        userData: { reviews: [], userRating: [] }
      };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { userData: { reviews: [], userRating: [] } };
    default:
      return state;
  }
};

export const userPurchasesReducer = (state = { purchases: [] }, action) => {
  switch (action.type) {
    case PURCHASES_REQUEST:
      return { loading: true, purchases: [] };
    case PURCHASES_SUCCESS:
      return {
        loading: false,
        purchases: action.payload
      };
    case PURCHASES_FAIL:
      return { loading: false, error: action.payload, purchases: [] };
    case PURCHASES_RESET:
      return { purchases: [] };
    default:
      return state;
  }
};
