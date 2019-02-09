import React from 'react';
import {mapStateToProps, mapDispatchToProps} from './RetroContainer';
import {shallow} from 'enzyme';
import * as RetroActions from '../../../Actions/retroActions';


describe('Retro', () => {
  it('should have retro point container', () => {
    const state = {retro: {retroPoints: [{id: 1023}]}};
    const props = mapStateToProps(state);
    expect(props.retroPoints).toEqual(state.retro.retroPoints);
  })

  it('should call fetch retro points on component mount', () => {
    const retroId = 1029;
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'getRetroPoints').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getRetroPoints(retroId)

    expect(RetroActions.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(dispatch).toHaveBeenCalledWith(fakeAction)
  })
})