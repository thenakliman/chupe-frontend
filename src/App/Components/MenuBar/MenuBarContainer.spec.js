import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import MenuBarContainer from './MenuBarContainer';
/* eslint-enable */
import MenuBar from './Menu';
import configureStore from 'redux-mock-store';
import * as UserActions from '../../Actions/userActions';
import * as QuestionActions from '../../Actions/questionActions';


describe('Menu Bar container', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      'users': [{'user1': 'user1Data'}],
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should get user be called on click', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(UserActions, 'getAllUsers').and.returnValue(action);

    const container = mount(
      <Provider store={store}>
        <MenuBarContainer/>
      </Provider>);

    const props = container.find(MenuBar).props();
    props.getUsers();
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(UserActions.getAllUsers).toHaveBeenCalledWith();
  });

  it('should get questions be called on click', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(QuestionActions, 'getAllQuestions').and.returnValue(action);

    const container = mount(
      <Provider store={store}>
        <MenuBarContainer/>
      </Provider>);

    const props = container.find(MenuBar).props();
    props.getQuestions();
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(QuestionActions.getAllQuestions).toHaveBeenCalledWith();
  });
});
