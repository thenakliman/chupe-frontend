import {ActionTypes} from './ActionTypes';
import {QuestionService} from '../Services/QuestionService';


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
    const questions = await QuestionService.getQuestions();
    dispatch(addQuestions(questions));
  } catch (error) {
    console.log('Error on fetching questions');
  }
};

export const askQuestion = (question) => async (dispatch) => {
  try {
    dispatch(updateLoaderStatus(true));
    await QuestionService.askQuestion(question);
    dispatch(updateLoaderStatus(false));
  } catch (error) {
    dispatch(updateLoaderStatus(false));
  }
};
