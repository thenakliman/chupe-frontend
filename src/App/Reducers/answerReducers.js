import {ActionTypes} from '../Actions/ActionTypes';

export const answers = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ANSWERS:
      return Object.assign({}, state, {answers: action.payload});
    default:
      return {...state};
  }
};
