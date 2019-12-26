import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import MeetingDiscussionItemsContainer from './MeetingDiscussionItemsContainer';
/* eslint-enable */
import {MeetingDiscussionItem} from './MeetingDiscussionItem';
import configureStore from 'redux-mock-store';
import * as MeetingActions from '../../../Actions/meetingActions';
import * as UserActions from '../../../Actions/userActions';

describe('Meeting Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      meeting: {meetingDiscussionItems: [{id: 'meetingDiscussionItems'}]},
      users: [{userName: 'user-name'}],
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have meetingDiscussionItems in props', () => {
    const container = mount(
        <Provider store={store}>
          <MeetingDiscussionItemsContainer match={{params: {id: 101}}}/>
        </Provider>);

    const props = container.find(MeetingDiscussionItem).props();
    expect(props.meetingDiscussionItems).toEqual(initialState.meeting.meetingDiscussionItems);
  });

  it('should have users in props', () => {
    const container = mount(
        <Provider store={store}>
          <MeetingDiscussionItemsContainer match={{params: {id: 101}}}/>
        </Provider>);

    const props = container.find(MeetingDiscussionItem).props();
    expect(props.users).toEqual(initialState.users);
  });

  it('should call getMeetingDiscussionItems', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'getMeetingDiscussionItems')
        .and.returnValue(fakeAction);

    const meetingDiscussionItemId = 101;
    const container = mount(
        <Provider store={store}>
          <MeetingDiscussionItemsContainer match={{params: {id: meetingDiscussionItemId}}}/>
        </Provider>);

    container.find(MeetingDiscussionItem).props().getMeetingDiscussionItems(meetingDiscussionItemId);
    expect(MeetingActions.getMeetingDiscussionItems).toHaveBeenCalledWith(101);
  });

  it('should call getAllUsers', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'getMeetingDiscussionItems').and.returnValue(fakeAction);

    const fakeUserAction = 'fake-user-action';
    spyOn(UserActions, 'getAllUsers').and.returnValue(fakeUserAction);

    const meetingDiscussionItemId = 101;
    const container = mount(
        <Provider store={store}>
          <MeetingDiscussionItemsContainer match={{params: {id: meetingDiscussionItemId}}}/>
        </Provider>);

    container.find(MeetingDiscussionItem).props().getAllUsers();
    expect(MeetingActions.getMeetingDiscussionItems).toHaveBeenCalledWith(101);
    expect(UserActions.getAllUsers).toHaveBeenCalledWith();
  });

  it('should call createMeetingDiscussionItem', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'createMeetingDiscussionItem').and.returnValue(fakeAction);

    const meetingDiscussionItemId = 101;
    const container = mount(
        <Provider store={store}>
          <MeetingDiscussionItemsContainer match={{params: {id: meetingDiscussionItemId}}}/>
        </Provider>);

    const meetingDiscussionItem = {id: 20};
    container.find(MeetingDiscussionItem).props().createMeetingDiscussionItem(meetingDiscussionItem);
    expect(MeetingActions.createMeetingDiscussionItem).toHaveBeenCalledWith(meetingDiscussionItem);
  });
});
