import { users } from './userReducers';
import { ActionTypes } from '../Actions/ActionTypes'

const initialUsersState = {
  'users': []
}

describe('User reducer', () => {
  it('Check initial state is empty', () => {
      const nextState = users(undefined, {type: 'FAKE_ACTION'})
      expect(nextState).toEqual({});
  });

  it('Check state is updated on ADD_USER action', () => {
      const usersData = [{'user1': 'user1Data'}];
      const addUserAction = {
          type: ActionTypes.ADD_USERS,
          payload: usersData
      };
      const nextState = users({'key1': 'data1'}, addUserAction);
      const expectState = {'key1': 'data1', 'users': usersData};
      expect(nextState).toEqual(expectState);
  });
});