import axios from 'axios';
import {
  ACCESS_PROFILE_REQUEST,
  ACCESS_PROFILE_SUCCESS,
  ACCESS_PROFILE_FAIL,
  ACCESS_PROFILE_EMPTY_ERROR
} from '../constants/accessConstants';

/////////////////////////////// Profile Actions /////////////////////////////////
export const getUserAccess = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESS_PROFILE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/access/user/${id}`, config);

    dispatch({
      type: ACCESS_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACCESS_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const emptyAccessProfileError = () => async (dispatch) => {
  dispatch({
    type: ACCESS_PROFILE_EMPTY_ERROR
  });
};
