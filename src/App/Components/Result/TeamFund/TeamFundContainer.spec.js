/* eslint-disable */
import React from 'react';
import TeamFund from './TeamFundContainer';
import {Provider} from 'react-redux';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import * as TeamFundAction from '../../../Actions/teamFundActions';

describe('TeamFundContainer', () => {
  let initialState;
  let store;
  const teamFund = [{username: 'username'}];
  const fundTypes = [{id: 100}, {id: 110}];
  const loggedInUser = 'logged-in-user';

  beforeEach(() => {
    initialState = {
      fund: {
        teamFunds: teamFund,
        fundTypes: fundTypes,
        },
        loggedInUserDetails: {userName: loggedInUser},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('Should have teamFund props for a component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    expect(wrapper.find('TeamFund').props().teamFund).toEqual(teamFund);
  });

  it('Should have fundTypes props for a component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    expect(wrapper.find('TeamFund').props().fundTypes).toEqual(fundTypes);
  });

  it('Should have loggedInUser props for a component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    expect(wrapper.find('TeamFund').props().loggedInUser).toEqual(loggedInUser);
  });

  it('Should have method for fetch team fund', () => {
    const fakeAction = {type: 'fakeAction', payload: 'testPayload'};
    spyOn(TeamFundAction, 'fetchTeamFund').and.returnValue(fakeAction);

    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    wrapper.find('TeamFund').props().fetchTeamFund();

    expect(TeamFundAction.fetchTeamFund).toHaveBeenCalledWith();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('Should have method for fetch fund types', () => {
    const fakeAction = {type: 'fakeAction', payload: 'testPayload'};
    spyOn(TeamFundAction, 'fetchFundTypes').and.returnValue(fakeAction);

    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    wrapper.find('TeamFund').props().fetchFundTypes();

    expect(TeamFundAction.fetchFundTypes).toHaveBeenCalledWith();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('Should have method for add fund', () => {
    const fakeAction = {type: 'fakeAction', payload: 'testPayload'};
    spyOn(TeamFundAction, 'addFund').and.returnValue(fakeAction);

    const wrapper = mount(
      <Provider store={store}>
        <TeamFund />
      </Provider>);

    const fakeFund = {amount: 100};
    wrapper.find('TeamFund').props().addFund(fakeFund);

    expect(TeamFundAction.addFund).toHaveBeenCalledWith(fakeFund);
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
