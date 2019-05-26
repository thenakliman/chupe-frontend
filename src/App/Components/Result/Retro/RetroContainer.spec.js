/* eslint-disable */
import React from 'react';
import {shallow} from 'enzyme';
/* eslint-enable */
import {mapStateToProps, mapDispatchToProps} from './RetroContainer';
import * as RetroActions from '../../../Actions/retroActions';
import * as UserActions from '../../../Actions/userActions';


describe('Retro', () => {
  it('should map retroPoint', () => {
    const state = {retro: {retroPoints: [{id: 1023}]}};
    const props = mapStateToProps(state);
    expect(props.retroPoints).toEqual(state.retro.retroPoints);
  });

  it('should map action item', () => {
    const state = {retro: {actionItems: [{id: 1023}]}};
    const props = mapStateToProps(state);
    expect(props.actionItems).toEqual(state.retro.actionItems);
  });

  it('should map users', () => {
    const state = {users: [{id: 1023}], retro: {}};
    const props = mapStateToProps(state);
    expect(props.users).toEqual(state.users);
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

  it('should call fetch action items', () => {
    const retroId = 1029;
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'getActionItems').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getActionItems(retroId);

    expect(RetroActions.getActionItems).toHaveBeenCalledWith(retroId);
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

  it('should create retro point', () => {
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'createRetroPoint').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    const retroPoint = {name: 'fake actions'};
    mapDispatchToProps(dispatch).createRetroPoint(retroPoint);

    expect(RetroActions.createRetroPoint).toHaveBeenCalledWith(retroPoint);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should create action item', () => {
    const fakeAction = 'fake-action';
    spyOn(RetroActions, 'createActionItem').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    const actionItem = {name: 'fake actions'};
    mapDispatchToProps(dispatch).createActionItem(actionItem);

    expect(RetroActions.createActionItem).toHaveBeenCalledWith(actionItem);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should get users', () => {
    const fakeAction = 'fake-action';
    spyOn(UserActions, 'getAllUsers').and.returnValue(fakeAction);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUsers();

    expect(UserActions.getAllUsers).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
