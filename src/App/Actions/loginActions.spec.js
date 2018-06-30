import {authenticate} from './loginActions';
import {ActionTypes} from './ActionTypes';
import * as TokenService from '../Services/TokenService';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('Login Actions', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('should call question service and dispatch set username', async () => {
    const username = 'test-user';
    spyOn(TokenService, 'getToken').and.returnValue('fakeToken');

    await store.dispatch(authenticate(username));

    expect(TokenService.getToken).toHaveBeenCalledWith(username);
    expect(store.getActions()).toEqual([{
        payload: username,
        type: ActionTypes.SET_USERNAME,
    }]);
  });

  it('should call question service but not dispatch any action', async () => {
    const username = 'test-user';
    spyOn(TokenService, 'getToken').and.returnValue(null);

    await store.dispatch(authenticate(username));

    expect(TokenService.getToken).toHaveBeenCalledWith(username);
    expect(store.getActions()).toEqual([]);
  });
});
