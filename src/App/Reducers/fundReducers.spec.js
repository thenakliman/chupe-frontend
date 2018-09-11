import {funds} from './fundReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Team Fund Reducer', () => {
  const memberFunds = [{id: 10}];
  it('should add team funds to redux', () => {
    const newState = funds({}, {
      type: ActionTypes.ADD_FUNDS_FOR_USER,
      payload: memberFunds});

    expect(newState).toEqual(memberFunds);
  });

  it('should return existing state when invalid action', () => {
    const initialState = [{owner: 'james'}];
    const newState = funds(initialState, {
      type: 'INVALID_ACTION',
      payload: memberFunds});

    expect(newState).toEqual(initialState);
  });

  it('should return default state when state is undefined', () => {
    const newState = funds(undefined, {
      type: 'INVALID_ACTION',
      payload: memberFunds});

    expect(newState).toEqual([]);
  });
});
