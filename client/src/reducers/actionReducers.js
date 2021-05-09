import {
  ACTION_CREATE_EMPTY_ERROR,
  ACTION_CREATE_FAIL,
  ACTION_CREATE_REQUEST,
  ACTION_CREATE_RESET,
  ACTION_CREATE_SUCCESS,
  NOTIF_LIST_FAIL,
  NOTIF_LIST_REQUEST,
  NOTIF_LIST_SUCCESS,
  REQUESTS_LIST_FAIL,
  REQUESTS_LIST_REQUEST,
  REQUESTS_LIST_SUCCESS,
  ACTION_UPDATE_EMPTY_ERROR,
  ACTION_UPDATE_EMPTY_SUCCESS,
  ACTION_UPDATE_FAIL,
  ACTION_UPDATE_REQUEST,
  ACTION_UPDATE_SUCCESS,
  COUNT_UNREAD_ACTIONS_FAIL,
  COUNT_UNREAD_ACTIONS_REQUEST,
  COUNT_UNREAD_ACTIONS_SUCCESS,
  NOTIF_LIST_RESET,
  REQUESTS_LIST_RESET,
  COUNT_UNREAD_ACTIONS_RESET
} from '../constants/actionConstants';

export const notifListReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case NOTIF_LIST_REQUEST:
      return { loading: true, notifications: [] };
    case NOTIF_LIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload
      };
    case NOTIF_LIST_FAIL:
      return { loading: false, error: action.payload, notifications: [] };
    case NOTIF_LIST_RESET:
      return { notifications: [] };
    default:
      return state;
  }
};

export const requestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUESTS_LIST_REQUEST:
      return { loading: true, requests: [] };
    case REQUESTS_LIST_SUCCESS:
      return {
        loading: false,
        requests: action.payload
      };
    case REQUESTS_LIST_FAIL:
      return { loading: false, error: action.payload, requests: [] };
    case REQUESTS_LIST_RESET:
      return { requests: [] };
    default:
      return state;
  }
};

export const actionCreateReducer = (
  state = { data: { ipfsHash: '', encryptionKey: '' } },
  action
) => {
  switch (action.type) {
    case ACTION_CREATE_REQUEST:
      return { loading: true };
    case ACTION_CREATE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case ACTION_CREATE_FAIL:
      return {
        data: { ipfsHash: '', encryptionKey: '' },
        loading: false,
        error: action.payload
      };
    case ACTION_CREATE_RESET:
      return {
        loading: false,
        data: { ipfsHash: '', encryptionKey: '' },
        error: null
      };
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
    case COUNT_UNREAD_ACTIONS_RESET:
      return { count: 0 };
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
