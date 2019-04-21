import {ActionTypes} from './ActionTypes';
import {FeedbackService} from '../Services/FeedbackService';


const addFeedbackSessions = (feedbackSessions) => ({
  type: ActionTypes.ADD_FEEDBACK_SESSIONS,
  payload: feedbackSessions,
});

const addFeedbacks = (feedbacks) => ({
  type: ActionTypes.ADD_FEEDBACKS,
  payload: feedbacks,
});


export const getAllFeedbackSessions = () => async (dispatch) => {
  try {
    const feedbackSessions = await FeedbackService.getAllFeedbackSessions();
    dispatch(addFeedbackSessions(feedbackSessions));
  } catch (error) {
    console.log('Error on fetching feedback sessions');
  }
};

export const getAllFeedbacks = (feedbackSessionId) => async (dispatch) => {
  try {
    const feedbacks = await FeedbackService.getAllFeedbacks(feedbackSessionId);
    dispatch(addFeedbacks(feedbacks));
  } catch (error) {
    console.log('Error on fetching feedbacks');
  }
};

export const createFeedbackSession = (feedbackSession) => async (dispatch) => {
  try {
    await FeedbackService.saveFeedbackSession(feedbackSession);

    dispatch(getAllFeedbackSessions());
  } catch (error) {
    console.log('Error on creating feedback sessions');
  }
};
