import {ActionTypes} from '../Actions/ActionTypes';

export const fundTypes = (state, action) => {
  if (state === undefined) {
    state = [];
  }

  switch (action.type) {
      case ActionTypes.ADD_TEAM_FUND_TYPES:
        return [...action.payload];
      default:
        return [...state];
  }
};
