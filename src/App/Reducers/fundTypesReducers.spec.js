import {fundTypes} from './fundTypesReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Team Fund Reducer', () => {
  const teamFundTypes = [{id: 10}];
  it('should add team funds to redux', () => {
    const newState = fundTypes({}, {
      type: ActionTypes.ADD_TEAM_FUND_TYPES,
      payload: teamFundTypes});

    expect(newState).toEqual(teamFundTypes);
  });

  it('should return existing state when invalid action', () => {
    const initialState = [{owner: 'james'}];
    const newState = fundTypes(initialState, {
      type: 'INVALID_ACTION',
      payload: teamFundTypes});

    expect(newState).toEqual(initialState);
  });

  it('should return default state when state is undefined', () => {
    const newState = fundTypes(undefined, {
      type: 'INVALID_ACTION',
      payload: teamFundTypes});

    expect(newState).toEqual([]);
  });
});
