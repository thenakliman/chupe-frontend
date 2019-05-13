import {AnswerService} from '../Services/AnswerService';
import {ActionTypes} from './ActionTypes';
import {showLoader, hideLoader} from './loaderActions';
import {showNotification} from './notificationActions';

import {
  ANSWER_LOADER_ID,
  UPDATE_ANSWER_LOADER_ID,
  GET_ANSWERS_LOADER_ID,
  ANSWER_NOTIFICATION,
  GET_ANSWERS_NOTIFICATION,
  UPDATE_ANSWER_NOTIFICATION,
  } from '../Components/Result/Common/constants';


const addAnswers = (answers) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: answers,
});

const addAnswerAction = (answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: answer,
});

const updateAnswerAction = (answer) => ({
  type: ActionTypes.UPDATE_ANSWER,
  payload: answer,
});

export const getAnswers = (questionId) => async (dispatch) => {
  dispatch(showLoader(GET_ANSWERS_LOADER_ID));
  try {
    const answers = await AnswerService.getAnswers(questionId);
    dispatch(addAnswers(answers));
  } catch (error) {
    dispatch(showNotification(
      GET_ANSWERS_NOTIFICATION.id,
      GET_ANSWERS_NOTIFICATION.type,
      GET_ANSWERS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_ANSWERS_LOADER_ID));
};

export const updateAnswer = (answerId, answerDetail) => async (dispatch) => {
  dispatch(showLoader(UPDATE_ANSWER_LOADER_ID));
  try {
    const answer = await AnswerService.updateAnswer(answerId, answerDetail);
    dispatch(updateAnswerAction(answer));
  } catch (error) {
    dispatch(showNotification(
      UPDATE_ANSWER_NOTIFICATION.id,
      UPDATE_ANSWER_NOTIFICATION.type,
      UPDATE_ANSWER_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(UPDATE_ANSWER_LOADER_ID));
};

export const addAnswer = (answer) => async (dispatch) => {
  dispatch(showLoader(ANSWER_LOADER_ID));
  try {
    const updatedAnswer = await AnswerService.addAnswer(answer);
    dispatch(addAnswerAction(updatedAnswer));
  } catch (error) {
    dispatch(showNotification(
        ANSWER_NOTIFICATION.id,
        ANSWER_NOTIFICATION.type,
        ANSWER_NOTIFICATION.message
    ));
  }
  dispatch(hideLoader(ANSWER_LOADER_ID));
};
