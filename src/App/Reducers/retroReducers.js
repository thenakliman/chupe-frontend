import {ActionTypes} from '../Actions/ActionTypes';

export const retro = (state, action) => {
  if (state === undefined) {
    state = {
      retros: [],
      retroPoints: []
    };
  }

  switch (action.type) {
      case ActionTypes.ADD_RETROS:
        return {...state, retros: [...action.payload]};
      case ActionTypes.ADD_RETRO_POINTS:
        return {...state, retroPoints: [...action.payload]};
      default:
        return {...state};
  }
};
