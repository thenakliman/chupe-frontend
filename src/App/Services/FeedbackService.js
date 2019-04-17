import {get} from './client';

const FEEDBACK_SESSION_URL='/api/v1/feedback-sessions';

export const FeedbackService = {
  getAllFeedbackSessions() {
      return get(FEEDBACK_SESSION_URL);
  },
};
