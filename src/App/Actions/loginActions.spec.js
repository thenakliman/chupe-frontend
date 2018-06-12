import {setUsername} from './loginActions';
import * as ActionTypes from './ActionTypes';
describe('Login Actions', () => {
  it('should create an action with given username', () => {
      const username = 'test-username';
      expect(setUsername(username)).toEqual({
        payload: username,
        type: ActionTypes.SET_USERNAME,
      });
  });
});
