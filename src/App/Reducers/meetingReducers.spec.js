import {meeting} from './meetingReducers';
import {ActionTypes} from '../Actions/ActionTypes';

describe('Meeting Reducer', () => {
  const initialState = {
      meetingDiscussionItems: [],
      meetings: [],
  };

  it('should add meeting to redux', () => {
    const meetings = [{id: 'feedbacks'}];
    const newState = meeting(initialState, {
      type: ActionTypes.ADD_MEETINGS,
      payload: meetings});

    expect(newState.meetings).toEqual(meetings);
  });

  it('should add meeting discussion items to redux', () => {
    const meetingDiscussionItems = [{id: 'meeting'}];
    const newState = meeting(initialState, {
      type: ActionTypes.ADD_MEETING_DISCUSSION_ITEMS,
      payload: meetingDiscussionItems});

    expect(newState.meetingDiscussionItems).toEqual(meetingDiscussionItems);
  });

  it('should not add meeting if action is not for meeting', () => {
    const meetings = [{id: 'meeting'}];
    const newState = meeting(initialState, {
      type: 'INVALID_ACTION',
      payload: meetings});

    expect(newState.meetings).toEqual([]);
  });

  it('should not add meeting discussion item if action is not to add meeting discussion item', () => {
    const meetingDiscussionItems = [{id: 'meeting-discussion-item'}];
    const newState = meeting(initialState, {
      type: 'INVALID_ACTION',
      payload: meetingDiscussionItems});

    expect(newState.meetingDiscussionItems).toEqual([]);
  });

  it('should provide default fields when undefined is passed', () => {
    const newState = meeting(undefined, {
      type: ActionTypes.ADD_FEEDBACK_SESSIONS,
      payload: [{id: 'payload'}],
    });

    expect(newState).toEqual({
        meetingDiscussionItems: [],
        meetings: [],
      });
  });
});
