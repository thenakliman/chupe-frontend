import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuBarContainer from './MenuBarContainer';
import MenuBar from './Menu';
import configureStore from 'redux-mock-store';
import * as UserActions from '../../Actions/userActions';


describe("Menu Bar container", () => {

  let store;

  beforeEach(() => {
    const initialState = {
      'users': [{'user1': 'user1Data'}]
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  })

  it('should get user be called on click', () => {
    const action = {type: 'ACTION', payload: 'FAKE_PAYLOAD'};
    spyOn(UserActions, 'getUsers').and.returnValue(action);

    const container = mount(
      <Provider store={store}>
        <MenuBarContainer/>
      </Provider>);

    const props = container.find(MenuBar).props();
    props.getUsers();
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(UserActions.getUsers).toHaveBeenCalledWith();
  });
});