/* eslint-disable */
import React from 'react';
import {mapStateToProps, mapDispatchToProps} from './ShowFundContainer';
import {Provider} from 'react-redux';
/* eslint-enable */
import * as TeamFundAction from '../../../Actions/teamFundActions';

describe('TeamFundContainer', () => {
  const funds = [{owner: 'username'}];
  const initialState = {
        fund: {
          teamMemberFunds: funds,
        },
    };

  beforeEach(() => {
  });

  it('Should have funds props for a component', () => {
    const props = mapStateToProps(initialState);
    expect(props.funds).toEqual(initialState.fund.teamMemberFunds);
  });

  it('Should have method for fetch fund', () => {
    const action = 'something';
    const dispatch = jest.fn();
    spyOn(TeamFundAction, 'fetchFundsForAUser').and.returnValue(action);
    const owner = 'test-owner';

    const props = mapDispatchToProps(dispatch);
    props.fetchFunds(owner);

    expect(dispatch).toHaveBeenCalledWith(action);
    expect(TeamFundAction.fetchFundsForAUser).toHaveBeenCalledWith(owner);
  });
});
