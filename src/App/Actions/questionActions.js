import {ActionTypes} from './ActionTypes';
import {QuestionService} from '../Services/QuestionService';


export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
});

export const getAllQuestions = () => async (dispatch) => {
  try {
    const questions = await QuestionService.getQuestions();
    dispatch(addQuestions(questions));
  } catch (error) {
    console.log('Error on fetching questions');
  }
};
