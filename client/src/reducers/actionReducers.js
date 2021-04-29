import {
  ACTION_CREATE_EMPTY_ERROR,
  ACTION_CREATE_FAIL,
  ACTION_CREATE_REQUEST,
  ACTION_CREATE_RESET,
  ACTION_CREATE_SUCCESS,
  ACTION_LIST_FAIL,
  ACTION_LIST_REQUEST,
  ACTION_LIST_SUCCESS,
  ACTION_UPDATE_EMPTY_ERROR,
  ACTION_UPDATE_EMPTY_SUCCESS,
  ACTION_UPDATE_FAIL,
  ACTION_UPDATE_REQUEST,
  ACTION_UPDATE_SUCCESS,
  COUNT_UNREAD_ACTIONS_FAIL,
  COUNT_UNREAD_ACTIONS_REQUEST,
  COUNT_UNREAD_ACTIONS_SUCCESS
} from '../constants/actionConstants';

export const actionListReducer = (state = { actions: [] }, action) => {
  switch (action.type) {
    case ACTION_LIST_REQUEST:
      return { loading: true, actions: [] };
    case ACTION_LIST_SUCCESS:
      return {
        loading: false,
        actions: action.payload
      };
    case ACTION_LIST_FAIL:
      return { loading: false, error: action.payload, actions: [] };
    default:
      return state;
  }
};

export const actionCreateReducer = (state = { key: {} }, action) => {
  switch (action.type) {
    case ACTION_CREATE_REQUEST:
      return { loading: true };
    case ACTION_CREATE_SUCCESS:
      return { loading: false, success: true, key: action.payload };
    case ACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACTION_CREATE_RESET:
      return { loading: false, key: {}, error: null };
    case ACTION_CREATE_EMPTY_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const actionCountReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case COUNT_UNREAD_ACTIONS_REQUEST:
      return { loading: true };
    case COUNT_UNREAD_ACTIONS_SUCCESS:
      return { loading: false, success: true, count: action.payload };
    case COUNT_UNREAD_ACTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const actionUpdateReducer = (
  state = { action: {}, loading: false },
  action
) => {
  switch (action.type) {
    case ACTION_UPDATE_REQUEST:
      return { loading: true };
    case ACTION_UPDATE_SUCCESS:
      return {
        loading: false,
        success: 'Action Updated',
        action: action.payload
      };
    case ACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACTION_UPDATE_EMPTY_ERROR:
      return { ...state, error: null };
    case ACTION_UPDATE_EMPTY_SUCCESS:
      return { ...state, success: null };
    default:
      return state;
  }
};
