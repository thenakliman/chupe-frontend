import {loggedInUserDetails} from './loginReducers';
import {ActionTypes} from '../Actions/ActionTypes';

describe('Login reducers', () => {
  const username = 'test-user';

  const setUserAction = {
    type: ActionTypes.SET_USERNAME,
    payload: username,
  };

  const initialStore = {
    userName: null,
  };

  it('should store username', () => {
    const loggedInUser = loggedInUserDetails(initialStore, setUserAction);
    expect(loggedInUser.userName).toEqual(username);
  });

  it('should keep null in username for other actions', () => {
    const loggedInUser = loggedInUserDetails(
        initialStore,
        {type: 'fake-action', payload: username});

    expect(loggedInUser.userName).toEqual(null);
  });

  it('should keep in username if initially store is empty', () => {
    const loggedInUser = loggedInUserDetails(
        undefined,
        {type: 'fake-action', payload: username});

    expect(loggedInUser.userName).toEqual(null);
  });
});
