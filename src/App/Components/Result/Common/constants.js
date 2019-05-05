export const NotificationType = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
};

export const CREATE_FEEDBACK_LOADER_ID = 'CREATE_FEEDBACK_LOADER_ID';

export const CREATE_FEEDBACK_NOTIFICATION = {
  id: 'CREATE_FEEDBACK_NOTIFICATION_ID',
  type: NotificationType.ERROR,
  message: 'Unable to create feedback. Please try after sometime.',
};

export const CREATE_MEETING_LOADER_ID = 'CREATE_MEETING_LOADER_ID';

export const CREATE_MEETING_NOTIFICATION = {
  id: 'CREATE_MEETING_NOTIFICATION_ID',
  type: NotificationType.ERROR,
  message: 'Unable to create meeting. Please try after sometime.',
};

export const GET_MEETING_LOADER_ID = 'GET_MEETING_LOADER_ID';

export const GET_MEETING_NOTIFICATION = {
  id: 'GET_MEETING_NOTIFICATION_ID',
  type: NotificationType.ERROR,
  message: 'Unable to get meeting. Please try after sometime.',
};

export const CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID = 'CREATE_MEETING_DISCUSSION_ITEM_LOADER_ID';

export const CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION = {
  id: 'CREATE_MEETING_DISCUSSION_ITEM_NOTIFICATION_ID',
  type: NotificationType.ERROR,
  message: 'Unable to create meeting discussion item. Please try after sometime.',
};

export const GET_MEETING_DISCUSSION_ITEM_LOADER_ID = 'GET_MEETING_DISCUSSION_ITEM_LOADER_ID';

export const GET_MEETING_DISCUSSION_ITEM_NOTIFICATION = {
  id: 'GET_MEETING_DISCUSSION_ITEM_NOTIFICATION_ID',
  type: NotificationType.ERROR,
  message: 'Unable to fetch meeting discussion item. Please try after sometime.',
};
