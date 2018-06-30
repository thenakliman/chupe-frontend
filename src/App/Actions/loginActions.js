import {ActionTypes} from './ActionTypes';
import * as TokenService from '../Services/TokenService';

export const setUsername = (username) => {
  return {
    type: ActionTypes.SET_USERNAME,
    payload: username,
  };
};

export const authenticate = (username) => async (dispatch) => {
  const token = await TokenService.getToken(username);
  if (!token) {
    return false;
  }
  dispatch(setUsername(username));
  return true;
};
