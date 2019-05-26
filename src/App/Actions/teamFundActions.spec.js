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
        description: 'Birthday',
      }, {
        id: 11,
        description: 'OnSite',
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
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: [
             {
               owner: 'james',
             },
           ],
           type: 'ADD_TEAM_FUND',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add team fund types', async () => {
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);

      await store.dispatch(fetchFundTypes());

      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_TYPES_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: [
             {
               description: 'Birthday',
               id: 10,
             },
             {
               description: 'OnSite',
               id: 11,
             },
           ],
           type: 'ADD_TEAM_FUND_TYPES',
         },
         {
           payload: 'GET_FUND_TYPES_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add team fund types', async () => {
      spyOn(TeamFundService, 'fetchTeamFund').and.returnValue(teamFund);
      spyOn(TeamFundService, 'addFund').and.returnValue(fundTypes);
      const tFund = {type: 'CREDIT', amount: 1000};
      await store.dispatch(addFund(tFund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(tFund);
      expect(store.getActions()).toEqual([
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
         {
           payload: [
             {
               owner: 'james',
             },
           ],
           type: 'ADD_TEAM_FUND',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add fund for a member', async () => {
      const memberFunds = [{id: 10, type: 10}, {id: 11, type: 11}];
      spyOn(TeamFundService, 'getFundsForAUser').and.returnValue(memberFunds);
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);
      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: [
             {
               id: 10,
               type: 'Birthday',
             },
             {
               id: 11,
               type: 'OnSite',
             },
           ],
           type: 'ADD_FUNDS_FOR_USER',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add fund unkown for a member', async () => {
      const memberFunds = [{id: 10, type: 12}, {id: 11, type: 11}];
      spyOn(TeamFundService, 'getFundsForAUser').and.returnValue(memberFunds);
      spyOn(TeamFundService, 'fetchFundTypes').and.returnValue(fundTypes);
      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([
           {
             payload: 'GET_FUND_LOADER_ID',
             type: 'SHOW_LOADER',
           },
           {
             payload: [
               {
                 id: 10,
                 type: 'Unknown',
               },
               {
                 id: 11,
                 type: 'OnSite',
               },
             ],
             type: 'ADD_FUNDS_FOR_USER',
           },
           {
             payload: 'GET_FUND_LOADER_ID',
             type: 'HIDE_LOADER',
           },
         ]);
    });

    it('should add team fund fail', async () => {
      spyOn(TeamFundService, 'fetchTeamFund').and.throwError('fake error');

      await store.dispatch(fetchTeamFund());

      expect(TeamFundService.fetchTeamFund).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: {
             id: 'GET_FUND_NOTIFICATION_ID',
             message: 'Unable to fetch fund. Please try after sometime.',
             type: 'ERROR',
           },
           type: 'SHOW_NOTIFICATION',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add team fund types fail', async () => {
      spyOn(TeamFundService, 'fetchFundTypes').and.throwError('fake error');

      await store.dispatch(fetchFundTypes());

      expect(TeamFundService.fetchFundTypes).toHaveBeenCalledWith();
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_TYPES_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: {
             id: 'GET_FUND_TYPES_NOTIFICATION_ID',
             message: 'Unable to fetch team fund types. Please try after sometime.',
             type: 'ERROR',
           },
           type: 'SHOW_NOTIFICATION',
         },
         {
           payload: 'GET_FUND_TYPES_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
    });

    it('should add team fund fail', async () => {
      spyOn(TeamFundService, 'addFund').and.throwError('fake error');
      const fund = {amount: 2000};
      await store.dispatch(addFund(fund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(fund);
      expect(store.getActions()).toEqual([
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: {
             id: 'ADD_FUND_NOTIFICATION_ID',
             message: 'Unable to fetch team fund. Please try after sometime.',
             type: 'ERROR',
           },
           type: 'SHOW_NOTIFICATION',
         },
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
  });

  it('should fetch team fund fail when adding fund', async () => {
      spyOn(TeamFundService, 'addFund').and.returnValue([]);
      spyOn(TeamFundService, 'fetchTeamFund').and.throwError('fake error');

      const fund = {amount: 2000};
      await store.dispatch(addFund(fund));

      expect(TeamFundService.addFund).toHaveBeenCalledWith(fund);
      expect(store.getActions()).toEqual([
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: {
             id: 'GET_FUND_NOTIFICATION_ID',
             message: 'Unable to fetch fund. Please try after sometime.',
             type: 'ERROR',
           },
           type: 'SHOW_NOTIFICATION',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
         {
           payload: 'ADD_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
  });

  it('should fetch a member fund fail when adding fund', async () => {
      spyOn(TeamFundService, 'getFundsForAUser').and.throwError('fake error');
      const owner = 'test-owner';
      await store.dispatch(fetchFundsForAUser(owner));

      expect(TeamFundService.getFundsForAUser).toHaveBeenCalledWith(owner);
      expect(store.getActions()).toEqual([
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'SHOW_LOADER',
         },
         {
           payload: {
             id: 'GET_FUND_NOTIFICATION_ID',
             message: 'Unable to fetch fund. Please try after sometime.',
             type: 'ERROR',
           },
           type: 'SHOW_NOTIFICATION',
         },
         {
           payload: 'GET_FUND_LOADER_ID',
           type: 'HIDE_LOADER',
         },
       ]);
  });
});
