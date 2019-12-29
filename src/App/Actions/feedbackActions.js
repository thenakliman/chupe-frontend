import {ActionTypes} from './ActionTypes';
import {FeedbackService} from '../Services/FeedbackService';
import {hideLoader, showLoader} from './loaderActions';
import {showNotification} from './notificationActions';
import {
  CREATE_FEEDBACK_LOADER_ID,
  CREATE_FEEDBACK_NOTIFICATION,
  CREATE_FEEDBACK_SESSION_LOADER_ID,
  CREATE_FEEDBACK_SESSION_NOTIFICATION,
  GET_FEEDBACK_LOADER_ID,
  GET_FEEDBACK_NOTIFICATION,
  GET_FEEDBACK_SESSION_LOADER_ID,
  GET_FEEDBACK_SESSION_NOTIFICATION,
} from '../Components/Result/Common/constants';

const addFeedbackSessions = (feedbackSessions) => ({
  type: ActionTypes.ADD_FEEDBACK_SESSIONS,
  payload: feedbackSessions,
});

const addFeedbacks = (feedbacks) => ({
  type: ActionTypes.ADD_FEEDBACKS,
  payload: feedbacks,
});


export const getAllFeedbackSessions = () => async (dispatch) => {
  dispatch(showLoader(GET_FEEDBACK_SESSION_LOADER_ID));
  try {
    const feedbackSessions = await FeedbackService.getAllFeedbackSessions();
    dispatch(addFeedbackSessions(feedbackSessions));
  } catch (error) {
    dispatch(showNotification(
        GET_FEEDBACK_SESSION_NOTIFICATION.id,
        GET_FEEDBACK_SESSION_NOTIFICATION.type,
        GET_FEEDBACK_SESSION_NOTIFICATION.message
    ));
  }
  dispatch(hideLoader(GET_FEEDBACK_SESSION_LOADER_ID));
};

export const getAllFeedbacks = (feedbackSessionId) => async (dispatch) => {
  dispatch(showLoader(GET_FEEDBACK_LOADER_ID));
  try {
    const feedbacks = await FeedbackService.getAllFeedbacks(feedbackSessionId);
    dispatch(addFeedbacks(feedbacks));
  } catch (error) {
    dispatch(showNotification(
        GET_FEEDBACK_NOTIFICATION.id,
        GET_FEEDBACK_NOTIFICATION.type,
        GET_FEEDBACK_NOTIFICATION.message
    ));
  }
  dispatch(hideLoader(GET_FEEDBACK_LOADER_ID));
};

export const createFeedbackSession = (feedbackSession) => async (dispatch) => {
  dispatch(showLoader(CREATE_FEEDBACK_SESSION_LOADER_ID));
  try {
    await FeedbackService.saveFeedbackSession(feedbackSession);
    dispatch(getAllFeedbackSessions());
  } catch (error) {
    dispatch(showNotification(
        CREATE_FEEDBACK_SESSION_NOTIFICATION.id,
        CREATE_FEEDBACK_SESSION_NOTIFICATION.type,
        CREATE_FEEDBACK_SESSION_NOTIFICATION.message
    ));
  }
  dispatch(hideLoader(CREATE_FEEDBACK_SESSION_LOADER_ID));
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
