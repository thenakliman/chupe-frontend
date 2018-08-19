import {ActionTypes} from '../Actions/ActionTypes';

export const teamFund = (state, action) => {
  if (state === undefined) {
    state = [];
  }

  switch (action.type) {
      case ActionTypes.ADD_TEAM_FUND:
        return [...action.payload];
      default:
        return [...state];
  }
};
