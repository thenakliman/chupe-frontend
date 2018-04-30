import { ActionTypes } from '../Actions/ActionTypes'

const initialData = []

export const users = (state=initialData, action) => {
  switch(action.type) {
      case ActionTypes.ADD_USERS:
        return Object.assign({}, state, {users: action.payload});
      default:
        return {...state};
  }
}