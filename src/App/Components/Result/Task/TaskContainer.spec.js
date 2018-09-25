import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import TaskContainer from './TaskContainer';
/* eslint-enable */
import {mapStateToProps, mapDispatchToProps} from './TaskContainer';
import configureStore from 'redux-mock-store';
import * as TaskActions from '../../../Actions/taskActions';


describe('Task Result Container', () => {
  const initialState = {
    tasks: [{description: 'task1'}],
    loggedInUserDetails: {userName: 'username'},
  };

  it('should return all the tasks', () => {
    const props = mapStateToProps(initialState);
    expect(props.tasks).toEqual(initialState.tasks);
  });

  it('should return logged in user', () => {
    const props = mapStateToProps(initialState);
    expect(props.currentUser).toEqual('username');
  });
});


describe('Task result container', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      tasks: [{'task1': 'task1Data', 'state': 'fakeState'}],
      loggedInUserDetails: {userName: 'username'},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should get task be called on component mount', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(TaskActions, 'getAllTasks').and.returnValue(action);

    mount(
      <Provider store={store}>
        <TaskContainer/>
      </Provider>);

    expect(TaskActions.getAllTasks).toHaveBeenCalledWith();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch create task', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(TaskActions, 'createTask').and.returnValue(action);

    const task = {description: 'task'};

    mapDispatchToProps(store.dispatch).createTask(task);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch update task', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(TaskActions, 'updateTask').and.returnValue(action);

    const task = {description: 'task'};

    mapDispatchToProps(store.dispatch).updateTask(task);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
