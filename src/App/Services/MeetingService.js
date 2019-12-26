import {get, post} from './client';

const MEETINGS_URL = '/api/v1/meetings';
const MEETINGS_DISCUSSION_ITEM_URL = '/api/v1/meeting-discussion-items';

export const MeetingService = {
  getMeetings() {
    return get(MEETINGS_URL);
  },

  saveMeeting(meeting) {
    return post(MEETINGS_URL, meeting, {'Content-Type': 'text/plain'});
  },

  getMeetingDiscussionItems(meetingId) {
    return get(
        `${MEETINGS_DISCUSSION_ITEM_URL}?meetingId=${meetingId}`);
  },

  saveMeetingDiscussionItem(meetingDiscussionItem) {
    return post(MEETINGS_DISCUSSION_ITEM_URL, meetingDiscussionItem);
  },
};
