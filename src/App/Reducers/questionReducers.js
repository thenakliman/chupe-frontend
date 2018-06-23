import {ActionTypes} from '../Actions/ActionTypes';

export const questions = (state=[], action) => {
  switch (action.type) {
      case ActionTypes.ADD_QUESTIONS:
        return [...action.payload];
      default:
        return [...state];
  }
};
