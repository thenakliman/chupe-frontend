import {loggedInUserDetail} from './loginReducers';
import {ActionTypes} from '../Actions/ActionTypes';

describe('Login reducers', () => {
  const username = 'test-user';

  const setUserAction = {
    type: ActionTypes.SET_USERNAME,
    payload: username,
  };

  const initialStore = {
    loggedInUserDetails: {
      userName: null,
    },
  };

  it('should store username', () => {
      const loggedInUser = loggedInUserDetail(initialStore, setUserAction);
      expect(loggedInUser.loggedInUserDetails.userName).toEqual(username);
  });

  it('should keep null in username for other actions', () => {
      const loggedInUser = loggedInUserDetail(
          initialStore,
          {type: 'fake-action', payload: username});

      expect(loggedInUser.loggedInUserDetails.userName).toEqual(null);
  });

  it('should keep in username if initially store is empty', () => {
      const loggedInUser = loggedInUserDetail(
          undefined,
          {type: 'fake-action', payload: username});

      expect(loggedInUser.loggedInUserDetails.userName).toEqual(null);
  });
});
