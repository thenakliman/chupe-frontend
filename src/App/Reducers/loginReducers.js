import {ActionTypes} from '../Actions/ActionTypes';

const initialStore = {
  userName: null,
};

export const loggedInUserDetails = (state = initialStore, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERNAME:
      return Object.assign(
          {},
          state,
          {userName: action.payload});
    default:
      return {...state};
  }
};
