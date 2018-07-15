import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import LoginContainer from './LoginContainer';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import {Login} from './Login';
import * as LoginActions from '../../Actions/loginActions';


describe('Login in  Container', () => {
  let initialState;
  let store;
  beforeEach(() => {
    initialState = {
        loggedInUserDetails: {
          userName: null,
        },
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('Should dispatch set username action', () => {
    const testAction = 'test-action';
    spyOn(LoginActions, 'authenticate').and.returnValue(testAction);

    const wrapper = mount(
      <Provider store={store}>
        <LoginContainer/>
      </Provider>);
    const username = 'test-username';
    const password = 'test-password';

    wrapper.find(Login).props().authenticate(username, password);

    expect(LoginActions.authenticate).toHaveBeenCalledWith(username, password);
    expect(store.dispatch).toHaveBeenCalledWith(testAction);
  });

  it('Should set username to null', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LoginContainer/>
      </Provider>);

    expect(wrapper.find(Login).props().username).toEqual(null);
  });

  it('Should set username to valid value', () => {
    const username = 'testUsername';
    initialState.loggedInUserDetails.userName = username;
    store = configureStore()(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <LoginContainer/>
      </Provider>);

    expect(wrapper.find(Login).props().username).toEqual(username);
  });
});
