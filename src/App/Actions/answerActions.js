import {AnswerService} from '../Services/AnswerService';
import {ActionTypes} from './ActionTypes';


const addAnswers = (answers) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: answers,
});

export const getAnswers = (questionId) => async (dispatch) => {
  try {
    const answers = await AnswerService.getAnswers(questionId);
    // todo(thenakliman): Move below statement out of try catch block
    dispatch(addAnswers(answers));
  } catch (error) {
    console.log('Error on fetching users');
  }
};
