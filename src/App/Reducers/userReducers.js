import {ActionTypes} from '../Actions/ActionTypes';

export const users = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS:
      return [...action.payload];
    default:
      return [...state];
  }
};
