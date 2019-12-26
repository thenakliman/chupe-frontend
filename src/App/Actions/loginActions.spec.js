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

  it('should call token service to get token', async () => {
    spyOn(TokenService, 'getToken').and.returnValue('fakeToken');

    const username = 'test-user';
    const password = 'my-password';
    await store.dispatch(authenticate(username, password));

    expect(TokenService.getToken).toHaveBeenCalledWith(username, password);
    expect(store.getActions()).toEqual([{
      payload: username,
      type: ActionTypes.SET_USERNAME,
    }]);
  });

  it('should call token service and not dispatch action', async () => {
    spyOn(TokenService, 'getToken').and.returnValue(null);

    const username = 'test-user';
    const password = 'my-password';
    await store.dispatch(authenticate(username, password));

    expect(TokenService.getToken).toHaveBeenCalledWith(username, password);
    expect(store.getActions()).toEqual([]);
  });
});
