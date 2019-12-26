import {ActionTypes} from '../Actions/ActionTypes';

export const meeting = (state, action) => {
  if (state === undefined) {
    return {
      meetings: [],
      meetingDiscussionItems: [],
    };
  }

  switch (action.type) {
    case ActionTypes.ADD_MEETINGS:
      return {...state, meetings: [...action.payload]};
    case ActionTypes.ADD_MEETING_DISCUSSION_ITEMS:
      return {...state, meetingDiscussionItems: [...action.payload]};
    default:
      return {...state};
  }
};
