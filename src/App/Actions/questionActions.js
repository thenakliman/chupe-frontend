import {ActionTypes} from './ActionTypes';
import {QuestionService} from '../Services/QuestionService';
import {history} from '../utils/history';
import {showLoader, hideLoader} from './loaderActions';
import {showNotification} from './notificationActions';

import {
  ASK_QUESTION_LOADER_ID,
  UPDATE_QUESTION_LOADER_ID,
  GET_QUESTIONS_LOADER_ID,
  ASK_QUESTION_NOTIFICATION,
  GET_QUESTIONS_NOTIFICATION,
  UPDATE_QUESTION_NOTIFICATION,
  } from '../Components/Result/Common/constants';



export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
});

export const updateLoaderStatus = (loaderStatus) => ({
  type: ActionTypes.UPDATE_LOADER_STATUS,
  payload: loaderStatus,
});

export const getAllQuestions = () => async (dispatch) => {
  try {
    dispatch(showLoader(GET_QUESTIONS_LOADER_ID));
    const questions = await QuestionService.getQuestions();
    dispatch(addQuestions(questions));
  } catch (error) {
    dispatch(showNotification(
      GET_QUESTIONS_NOTIFICATION.id,
      GET_QUESTIONS_NOTIFICATION.type,
      GET_QUESTIONS_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_QUESTIONS_LOADER_ID));
};

export const askQuestion = (question) => async (dispatch) => {
  try {
    dispatch(showLoader(ASK_QUESTION_LOADER_ID));
    dispatch(updateLoaderStatus(true));
    await QuestionService.askQuestion(question);
    // todo(thenakliman): Verify that it ok to keep this here
    history.push('/questions');
  } catch (error) {
    dispatch(showNotification(
      ASK_QUESTION_NOTIFICATION.id,
      ASK_QUESTION_NOTIFICATION.type,
      ASK_QUESTION_NOTIFICATION.message,
    ));
  } finally {
    dispatch(updateLoaderStatus(false));
  }

  dispatch(hideLoader(ASK_QUESTION_LOADER_ID));
};

export const updateQuestion = (questions, newQuestion) => async (dispatch) => {
  try {
    dispatch(showLoader(UPDATE_QUESTION_LOADER_ID));
    dispatch(updateLoaderStatus(true));
    await QuestionService.updateQuestion(newQuestion);
    const newQuestions = questions.map((question) => {
        if (question.id === newQuestion.id) {
            return Object.assign({}, newQuestion);
        } else {
            return Object.assign({}, question);
        }
    });
    dispatch(addQuestions(newQuestions));
    dispatch(updateLoaderStatus(false));
  } catch (error) {
    dispatch(showNotification(
      UPDATE_QUESTION_NOTIFICATION.id,
      UPDATE_QUESTION_NOTIFICATION.type,
      UPDATE_QUESTION_NOTIFICATION.message,
    ));
    dispatch(updateLoaderStatus(false));
  }
  dispatch(hideLoader(UPDATE_QUESTION_LOADER_ID));
};
