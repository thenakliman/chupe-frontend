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
         payload: 'GET_TASKS_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: [
           {
             taskName: 'fakeTask',
           },
         ],
         type: 'ADD_TASK',
       },
       {
         payload: 'GET_TASKS_LOADER_ID',
         type: 'HIDE_LOADER',
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
           payload: 'CREATE_TASK_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: 'GET_TASKS_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: 'CREATE_TASK_LOADER_ID',
           type: 'HIDE_LOADER',
         },
         {
           payload: [
             {
               taskName: 'fakeTask',
             },
           ],
           type: 'ADD_TASK',
         },
         {
           payload: 'GET_TASKS_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    expect(TaskService.getTasks).toHaveBeenCalledWith();
    expect(TaskService.createTask).toHaveBeenCalledWith(testTask);
  });


  it('Should dispatch action for fetching tasks and create task', async () => {
    const testTask = {'taskName': 'fakeTask'};
    spyOn(TaskService, 'createTask').and.throwError('Error');
    await store.dispatch(createTask(testTask));
    expect(TaskService.createTask).toHaveBeenCalledWith(testTask);
    expect(store.getActions()).toEqual([
       {
         payload: 'CREATE_TASK_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: {
           id: 'CREATE_TASK_NOTIFICATION_ID',
           message: 'Unable to create task. Please try after sometime.',
           type: 'ERROR',
         },
         type: 'SHOW_NOTIFICATION',
       },
       {
         payload: 'CREATE_TASK_LOADER_ID',
         type: 'HIDE_LOADER',
       },
     ]);
  });

  it('Should show error message if failed to get task', async () => {
    spyOn(TaskService, 'getTasks').and.throwError('failed');
    await store.dispatch(getAllTasks());
    expect(TaskService.getTasks).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
       {
         payload: 'GET_TASKS_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: {
           id: 'GET_TASKS_NOTIFICATION_ID',
           message: 'Unable to fetch tasks. Please try after sometime.',
           type: 'ERROR',
         },
         type: 'SHOW_NOTIFICATION',
       },
       {
         payload: 'GET_TASKS_LOADER_ID',
         type: 'HIDE_LOADER',
       },
     ]);
  });

  it('Should dispatch action for fetch and update task', async () => {
    const testTask = {'taskName': 'fakeTask'};
    spyOn(TaskService, 'updateTask').and.returnValues(testTask);
    spyOn(TaskService, 'getTasks').and.returnValues([testTask]);

    await store.dispatch(updateTask(testTask));

    expect(store.getActions()).toEqual([
       {
         payload: 'UPDATE_TASK_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: 'GET_TASKS_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: 'UPDATE_TASK_LOADER_ID',
         type: 'HIDE_LOADER',
       },
       {
         payload: [
           {
             taskName: 'fakeTask',
           },
         ],
         type: 'ADD_TASK',
       },
       {
         payload: 'GET_TASKS_LOADER_ID',
         type: 'HIDE_LOADER',
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
    expect(store.getActions()).toEqual([
       {
         payload: 'UPDATE_TASK_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: {
           id: 'UPDATE_TASK_NOTIFICATION_ID',
           message: 'Unable to update task. Please try after sometime.',
           type: 'ERROR',
         },
         type: 'SHOW_NOTIFICATION',
       },
       {
         payload: 'UPDATE_TASK_LOADER_ID',
         type: 'HIDE_LOADER',
       },
     ]);
  });
});
