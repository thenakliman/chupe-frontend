import {
  fetchTeamFund,
  fetchFundTypes,
  addFund,
  fetchFundsForAUser,
  } from './teamFundActions';

import {ActionTypes} from './ActionTypes';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {TeamFundService} from '../Services/TeamFundService';

describe('team fund action', () => {
  const teamFund = {teamMemberFunds: [{owner: 'james'}]};
  const fundTypes=[{
        id: 10,
        description: 'Birthday'
      },{
        id: 11,
        description: 'OnSite'
      }];

    let store;
    beforeEach(() => {
      const middleware = [thunk];
      store = configureStore(middleware)({});
      store.clearActions();
    });

    it('should add team fund', async () => {
      spyOn(TeamFundService, 'fetchTeamFund').and.returnValue(teamFund);

      await store.dispatch(fetchTeamFund());

      expect(TeamFundService.fetchTeamFund).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_TEAM_FUND,
        payload: teamFund.teamMemberFunds,
      }]);
    });

    it('should add team fund types', async () => {
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);

      await store.dispatch(fetchFundTypes());

      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_TEAM_FUND_TYPES,
        payload: fundTypes,
      }]);
    });

    it('should add team fund types', async () => {
      spyOn(TeamFundService, 'fetchTeamFund').and.returnValue(teamFund);
      spyOn(TeamFundService, 'addFund').and.returnValue(fundTypes);
      const tFund = {type: 'CREDIT', amount: 1000};
      await store.dispatch(addFund(tFund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(tFund);
      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_TEAM_FUND,
        payload: teamFund.teamMemberFunds,
      }]);
    });

    it('should add fund for a member', async () => {
      const memberFunds = [{id: 10, type: 10}, {id: 11, type: 11}];
      spyOn(TeamFundService, 'getFundsForAUser').and.returnValue(memberFunds);
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);
      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_FUNDS_FOR_USER,
        payload: [{id: 10, type: 'Birthday'}, {id: 11, type: 'OnSite'}],
      }]);
    });

    it('should add fund unkown for a member', async () => {
      const memberFunds = [{id: 10, type: 12}, {id: 11, type: 11}];
      spyOn(TeamFundService, 'getFundsForAUser').and.returnValue(memberFunds);
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);
      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_FUNDS_FOR_USER,
        payload: [{id: 10, type: 'Unknown'}, {id: 11, type: 'OnSite'}],
      }]);
    });

    it('should add team fund fail', async () => {
      spyOn(TeamFundService, 'fetchTeamFund').and.throwError('fake error');
      spyOn(console, 'log');

      await store.dispatch(fetchTeamFund());

      expect(TeamFundService.fetchTeamFund).toHaveBeenCalledWith();
      expect(console.log).toHaveBeenCalledWith('Error in fetching team fund');
      expect(store.getActions()).toEqual([]);
    });

    it('should add team fund fail', async () => {
      spyOn(TeamFundService, 'fetchFundTypes').and.throwError('fake error');
      spyOn(console, 'log');

      await store.dispatch(fetchFundTypes());

      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(console.log).
          toHaveBeenCalledWith('Error in fetching team fund types');
      expect(store.getActions()).toEqual([]);
    });

    it('should add team fund fail', async () => {
      spyOn(TeamFundService, 'addFund').and.throwError('fake error');
      spyOn(console, 'log');
      const fund = {amount: 2000};
      await store.dispatch(addFund(fund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(fund);
      expect(console.log).
          toHaveBeenCalledWith('Error in adding fund');
      expect(store.getActions()).toEqual([]);
  });

  it('should fetch team fund fail when adding fund', async () => {
      spyOn(TeamFundService, 'addFund').and.returnValue([]);
      spyOn(TeamFundService, 'fetchTeamFund').and.throwError('fake error');

      spyOn(console, 'log');
      const fund = {amount: 2000};
      await store.dispatch(addFund(fund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(fund);
      expect(console.log).
          toHaveBeenCalledWith('Error in fetching team fund');
      expect(store.getActions()).toEqual([]);
  });

  it('should fetch a member fund fail when adding fund', async () => {
      spyOn(TeamFundService, 'getFundsForAUser').and.throwError('fake error');
      spyOn(console, 'log');

      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(console.log).
          toHaveBeenCalledWith('Error in fetching fund for a member');
      expect(store.getActions()).toEqual([]);
  });
});
