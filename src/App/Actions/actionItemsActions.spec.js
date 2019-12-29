import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {ActionItemService} from '../Services/ActionItemService';
import {getActionItems} from './actionItemActions';

describe('should fetch action items', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('should dispatch action for action item', async () => {
    const actionItems = [{id: 1011}];
    spyOn(ActionItemService, 'getActionItems').and.returnValues(actionItems);

    await store.dispatch(getActionItems());

    expect(ActionItemService.getActionItems).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
          {
            payload: 'GET_ACTION_ITEMS_LOADER_ID',
            type: 'SHOW_LOADER',
          },
          {
            payload: [{
              id: 1011,
            }],
            type: 'ADD_ACTION_ITEMS',
          },
          {
            payload: 'GET_ACTION_ITEMS_LOADER_ID',
            type: 'HIDE_LOADER',
          },
        ]
    );
  });

  it('should dispatch action on failure of action item fetch', async () => {
    spyOn(ActionItemService, 'getActionItems').and.throwError('some error');

    await store.dispatch(getActionItems());

    expect(ActionItemService.getActionItems).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
          {
            payload: 'GET_ACTION_ITEMS_LOADER_ID',
            type: 'SHOW_LOADER',
          },
          {
            payload: {
              id: 'GET_ACTION_ITEMS_NOTIFICATION_ID',
              message: 'Unable to fetch action items. Please try after sometime.',
              type: 'ERROR',
            },
            type: 'SHOW_NOTIFICATION',
          },
          {
            payload: 'GET_ACTION_ITEMS_LOADER_ID',
            type: 'HIDE_LOADER',
          },
        ]
    );
  });
});
