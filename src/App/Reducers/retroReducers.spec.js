import {retro} from './retroReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Retro reducer', () => {
  it('Check initial state is empty', () => {
    const nextState = retro(undefined, {type: 'FAKE_ACTION'});
    expect(nextState).toEqual({
      retros: [],
      retroPoints: [],
      actionItems: [],
      practices: [],
      practicesAssessment: []
    });
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

  it('Check state is updated on ADD_RETRO_ACTION_ITEMS action', () => {
    const retroActionItems = [{'user1': 'user1Data'}];
    const addRetroActionItems = {
      type: ActionTypes.ADD_RETRO_ACTION_ITEMS,
      payload: retroActionItems,
    };

    const nextState = retro([], addRetroActionItems);

    expect(nextState).toEqual({actionItems: retroActionItems});
  });

  it('Check state is updated on ADD_BEST_PRACTICES action', () => {
    const bestPractices = [{id: 100}];
    const addBestPractices = {
      type: ActionTypes.ADD_BEST_PRACTICES,
      payload: bestPractices,
    };

    const nextState = retro([], addBestPractices);

    expect(nextState).toEqual({practices: bestPractices});
  });

  it('Check state is updated on ADD_PRACTICES_ASSESSMENT action', () => {
    const practicesAssessment = [{id: 100}];
    const addPracticesAssessment = {
      type: ActionTypes.ADD_PRACTICES_ASSESSMENT,
      payload: practicesAssessment,
    };

    const nextState = retro([], addPracticesAssessment);

    expect(nextState).toEqual({practicesAssessment: practicesAssessment});
  });
});
