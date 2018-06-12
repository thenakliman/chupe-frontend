import {ActionTypes} from './ActionTypes';

export const setUsername = (username) => {
  return {
    type: ActionTypes.SET_USERNAME,
    payload: username,
  };
};
