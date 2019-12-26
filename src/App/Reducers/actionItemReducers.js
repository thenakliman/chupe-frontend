import {ActionTypes} from '../Actions/ActionTypes';

export const actionItems = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACTION_ITEMS:
      return [...action.payload];
    default:
      return [...state];
  }
};
