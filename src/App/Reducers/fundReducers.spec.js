import {fund} from './fundReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Team Fund Reducer', () => {
  const memberFunds = [{id: 10}];
  const teamFundTypes = [{id: 10}];
  const initialState = {
    teamMemberFunds: [{owner: 'james'}],
    fundTypes: [],
    teamFunds: [],
  };

  const teamFunds = [{owner: 'test-owner'}];

  it('should add team funds to redux', () => {
    const newState = fund(initialState, {
      type: ActionTypes.ADD_FUNDS_FOR_USER,
      payload: memberFunds,
    });

    expect(newState).toEqual({
      teamMemberFunds: memberFunds,
      fundTypes: [],
      teamFunds: [],
    });
  });

  it('should return existing state when invalid action', () => {
    const newState = fund(initialState, {
      type: 'INVALID_ACTION',
      payload: memberFunds,
    });

    expect(newState).toEqual(initialState);
  });

  it('should return default state when state is undefined', () => {
    const newState = fund(undefined, {
      type: 'INVALID_ACTION',
      payload: memberFunds,
    });

    expect(newState).toEqual({
      teamMemberFunds: [],
      fundTypes: [],
      teamFunds: [],
    });
  });

  it('should add team fund types to redux', () => {
    const newState = fund(initialState, {
      type: ActionTypes.ADD_TEAM_FUND_TYPES,
      payload: teamFundTypes,
    });

    expect(newState).toEqual({
      fundTypes: teamFundTypes,
      teamMemberFunds: [{owner: 'james'}],
      teamFunds: [],
    });
  });

  it('should add team funds to redux', () => {
    const newState = fund(initialState, {
      type: ActionTypes.ADD_TEAM_FUND,
      payload: teamFunds,
    });

    expect(newState).toEqual({
      fundTypes: [],
      teamMemberFunds: [{owner: 'james'}],
      teamFunds: teamFunds,
    });
  });
});
