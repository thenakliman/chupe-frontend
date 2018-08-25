import {fetchTeamFund, addTeamFundTypes} from './teamFundActions';
import {ActionTypes} from './ActionTypes';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {TeamFundService} from '../Services/TeamFundService';

describe('team fund action', () => {
  const teamFund = {teamMemberFunds: [{owner: 'james'}]};
  describe('should fetch team fund', () => {
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
      const teamFundTypes = [{id: 10}];

      await store.dispatch(addTeamFundTypes(teamFundTypes));

      expect(store.getActions()).toEqual([{
        type: ActionTypes.ADD_TEAM_FUND_TYPES,
        payload: teamFundTypes,
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
  });
});
