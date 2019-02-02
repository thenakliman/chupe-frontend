import {getAllRetros} from './retroActions';
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
});
