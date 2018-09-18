import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import TaskContainer from './TaskContainer';
/* eslint-enable */
import {mapStateToProps} from './TaskContainer';
import configureStore from 'redux-mock-store';
import * as TaskActions from '../../../Actions/taskActions';


describe('Task Result Container', () => {
  it('should return all the tasks', () => {
    const initialState = {tasks: [{description: 'task1'}]};
    const props = mapStateToProps(initialState);
    expect(props.tasks).toEqual(initialState.tasks);
  });
});


describe('Task result container', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      tasks: [{'task1': 'task1Data', state: 'fakeState'}],
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
});
