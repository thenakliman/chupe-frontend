import {ActionTypes} from '../Actions/ActionTypes';

export const feedback = (state, action) => {
  if (state === undefined) {
    return {
      feedbackSessions: [],
      feedbacks: [],
    };
  }

  switch (action.type) {
      case ActionTypes.ADD_FEEDBACK_SESSIONS:
        return {...state, feedbackSessions: [...action.payload]};
      case ActionTypes.ADD_FEEDBACKS:
        return {...state, feedbacks: [...action.payload]};
      default:
        return {...state};
  }
};
