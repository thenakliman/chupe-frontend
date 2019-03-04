/* eslint-disable */
import React from 'react';
import {shallow} from 'enzyme';
/* eslint-enable */
import {mapStateToProps, mapDispatchToProps} from './RetroContainer';
import * as RetroActions from '../../../Actions/retroActions';


describe('Retro', () => {
  it('should have retro point container', () => {
    const state = {retro: {retroPoints: [{id: 1023}]}};
    const props = mapStateToProps(state);
    expect(props.retroPoints).toEqual(state.retro.retroPoints);
  });

  it('should call fetch retro points on component mount', () => {
    const retroId = 1029;
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'getRetroPoints').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getRetroPoints(retroId);

    expect(RetroActions.getRetroPoints).toHaveBeenCalledWith(retroId);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should call cast vote on cast of vote', () => {
    const retroId = 1029;
    const retroPointId = 1923;
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'castVote').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).vote(retroId, retroPointId);

    expect(RetroActions.castVote).toHaveBeenCalledWith(retroId, retroPointId);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
