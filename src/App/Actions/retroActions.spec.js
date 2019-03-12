import {
 getAllRetros,
 getRetroPoints,
 castVote,
 createRetroPoint,
 createRetro} from './retroActions';
import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {RetroService} from '../Services/RetroService';
import thunk from 'redux-thunk';

describe('Get_RETROS action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('Should dispatch action for fetching retros', async () => {
    const testRetro = [{'name': 'fakeTask'}];
    spyOn(RetroService, 'getRetros').and.returnValues(testRetro);
    await store.dispatch(getAllRetros());
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_RETROS,
        payload: testRetro,
      },
    ]);
    expect(RetroService.getRetros).toHaveBeenCalledWith();
  });

  it('Should show error message if failed to update task', async () => {
    spyOn(console, 'log');
    spyOn(RetroService, 'getRetros').and.throwError('failed');

    await store.dispatch(getAllRetros());

    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(console.log).toHaveBeenCalledWith('Error on fetching retros');
  });

  it('Should dispatch action for fetching retro-points', async () => {
    const testRetroPoints = [{'name': 'fakeTask'}];
    spyOn(RetroService, 'getRetroPoints').and.returnValues(testRetroPoints);
    const retroId = 3849;
    await store.dispatch(getRetroPoints(retroId));

    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_RETRO_POINTS,
        payload: testRetroPoints,
      },
    ]);

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
  });

  it('Should show error message if failed to update task', async () => {
    spyOn(console, 'log');
    spyOn(RetroService, 'getRetroPoints').and.throwError('failed');
    const retroId = 3849;

    await store.dispatch(getRetroPoints(retroId));

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(console.log).toHaveBeenCalledWith('Error on fetching retro points');
  });

  it('Should show error message when cast vote fails', async () => {
    spyOn(console, 'log');
    spyOn(RetroService, 'castVote').and.throwError('failed');
    const retroId = 3849;
    const retroPointId = 4387;

    await store.dispatch(castVote(retroId, retroPointId));

    expect(RetroService.castVote).toHaveBeenCalledWith(retroPointId);
    expect(console.log).toHaveBeenCalledWith('Error on casting vote');
  });

  it('Should dispatch action for casting vote', async () => {
    const testRetroPoints = [{'name': 'fakeTask'}];
    spyOn(RetroService, 'getRetroPoints').and.returnValues(testRetroPoints);
    spyOn(RetroService, 'castVote');
    const retroId = 3849;
    const retroPointId = 2349;
    await store.dispatch(castVote(retroId, retroPointId));

    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_RETRO_POINTS,
        payload: testRetroPoints,
      },
    ]);

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(RetroService.castVote).toHaveBeenCalledWith(retroPointId);
  });

  it('Should show error message when create retro', async () => {
    spyOn(console, 'log');
    spyOn(RetroService, 'createRetro').and.throwError('failed');
    const retro = {name: 'retro-name'};

    await store.dispatch(createRetro(retro));

    expect(RetroService.createRetro).toHaveBeenCalledWith(retro);
    expect(console.log).toHaveBeenCalledWith('Error on creating retro');
  });

  it('Should fetch all retros create retro', async () => {
    spyOn(RetroService, 'createRetro');
    const retros = [{id: 20}];
    spyOn(RetroService, 'getRetros').and.returnValues(retros);
    const retro = {name: 'retro-name'};

    await store.dispatch(createRetro(retro));

    expect(RetroService.createRetro).toHaveBeenCalledWith(retro);
    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([{
      'payload': [{'id': 20}],
      'type': 'ADD_RETROS'}]
    );
  });

  it('Should show error message when create retro', async () => {
    spyOn(console, 'log');
    spyOn(RetroService, 'createRetroPoint').and.throwError('failed');
    const retroPoint = {name: 'retro-name'};

    await store.dispatch(createRetroPoint(retroPoint));

    expect(RetroService.createRetroPoint).toHaveBeenCalledWith(retroPoint);
    expect(console.log).toHaveBeenCalledWith('Error on creating retro point');
  });

  it('Should fetch all retros points on create retro', async () => {
    spyOn(RetroService, 'createRetroPoint');
    const retroPoints = [{id: 20}];
    const retroId = 20;
    spyOn(RetroService, 'getRetroPoints').and.returnValues(retroPoints);
    const retroPoint = {name: 'retro-name', retroId: retroId};

    await store.dispatch(createRetroPoint(retroPoint));

    expect(RetroService.createRetroPoint).toHaveBeenCalledWith(retroPoint);
    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(store.getActions()).toEqual([{
      'payload': [{'id': 20}],
      'type': 'ADD_RETRO_POINTS'}]
    );
  });
});
