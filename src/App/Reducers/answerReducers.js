import {ActionTypes} from '../Actions/ActionTypes';

export const answers = (state=[], action) => {
  console.log(state);

  switch (action.type) {
    case ActionTypes.ADD_ANSWERS:
      return [...action.payload];
    default:
      return [...state];
  }
};
