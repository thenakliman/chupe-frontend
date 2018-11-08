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

const updateAnswerAction = (answer) => ({
  type: ActionTypes.UPDATE_ANSWER,
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

export const updateAnswer = (answerId, answerDetail) => async (dispatch) => {
  try {
    const answer = await AnswerService.updateAnswer(answerId, answerDetail);
    // todo(thenakliman): Move below statement out of try catch block
    dispatch(updateAnswerAction(answer));
  } catch (error) {
    console.log('Error on updating answer');
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
