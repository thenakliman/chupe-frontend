import {
  getMeetings,
  getMeetingDiscussionItems,
  createMeeting,
  createMeetingDiscussionItem} from './meetingActions';

import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {MeetingService} from '../Services/MeetingService';
import thunk from 'redux-thunk';

describe('Meeting action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('Should dispatch action for fetching meeting.', async () => {
    const testMeetings = [{'name': 'fakeTask'}];
    spyOn(MeetingService, 'getMeetings')
        .and.returnValues(testMeetings);

    await store.dispatch(getMeetings());
    expect(store.getActions()).toEqual([{
       payload: 'GET_MEETING_LOADER_ID',
       type: 'SHOW_LOADER',
     }, {
       payload: [{'name': 'fakeTask'}],
       type: 'ADD_MEETINGS',
     }, {
       payload: 'GET_MEETING_LOADER_ID',
       type: 'HIDE_LOADER',
     }]);
    expect(MeetingService.getMeetings).toHaveBeenCalledWith();
  });

  it('Should show error message if failed to add meetings', async () => {
    spyOn(MeetingService, 'getMeetings').and.throwError('failed ');

    await store.dispatch(getMeetings());

    expect(MeetingService.getMeetings).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([{
         payload: 'GET_MEETING_LOADER_ID',
         type: 'SHOW_LOADER',
       }, {
         payload: {
             id: 'GET_MEETING_NOTIFICATION_ID',
             message: 'Unable to get meeting. Please try after sometime.',
             type: 'ERROR'},
         type: 'SHOW_NOTIFICATION',
       }, {
         payload: 'GET_MEETING_LOADER_ID',
          type: 'HIDE_LOADER',
     }]);
  });

  it('Should dispatch action for create meeting', async () => {
    const meeting = {'name': 'fakeTask'};
    spyOn(MeetingService, 'saveMeeting');
    spyOn(MeetingService, 'getMeetings').and.returnValues(meeting);

    await store.dispatch(createMeeting(meeting));
    expect(store.getActions()).toEqual([{
         payload: 'CREATE_MEETING_LOADER_ID',
         type: 'SHOW_LOADER',
       }, {
         payload: 'GET_MEETING_LOADER_ID',
         type: 'SHOW_LOADER',
       }, {
         payload: 'CREATE_MEETING_LOADER_ID',
         type: 'HIDE_LOADER',
       }, {
         payload: {'name': 'fakeTask'},
         type: 'ADD_MEETINGS',
       }, {
         payload: 'GET_MEETING_LOADER_ID',
         type: 'HIDE_LOADER',
   }]);

   expect(MeetingService.saveMeeting).toHaveBeenCalledWith(meeting);
  });

  it('Should show error message if failed to create meeting', async () => {
    spyOn(MeetingService, 'saveMeeting').and.throwError('failed ');
    const meeting = {'name': 'fakeTask'};

    await store.dispatch(createMeeting(meeting));

    expect(MeetingService.saveMeeting).toHaveBeenCalledWith(meeting);
    expect(store.getActions()).toEqual([{
         payload: 'CREATE_MEETING_LOADER_ID',
         type: 'SHOW_LOADER',
       }, {
       payload: {
          id: 'CREATE_MEETING_NOTIFICATION_ID',
          message: 'Unable to create meeting. Please try after sometime.',
          type: 'ERROR'},
       type: 'SHOW_NOTIFICATION',
       }, {
         payload: 'CREATE_MEETING_LOADER_ID',
         type: 'HIDE_LOADER',
       }]);
  });

  it('Should dispatch action for fetching meeting discussion items', async () => {
    const meetingDiscussionItems = [{id: 10}];
    const meetingId = 101;
    spyOn(MeetingService, 'getMeetingDiscussionItems').and.returnValues(meetingDiscussionItems);

    await store.dispatch(getMeetingDiscussionItems(meetingId));
    expect(store.getActions()).toEqual([{
       payload: 'GET_MEETING_DISCUSSION_ITEM_LOADER_ID',
       type: 'SHOW_LOADER',
     }, {
       payload: [{'id': 10}],
       type: 'ADD_MEETING_DISCUSSION_ITEMS',
     }, {
       payload: 'GET_MEETING_DISCUSSION_ITEM_LOADER_ID',
       type: 'HIDE_LOADER',
    }]);
    expect(MeetingService.getMeetingDiscussionItems).toHaveBeenCalledWith(meetingId);
  });

  it('Should show error message if failed to add meeting discussion items', async () => {
    spyOn(MeetingService, 'getMeetingDiscussionItems').and.throwError('failed ');
    const meetingId = 101;

    await store.dispatch(getMeetingDiscussionItems(meetingId));
    expect(store.getActions()).toEqual([
       {
         payload: 'GET_MEETING_DISCUSSION_ITEM_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: {
           id: 'GET_MEETING_DISCUSSION_ITEM_NOTIFICATION_ID',
           message: 'Unable to fetch meeting discussion item. Please try after sometime.',
           type: 'ERROR',
         },
         type: 'SHOW_NOTIFICATION',
       },
       {
         payload: 'GET_MEETING_DISCUSSION_ITEM_LOADER_ID',
         type: 'HIDE_LOADER',
       },
     ]);
    expect(MeetingService.getMeetingDiscussionItems).toHaveBeenCalledWith(meetingId);
  });

  it('Should dispatch action for create meeting discussion item', async () => {
    const meetingDiscussionItem = {id: 10};

    spyOn(MeetingService, 'saveMeetingDiscussionItem').and.returnValues(meetingDiscussionItem);

    await store.dispatch(createMeetingDiscussionItem(meetingDiscussionItem));

    expect(store.getActions()).toEqual([{
      payload: 'CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID',
      type: 'SHOW_LOADER',
    },
    {
      payload: 'CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID',
      type: 'HIDE_LOADER',
    }]);

    expect(MeetingService.saveMeetingDiscussionItem).toHaveBeenCalledWith(meetingDiscussionItem);
  });

  it('Should dispatch action for notification when create meeting discussion item fails', async () => {
    spyOn(MeetingService, 'saveMeetingDiscussionItem').and.throwError('failed ');
    const meetingDiscussionItem = {id: 10};
    await store.dispatch(createMeetingDiscussionItem(meetingDiscussionItem));

    expect(MeetingService.saveMeetingDiscussionItem).toHaveBeenCalledWith(meetingDiscussionItem);
    expect(store.getActions()).toEqual([
       {
         payload: 'CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID',
         type: 'SHOW_LOADER',
       },
       {
         payload: {
           id: 'CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION_ID',
           message: 'Unable to create meeting discussion item. Please try after sometime.',
           type: 'ERROR',
         },
         type: 'SHOW_NOTIFICATION',
       },
       {
         payload: 'CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID',
         type: 'HIDE_LOADER',
       },
     ]);
    });
});
