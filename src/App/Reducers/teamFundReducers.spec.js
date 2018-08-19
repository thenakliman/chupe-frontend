import {teamFund} from './teamFundReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Team Fund Reducer', () => {
  const teamFunds = [{owner: 'test-owner'}];
  it('should add team funds to redux', () => {
    const newState = teamFund({}, {
      type: ActionTypes.ADD_TEAM_FUND,
      payload: teamFunds});

    expect(newState).toEqual(teamFunds);
  });

  it('should return existing state when invalid action', () => {
    const initialState = [{owner: 'james'}];
    const newState = teamFund(initialState, {
      type: 'INVALID_ACTION',
      payload: teamFunds});

    expect(newState).toEqual(initialState);
  });

  it('should return default state when state is undefined', () => {
    const newState = teamFund(undefined, {
      type: 'INVALID_ACTION',
      payload: teamFunds});

    expect(newState).toEqual([]);
  });
});
