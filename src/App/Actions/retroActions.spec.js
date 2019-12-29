import {
  castVote,
  changeStatus,
  createActionItem,
  createRetro,
  createRetroPoint,
  getActionItems,
  getAllRetros,
  getRetroPoints,
} from './retroActions';
import configureStore from 'redux-mock-store';
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
        payload: 'GET_RETROS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            name: 'fakeTask',
          },
        ],
        type: 'ADD_RETROS',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
    expect(RetroService.getRetros).toHaveBeenCalledWith();
  });

  it('Should dispatch action for fetching action items', async () => {
    const testRetroActionItems = [{'name': 'fakeTask'}];
    spyOn(RetroService, 'getActionItems').and.returnValues(testRetroActionItems);

    const retro = 102;
    await store.dispatch(getActionItems(retro));

    expect(store.getActions()).toEqual([
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            name: 'fakeTask',
          },
        ],
        type: 'ADD_RETRO_ACTION_ITEMS',
      },
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
    expect(RetroService.getActionItems).toHaveBeenCalledWith(retro);
  });

  it('Should show error message if failed to get retro', async () => {
    spyOn(RetroService, 'getRetros').and.throwError('failed');

    await store.dispatch(getAllRetros());

    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_RETROS_NOTIFICATION_ID',
          message: 'Unable to fetch retros. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message if failed to get retro action items', async () => {
    spyOn(RetroService, 'getActionItems').and.throwError('failed');
    const retro = 203;
    await store.dispatch(getActionItems(retro));

    expect(RetroService.getActionItems).toHaveBeenCalledWith(retro);
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_RETRO_ACTION_ITEMS_NOTIFICATION_ID',
          message: 'Unable to fetch retro action items. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should dispatch action for fetching retro-points', async () => {
    const testRetroPoints = [{'name': 'fakeTask'}];
    spyOn(RetroService, 'getRetroPoints').and.returnValues(testRetroPoints);
    const retroId = 3849;
    await store.dispatch(getRetroPoints(retroId));

    expect(store.getActions()).toEqual([
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            name: 'fakeTask',
          },
        ],
        type: 'ADD_RETRO_POINTS',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
  });

  it('Should show error message if failed to get retro points', async () => {
    spyOn(RetroService, 'getRetroPoints').and.throwError('failed');
    const retroId = 3849;

    await store.dispatch(getRetroPoints(retroId));

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_RETRO_POINT_NOTIFICATION_ID',
          message: 'Unable to fetch retro points. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message when cast vote fails', async () => {
    spyOn(RetroService, 'castVote').and.throwError('failed');
    const retroId = 3849;
    const retroPointId = 4387;

    await store.dispatch(castVote(retroId, retroPointId));

    expect(RetroService.castVote).toHaveBeenCalledWith(retroPointId);
    expect(store.getActions()).toEqual([
      {
        payload: 'CAST_VOTE_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CAST_VOTE_NOTIFICATION_ID',
          message: 'Unable to cast vote. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CAST_VOTE_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
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
        payload: 'CAST_VOTE_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CAST_VOTE_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: [
          {
            name: 'fakeTask',
          },
        ],
        type: 'ADD_RETRO_POINTS',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);

    expect(RetroService.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(RetroService.castVote).toHaveBeenCalledWith(retroPointId);
  });

  it('Should show error message when create retro', async () => {
    spyOn(RetroService, 'createRetro').and.throwError('failed');
    const retro = {name: 'retro-name'};
    await store.dispatch(createRetro(retro));

    expect(RetroService.createRetro).toHaveBeenCalledWith(retro);
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CREATE_RETRO_NOTIFICATION_ID',
          message: 'Unable to create retro. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CREATE_RETRO_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message when change retro status fails', async () => {
    spyOn(RetroService, 'changeStatus').and.throwError('failed');
    await store.dispatch(changeStatus('id', 'status'));

    expect(RetroService.changeStatus).toHaveBeenCalledWith('id', 'status');
    expect(store.getActions()).toEqual([
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CHANGE_RETRO_STATUS_NOTIFICATION_ID',
          message: 'Unable to change status. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error notification when fetch notification fails for retro status change', async () => {
    const retro = {name: 'retro-name'};
    spyOn(RetroService, 'changeStatus');
    spyOn(RetroService, 'getRetros').and.throwError('some error');

    await store.dispatch(changeStatus('id', 'status'));

    expect(RetroService.changeStatus).toHaveBeenCalledWith('id', 'status');
    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_RETROS_NOTIFICATION_ID',
          message: 'Unable to fetch retros. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should change retro status', async () => {
    const retro = {name: 'retro-name'};
    spyOn(RetroService, 'changeStatus');
    spyOn(RetroService, 'getRetros').and.returnValues([]);

    await store.dispatch(changeStatus('id', 'status'));

    expect(RetroService.changeStatus).toHaveBeenCalledWith('id', 'status');
    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CHANGE_RETRO_STATUS_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: [],
        type: 'ADD_RETROS',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should fetch all retros create retro', async () => {
    spyOn(RetroService, 'createRetro');
    const retros = [{id: 20}];
    spyOn(RetroService, 'getRetros').and.returnValues(retros);
    const retro = {name: 'retro-name'};

    await store.dispatch(createRetro(retro));

    expect(RetroService.createRetro).toHaveBeenCalledWith(retro);
    expect(RetroService.getRetros).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CREATE_RETRO_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: [
          {
            id: 20,
          },
        ],
        type: 'ADD_RETROS',
      },
      {
        payload: 'GET_RETROS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message when create retro point', async () => {
    spyOn(RetroService, 'createRetroPoint').and.throwError('failed');
    const retroPoint = {name: 'retro-name'};

    await store.dispatch(createRetroPoint(retroPoint));

    expect(RetroService.createRetroPoint).toHaveBeenCalledWith(retroPoint);
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CREATE_RETRO_POINT_NOTIFICATION_ID',
          message: 'Unable to create retro point. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CREATE_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message when create retro action fails', async () => {
    spyOn(RetroService, 'createActionItem').and.throwError('failed');
    const actionItem = {name: 'retro-name'};

    await store.dispatch(createActionItem(actionItem));

    expect(RetroService.createActionItem).toHaveBeenCalledWith(actionItem);
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_ACTION_ITEM_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CREATE_RETRO_ACTION_ITEM_NOTIFICATION_ID',
          message: 'Unable to create retro action item. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CREATE_RETRO_ACTION_ITEM_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
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
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CREATE_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: [
          {
            id: 20,
          },
        ],
        type: 'ADD_RETRO_POINTS',
      },
      {
        payload: 'GET_RETRO_POINT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should fetch all retro actions items on create action items', async () => {
    spyOn(RetroService, 'createActionItem');
    const actionItems = [{description: 'fake action item'}];
    const retroId = 20;
    spyOn(RetroService, 'getActionItems').and.returnValues(actionItems);
    const actionItem = {name: 'retro-name', retroId: retroId};

    await store.dispatch(createActionItem(actionItem, retroId));

    expect(RetroService.createActionItem).toHaveBeenCalledWith(actionItem);
    expect(RetroService.getActionItems).toHaveBeenCalledWith(retroId);
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_RETRO_ACTION_ITEM_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CREATE_RETRO_ACTION_ITEM_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: [
          {
            description: 'fake action item',
          },
        ],
        type: 'ADD_RETRO_ACTION_ITEMS',
      },
      {
        payload: 'GET_RETRO_ACTION_ITEMS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });
});
