import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {AnswerService} from '../Services/AnswerService';
import {getAnswers} from './answerActions';

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
});
