import {ActionTypes} from '../Actions/ActionTypes';

export const retro = (state, action) => {
  if (state === undefined) {
    state = {
      retros: [],
      retroPoints: [],
      actionItems: [],
    };
  }

  switch (action.type) {
      case ActionTypes.ADD_RETROS:
        return {...state, retros: [...action.payload]};
      case ActionTypes.ADD_RETRO_POINTS:
        return {...state, retroPoints: [...action.payload]};
      case ActionTypes.ADD_RETRO_ACTION_ITEMS:
        return {...state, actionItems: [...action.payload]};
      default:
        return {...state};
  }
};
