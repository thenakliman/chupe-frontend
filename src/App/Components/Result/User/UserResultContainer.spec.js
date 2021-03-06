import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
/* eslint-enable */
import UserResultContainer, {mapStateToProps} from './UserResultContainer';
import configureStore from 'redux-mock-store';
import * as UserActions from '../../../Actions/userActions';


describe('User Result Container', () => {
  it('should return all the users', () => {
    const initialState = {users: [{'username': 'user1'}]};
    const props = mapStateToProps(initialState);
    expect(props.users).toEqual(initialState.users);
  });
});


describe('User result container', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      users: [{'user1': 'user1Data'}],
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should get user be called on component mount', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(UserActions, 'getAllUsers').and.returnValue(action);

    mount(
        <Provider store={store}>
          <UserResultContainer/>
        </Provider>);

    expect(UserActions.getAllUsers).toHaveBeenCalledWith();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
