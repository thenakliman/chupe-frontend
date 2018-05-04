import {ActionTypes} from './ActionTypes';
import {UserService} from '../Services/UserService';

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users,
});


export const getAllUsers = () => async (dispatch) => {
  try {
    const users = await UserService.getUsers();
    dispatch(addUsers(users));
  } catch (error) {
    console.log('Error on fetching users');
  }
};
