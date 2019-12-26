import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import MeetingsContainer from './MeetingsContainer';
/* eslint-enable */
import {Meetings} from './Meetings';
import configureStore from 'redux-mock-store';
import * as MeetingActions from '../../../Actions/meetingActions';

describe('Feedback Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      meeting: {meetings: [{id: 'meeting-id'}]},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have meeting in props', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'getMeetings').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <MeetingsContainer/>
        </Provider>);

    const props = container.find(Meetings).props();
    expect(props.meetings)
        .toEqual(initialState.meeting.meetings);
  });

  it('should have getMeetings in props', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'getMeetings').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <MeetingsContainer/>
        </Provider>);

    container.find(Meetings).props();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should call createMeeting', () => {
    const fakeAction = 'fake - action';
    spyOn(MeetingActions, 'createMeeting').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <MeetingsContainer/>
        </Provider>);

    container.find('#meeting-button-id').simulate('click');
    expect(MeetingActions.createMeeting).toHaveBeenCalledWith('');
  });
});
