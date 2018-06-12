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
    const username = 'test-username';
    spyOn(LoginActions, 'setUsername').and.returnValue(testAction);

    const wrapper = mount(
      <Provider store={store}>
        <LoginContainer/>
      </Provider>);

    wrapper.find(Login).props().setUsername(username);

    expect(LoginActions.setUsername).toHaveBeenCalledWith(username);
    expect(store.dispatch).toHaveBeenCalledWith(testAction);
  });
});
