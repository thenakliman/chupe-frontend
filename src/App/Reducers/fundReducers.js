import {ActionTypes} from '../Actions/ActionTypes';

export const funds = (state, action) => {
  if (state === undefined) {
    state = [];
  }

  switch (action.type) {
      case ActionTypes.ADD_FUNDS_FOR_USER:
        return [...action.payload];
      default:
        return [...state];
  }
};
