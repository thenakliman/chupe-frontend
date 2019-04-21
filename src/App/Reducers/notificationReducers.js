import {ActionTypes} from '../Actions/ActionTypes';

export const notifications = (state, action) => {
  if (state === undefined) {
    state = [];
  }

  switch (action.type) {
      case ActionTypes.SHOW_NOTIFICATION:
        return [...state, action.payload];
      case ActionTypes.HIDE_NOTIFICATION:
        return state.filter((notification) =>
                  notification.id !== action.payload);
      default:
        return [...state];
  }
};
