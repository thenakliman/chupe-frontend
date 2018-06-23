import {AnswerService} from '../Services/AnswerService';
import {ActionTypes} from './ActionTypes';


const addAnswers = (answers) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: answers,
});

const addAnswerAction = (answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: answer,
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

export const addAnswer = (answer) => async (dispatch) => {
  try {
    const updatedAnswer = await AnswerService.addAnswer(answer);
    // todo(thenakliman): Move below statement out of try catch block
    dispatch(addAnswerAction(updatedAnswer));
  } catch (error) {
    console.log('Error on fetching users');
  }
};
