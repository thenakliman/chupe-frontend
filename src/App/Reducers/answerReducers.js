import {ActionTypes} from '../Actions/ActionTypes';

export const answers = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ANSWERS:
      return [...action.payload];
    case ActionTypes.ADD_ANSWER:
      return [...state, ...[action.payload]];
    default:
      return [...state];
  }
};
