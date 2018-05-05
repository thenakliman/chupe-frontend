import {questions} from './questionReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Question reducer', () => {
  it('Check initial state is empty', () => {
      const nextState = questions(undefined, {type: 'FAKE_ACTION'});
      expect(nextState).toEqual({questionsData: []});
  });

  it('Check state is updated on ADD_QUESTIONS action', () => {
      const questionsData = [{'question1': 'question1Data'}];
      const addQuestionsAction = {
          type: ActionTypes.ADD_QUESTIONS,
          payload: questionsData,
      };
      const nextState = questions({'key1': 'data1'}, addQuestionsAction);
      const expectState = {'key1': 'data1', 'questionsData': questionsData};
      expect(nextState).toEqual(expectState);
  });
});
