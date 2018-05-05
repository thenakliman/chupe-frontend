import {addQuestions} from './questionActions';
import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {getAllQuestions} from './questionActions';
import {QuestionService} from '../Services/QuestionService';
import thunk from 'redux-thunk';

describe('SHOW QUESTIONS action', () => {
  it('Should return ADD_QUESTIONS action with question payload', () => {
    const testQuestions = [{'question': 'Who am i?'}];
    console.log(addQuestions);
    const questions = addQuestions(testQuestions);
    expect(questions.type).toEqual(ActionTypes.ADD_QUESTIONS);
    expect(questions.payload).toEqual(testQuestions);
  });
});

describe('ADD_QUESTIONS action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });


  it('Should dispatch action for fetching questions', async () => {
    const testQuestions = [{'question': 'My Question'}];
    spyOn(QuestionService, 'getQuestions').and.returnValues(testQuestions);
    await store.dispatch(getAllQuestions(testQuestions));
    expect(QuestionService.getQuestions).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_QUESTIONS,
        payload: testQuestions,
      },
    ]);
  });

  it('Should show console error on dispatch failure', async () => {
    spyOn(QuestionService, 'getQuestions').and.throwError(10);
    spyOn(console, 'log');
    await store.dispatch(getAllQuestions());
    expect(QuestionService.getQuestions).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([]);
 });
});
