import {answers} from './answerReducers';

describe('AnswerReducers', () => {
  it('should return null if state is empty', () => {
    const action = {type: 'INVALID_ACTION', payload: []};
    const answer = answers(undefined, action);
    expect(answer).toEqual([]);
  });

  it('should store answers on ADD_ANSWER action', () => {
    const testAnswers = [{id: 10}];
    const action = {type: 'ADD_ANSWERS', payload: testAnswers};
    const receivedAnswer = answers([], action);
    expect(receivedAnswer).toEqual(testAnswers);
  });
});
