import {ActionTypes} from '../Actions/ActionTypes';

export const fund = (state, action) => {
  if (state === undefined) {
    state = {
      teamMemberFunds: [],
      fundTypes: [],
      teamFunds: [],
    };
  }

  switch (action.type) {
      case ActionTypes.ADD_FUNDS_FOR_USER:
        return {...state, teamMemberFunds: [...action.payload]};
      case ActionTypes.ADD_TEAM_FUND_TYPES:
        return {...state, fundTypes: [...action.payload]};
      case ActionTypes.ADD_TEAM_FUND:
        return {...state, teamFunds: [...action.payload]};
      default:
        return {...state};
  }
};
