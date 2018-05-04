import {ActionTypes} from '../Actions/ActionTypes';

const initialData = {
  usersData: [],
};

export const users = (state=initialData, action) => {
  switch (action.type) {
      case ActionTypes.ADD_USERS:
        return Object.assign({}, state, {usersData: action.payload});
      default:
        return {...state};
  }
};
