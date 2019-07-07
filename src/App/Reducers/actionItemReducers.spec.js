import {actionItems} from './actionItemReducers';

describe('ActionItemReducers', () => {
  it('should return null if state is empty', () => {
    const action = {type: 'ADD_ACTION_ITEMS', payload: []};
    const answer = actionItems(undefined, action);
    expect(answer).toEqual([]);
  });

  it('should store action items on ADD_ACTION_ITEMS action', () => {
    const testActionItems = [{id: 10}];
    const action = {type: 'ADD_ACTION_ITEMS', payload: testActionItems};
    const receivedActionItem = actionItems([], action);
    expect(receivedActionItem).toEqual(testActionItems);
  });

  it('should not store action items on INVALID ACTION action', () => {
    const testActionItems = [{id: 10}];
    const action = {type: 'INVALID_ACTION', payload: testActionItems};
    const receivedActionItem = actionItems([], action);
    expect(receivedActionItem).toEqual([]);
  });
});
