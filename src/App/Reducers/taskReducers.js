import {ActionTypes} from '../Actions/ActionTypes';

export const tasks = (state=[], action) => {
  switch (action.type) {
      case ActionTypes.ADD_TASKS:
        return [...action.payload];
      default:
        return [...state];
  }
};
