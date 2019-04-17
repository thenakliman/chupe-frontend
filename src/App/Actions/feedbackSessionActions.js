import {ActionTypes} from './ActionTypes';
import {FeedbackService} from '../Services/FeedbackService';


const addFeedbackSessions = (feedbackSessions) => ({
  type: ActionTypes.ADD_FEEDBACK_SESSIONS,
  payload: feedbackSessions,
});


export const getAllFeedbackSessions = () => async (dispatch) => {
  try {
    const feedbackSessions = await FeedbackService.getAllFeedbackSessions();
    dispatch(addFeedbackSessions(feedbackSessions));
  } catch (error) {
    console.log('Error on fetching feedback sessions');
  }
};
