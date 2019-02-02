import {retro} from './retroReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Retro reducer', () => {
  it('Check initial state is empty', () => {
      const nextState = retro(undefined, {type: 'FAKE_ACTION'});
      expect(nextState).toEqual({retros: []});
  });

  it('Check state is updated on ADD_RETROS action', () => {
      const retrosData = [{'user1': 'user1Data'}];
      const addRetroAction = {
          type: ActionTypes.ADD_RETROS,
          payload: retrosData,
      };

      const nextState = retro([], addRetroAction);

      expect(nextState).toEqual({retros: retrosData});
  });
});
