import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {AnswerService} from '../Services/AnswerService';
import {getAnswers, addAnswer, updateAnswer} from './answerActions';

describe('should create answer actions', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('should dispatch fetch answer action', async () => {
    const questionId = 101;
    const answers = [{id: 1011}, {id: 1012}];
    spyOn(AnswerService, 'getAnswers').and.returnValues(answers);

    await store.dispatch(getAnswers(questionId));

    expect(AnswerService.getAnswers).toHaveBeenCalledWith(questionId);
    expect(store.getActions()).toEqual([{
      type: 'ADD_ANSWERS',
      payload: answers,
    }]);
  });

  it('Should show error message if failed to get Answer', async () => {
    const questionId = 1011;
    spyOn(console, 'log');
    spyOn(AnswerService, 'getAnswers').and.throwError('failed');
    await store.dispatch(getAnswers(questionId));
    expect(AnswerService.getAnswers).toHaveBeenCalledWith(questionId);
    expect(console.log).toHaveBeenCalledWith('Error on fetching users');
  });

  it('should dispatch add answer action', async () => {
    const answer = {id: 1011};
    spyOn(AnswerService, 'addAnswer').and.returnValues(answer);

    await store.dispatch(addAnswer(answer));

    expect(AnswerService.addAnswer).toHaveBeenCalledWith(answer);
    expect(store.getActions()).toEqual([{
      type: 'ADD_ANSWER',
      payload: answer,
    }]);
  });

  it('Should show error message if failed to add Answer', async () => {
    spyOn(console, 'log');
    spyOn(AnswerService, 'addAnswer').and.throwError('failed');
    const answer = {id: 1011};

    await store.dispatch(addAnswer(answer));

    expect(AnswerService.addAnswer).toHaveBeenCalledWith(answer);
    expect(console.log).toHaveBeenCalledWith('Error on fetching users');
  });

  it('should dispatch update answer action', async () => {
    const answerId = 1033;
    const answer = {id: answerId};
    spyOn(AnswerService, 'updateAnswer').and.returnValues(answer);

    await store.dispatch(updateAnswer(answerId, answer));

    expect(AnswerService.updateAnswer).toHaveBeenCalledWith(answerId, answer);

    expect(store.getActions()).toEqual([{
      type: 'UPDATE_ANSWER',
      payload: answer,
    }]);
  });

  it('Should show error message if failed to add Answer', async () => {
    spyOn(console, 'log');
    spyOn(AnswerService, 'updateAnswer').and.throwError('failed');
    const answerId = 1011;
    const answer = {id: answerId};

    await store.dispatch(updateAnswer(answerId, answer));

    expect(AnswerService.updateAnswer).toHaveBeenCalledWith(answerId, answer);
    expect(console.log).toHaveBeenCalledWith('Error on updating answer');
  });
});
