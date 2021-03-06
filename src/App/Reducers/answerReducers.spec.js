import {answers} from './answerReducers';

describe('AnswerReducers', () => {
  it('should return null if state is empty', () => {
    const action = {type: 'INVALID_ACTION', payload: []};
    const answer = answers(undefined, action);
    expect(answer).toEqual([]);
  });

  it('should store answers on ADD_ANSWERS action', () => {
    const testAnswers = [{id: 10}];
    const action = {type: 'ADD_ANSWERS', payload: testAnswers};
    const receivedAnswer = answers([], action);
    expect(receivedAnswer).toEqual(testAnswers);
  });

  it('should add answer to answers on ADD_ANSWER action', () => {
    const testAnswers = {id: 10};
    const storeAnswer = [{id: 11}];
    const action = {type: 'ADD_ANSWER', payload: testAnswers};
    const receivedAnswer = answers(storeAnswer, action);
    expect(receivedAnswer).toEqual([...storeAnswer, testAnswers]);
  });

  it('should update answer to answers on UPDATE_ANSWER action', () => {
    const testAnswers = {id: 10, answer: 'fake-answer'};
    const storeAnswer = [{id: 11}, {id: 10}];
    const action = {type: 'UPDATE_ANSWER', payload: testAnswers};
    const receivedAnswer = answers(storeAnswer, action);
    expect(receivedAnswer).toEqual([{id: 11}, testAnswers]);
  });
});
