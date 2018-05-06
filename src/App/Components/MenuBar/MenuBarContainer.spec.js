import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import MenuBarContainer from './MenuBarContainer';
/* eslint-enable */
import {MenuBar} from './Menu';
import configureStore from 'redux-mock-store';


describe('Menu Bar container', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      'users': [{'user1': 'user1Data'}],
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should dispatch action on user tab click', () => {
    const container = mount(
      <Provider store={store}>
        <MenuBarContainer/>
      </Provider>);

    const props = container.find(MenuBar).props();
    props.showUserTab();
    expect(store.dispatch).toHaveBeenCalledWith(
    {
        type: 'CHANGE_RESULT_VIEW',
        payload: 'USER_COMPONENT',
    });
  });
  it('should dispatch action on questions tab click', () => {
    const container = mount(
      <Provider store={store}>
        <MenuBarContainer/>
      </Provider>);

    const props = container.find(MenuBar).props();
    props.showQuestionTab();
    expect(store.dispatch).toHaveBeenCalledWith(
    {
        type: 'CHANGE_RESULT_VIEW',
        payload: 'QUESTION_COMPONENT',
    });
  });
});
