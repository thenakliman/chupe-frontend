/* eslint-disable */
import React from 'react';
/* eslint-enable */
import {mapDispatchToProps, mapStateToProps} from './ActionItemContainer';
import * as RetroActions from '../../../Actions/actionItemActions';


describe('ActionItem', () => {
  it('should map action items', () => {
    const props = mapStateToProps({actionItems: [{id: 10}]});
    expect(props.actionItems).toEqual([{id: 10}]);
  });

  it('should have getActionItems in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getActionItems').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    props.getActionItems();

    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
