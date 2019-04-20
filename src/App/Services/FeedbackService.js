import {get, post} from './client';

const FEEDBACK_SESSION_URL='/api/v1/feedback-sessions';
const FEEDBACK_POINTS_URL='/api/v1/feedback-points';

export const FeedbackService = {
  getAllFeedbackSessions() {
      return get(FEEDBACK_SESSION_URL);
  },

  saveFeedbackSession(feedbackSession) {
      return post(FEEDBACK_SESSION_URL, feedbackSession);
  },

  getAllFeedbacks(feedbackSessionId) {
      return get(`${FEEDBACK_POINTS_URL}?feedbackSessionId=${feedbackSessionId}`);
  },
};
