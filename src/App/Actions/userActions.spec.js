import { addUsers } from './userActions';
import configureStore from 'redux-mock-store'
import { ActionTypes } from './ActionTypes';
import { getUsers } from './userActions';
import { UserService } from '../Services/UserService';
import thunk from 'redux-thunk';

describe('ADD_USER action', () => {
  it('Should return ADD_USERS action with users payload', () => {
    const testUser = [{"userName": "fakeUser"}];
    const users = addUsers(testUser);
    expect(users.type).toEqual(ActionTypes.ADD_USERS);
    expect(users.payload).toEqual(testUser);
  })
});

describe('Get_USER action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  })


  it('Should dispatch action for fetching users', async () => {
    const testUser = [{"userName": "fakeUser"}];
    console.log(UserService);
    spyOn(UserService, 'getUsers').and.returnValues(testUser);
    await store.dispatch(getUsers(testUser));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_USERS,
        payload: testUser
      }
    ])
    expect(UserService.getUsers).toHaveBeenCalledWith();
  })
});
