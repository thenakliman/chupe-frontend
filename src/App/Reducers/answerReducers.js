import {ActionTypes} from '../Actions/ActionTypes';

export const answers = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ANSWERS:
      return [...action.payload];
    case ActionTypes.ADD_ANSWER:
      return [...state, ...[action.payload]];
    case ActionTypes.UPDATE_ANSWER:
      const answerIndex = state.findIndex(
          (answer) => answer.id === action.payload.id);
      const newState = [...state];
      newState[answerIndex] = {...action.payload};
      return newState;
    default:
      return [...state];
  }
};
