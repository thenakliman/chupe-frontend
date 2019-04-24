import {ActionTypes} from './ActionTypes';
import {FeedbackService} from '../Services/FeedbackService';
import {showLoader, hideLoader} from './loaderActions';
import {showNotification} from './notificationActions';
import {
  CREATE_FEEDBACK_LOADER_ID,
  CREATE_FEEDBACK_NOTIFICATION} from '../Components/Result/Common/constants';

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

export const createFeedback = (feedback) => async (dispatch) => {
  dispatch(showLoader(CREATE_FEEDBACK_LOADER_ID));
  try {
    await FeedbackService.saveFeedback(feedback);
  } catch (error) {
      dispatch(showNotification(
          CREATE_FEEDBACK_NOTIFICATION.id,
          CREATE_FEEDBACK_NOTIFICATION.type,
          CREATE_FEEDBACK_NOTIFICATION.message
      ));
  }
  dispatch(hideLoader(CREATE_FEEDBACK_LOADER_ID));
};
