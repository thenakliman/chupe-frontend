import {addTasks, createTask, updateTask} from './taskActions';
import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {getAllTasks} from './taskActions';
import {TaskService} from '../Services/TaskService';
import thunk from 'redux-thunk';

describe('ADD_TASK action', () => {
  it('Should return ADD_TASKS action with tasks payload', () => {
    const testTask = [{description: 'fakeTask'}];
    const tasks = addTasks(testTask);
    expect(tasks.type).toEqual(ActionTypes.ADD_TASKS);
    expect(tasks.payload).toEqual(testTask);
  });
});

describe('Get_TASK action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('Should dispatch action for fetching tasks', async () => {
    const testTask = [{'taskName': 'fakeTask'}];
    spyOn(TaskService, 'getTasks').and.returnValues(testTask);
    await store.dispatch(getAllTasks(testTask));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_TASKS,
        payload: testTask,
      },
    ]);
    expect(TaskService.getTasks).toHaveBeenCalledWith();
  });

  it('Should dispatch action for fetching tasks and create task', async () => {
    const testTasks = [{'taskName': 'fakeTask'}];
    spyOn(TaskService, 'getTasks').and.returnValues(testTasks);
    const testTask = {'taskName': 'fakeTask'};
    spyOn(TaskService, 'createTask').and.returnValues(testTask);
    await store.dispatch(createTask(testTask));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_TASKS,
        payload: testTasks,
      },
    ]);
    expect(TaskService.getTasks).toHaveBeenCalledWith();
    expect(TaskService.createTask).toHaveBeenCalledWith(testTask);
  });


  it('Should dispatch action for fetching tasks and create task', async () => {
    const testTask = {'taskName': 'fakeTask'};
    spyOn(TaskService, 'createTask').and.throwError('Error');
    spyOn(console, 'log');
    await store.dispatch(createTask(testTask));
    expect(TaskService.createTask).toHaveBeenCalledWith(testTask);
    expect(console.log).toHaveBeenCalledWith('Error on creating tasks');
  });

  it('Should show error message if failed to get task', async () => {
    spyOn(console, 'log');
    spyOn(TaskService, 'getTasks').and.throwError('failed');
    await store.dispatch(getAllTasks());
    expect(TaskService.getTasks).toHaveBeenCalledWith();
    expect(console.log).toHaveBeenCalledWith('Error on fetching tasks');
  });

  it('Should dispatch action for fetch and update task', async () => {
    const testTask = {'taskName': 'fakeTask'};
    spyOn(TaskService, 'updateTask').and.returnValues(testTask);
    spyOn(TaskService, 'getTasks').and.returnValues([testTask]);

    await store.dispatch(updateTask(testTask));

    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_TASKS,
        payload: [testTask],
      },
    ]);
    expect(TaskService.getTasks).toHaveBeenCalledWith();
    expect(TaskService.updateTask).toHaveBeenCalledWith(testTask);
  });

  it('Should show error message if failed to update task', async () => {
    spyOn(console, 'log');
    spyOn(TaskService, 'updateTask').and.throwError('failed');
    const testTask = {'taskName': 'fakeTask'};

    await store.dispatch(updateTask(testTask));

    expect(TaskService.updateTask).toHaveBeenCalledWith(testTask);
    expect(console.log).toHaveBeenCalledWith('Error on update tasks');
  });
});
