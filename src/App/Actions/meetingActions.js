import {ActionTypes} from './ActionTypes';
import {MeetingService} from '../Services/MeetingService';
import {hideLoader, showLoader} from './loaderActions';
import {showNotification} from './notificationActions';
import {
  CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID,
  CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION,
  CREATE_MEETING_LOADER_ID,
  CREATE_MEETING_NOTIFICATION,
  GET_MEETING_DISCUSSION_ITEM_LOADER_ID,
  GET_MEETING_DISCUSSION_ITEM_NOTIFICATION,
  GET_MEETING_LOADER_ID,
  GET_MEETING_NOTIFICATION,
} from '../Components/Result/Common/constants';

const addMeetings = (meetings) => ({
  type: ActionTypes.ADD_MEETINGS,
  payload: meetings,
});

const addMeetingDiscussionItems = (meetingDiscussionItems) => ({
  type: ActionTypes.ADD_MEETING_DISCUSSION_ITEMS,
  payload: meetingDiscussionItems,
});


export const getMeetings = () => async (dispatch) => {
  try {
    dispatch(showLoader(GET_MEETING_LOADER_ID));
    const meetings = await MeetingService.getMeetings();
    dispatch(addMeetings(meetings));
  } catch (error) {
    dispatch(showNotification(
        GET_MEETING_NOTIFICATION.id,
        GET_MEETING_NOTIFICATION.type,
        GET_MEETING_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_MEETING_LOADER_ID));
};

export const getMeetingDiscussionItems = (meetingId) => async (dispatch) => {
  try {
    dispatch(showLoader(GET_MEETING_DISCUSSION_ITEM_LOADER_ID));
    const meetingDiscussionItems = await MeetingService.getMeetingDiscussionItems(meetingId);
    dispatch(addMeetingDiscussionItems(meetingDiscussionItems));
  } catch (error) {
    dispatch(showNotification(
        GET_MEETING_DISCUSSION_ITEM_NOTIFICATION.id,
        GET_MEETING_DISCUSSION_ITEM_NOTIFICATION.type,
        GET_MEETING_DISCUSSION_ITEM_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_MEETING_DISCUSSION_ITEM_LOADER_ID));
};

export const createMeeting = (meeting) => async (dispatch) => {
  try {
    dispatch(showLoader(CREATE_MEETING_LOADER_ID));
    await MeetingService.saveMeeting(meeting);
    dispatch(getMeetings());
  } catch (error) {
    dispatch(showNotification(
        CREATE_MEETING_NOTIFICATION.id,
        CREATE_MEETING_NOTIFICATION.type,
        CREATE_MEETING_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(CREATE_MEETING_LOADER_ID));
};

export const createMeetingDiscussionItem = (meetingDiscussionItem) => async (dispatch) => {
  dispatch(showLoader(CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID));
  try {
    await MeetingService.saveMeetingDiscussionItem(meetingDiscussionItem);
  } catch (error) {
    dispatch(showNotification(
        CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION.id,
        CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION.type,
        CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION.message
    ));
  }
  dispatch(hideLoader(CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID));
};
