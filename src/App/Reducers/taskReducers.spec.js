import {tasks} from './taskReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Task reducer', () => {
  it('Check initial state is empty', () => {
      const nextState = tasks(undefined, {type: 'FAKE_ACTION'});
      expect(nextState).toEqual([]);
  });

  it('Check state is updated on ADD_TASKS action', () => {
      const taskData = [{'user1': 'user1Data'}];
      const addTaskAction = {
          type: ActionTypes.ADD_TASKS,
          payload: taskData,
      };
      const nextState = tasks([], addTaskAction);
      expect(nextState).toEqual(taskData);
  });
});
