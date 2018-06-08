import {ActionTypes} from './ActionTypes';
import {QuestionService} from '../Services/QuestionService';
import {changeCurrentView} from './currentViewActions';
import {RESULT_COMPONENTS} from '../Components/constants';


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
    dispatch(changeCurrentView(RESULT_COMPONENTS.QUESTION_COMPONENT));
  } catch (error) {
    dispatch(updateLoaderStatus(false));
  }
};

export const updateQuestion = (questions, newQuestion) => async (dispatch) => {
  try {
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
    dispatch(updateLoaderStatus(false));
  }
};
