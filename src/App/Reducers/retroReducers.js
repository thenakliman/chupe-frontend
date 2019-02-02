import {ActionTypes} from '../Actions/ActionTypes';

export const retro = (state, action) => {
  if (state === undefined) {
    state = {
      retros: [],
    };
  }

  switch (action.type) {
      case ActionTypes.ADD_RETROS:
        return {...state, retros: [...action.payload]};
      default:
        return {...state};
  }
};
