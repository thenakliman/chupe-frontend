import {retro} from './retroReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Retro reducer', () => {
  it('Check initial state is empty', () => {
      const nextState = retro(undefined, {type: 'FAKE_ACTION'});
      expect(nextState).toEqual({retros: [], retroPoints: []});
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

  it('Check state is updated on ADD_RETRO_POINTS action', () => {
      const retrosData = [{'user1': 'user1Data'}];
      const addRetroAction = {
          type: ActionTypes.ADD_RETRO_POINTS,
          payload: retrosData,
      };

      const nextState = retro([], addRetroAction);

      expect(nextState).toEqual({retroPoints: retrosData});
  });
});
