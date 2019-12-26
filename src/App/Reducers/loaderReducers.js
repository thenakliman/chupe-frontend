import {ActionTypes} from '../Actions/ActionTypes';

export const loaders = (state, action) => {
  if (state === undefined) {
    state = [];
  }

  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return [...state, action.payload];
    case ActionTypes.HIDE_LOADER:
      return state.filter((loader) => loader !== action.payload);
    default:
      return [...state];
  }
};
