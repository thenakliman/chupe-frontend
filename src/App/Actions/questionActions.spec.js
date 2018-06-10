import {addQuestions} from './questionActions';
import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {getAllQuestions} from './questionActions';
import {askQuestion,
        updateLoaderStatus,
        updateQuestion} from './questionActions';
import {QuestionService} from '../Services/QuestionService';
import thunk from 'redux-thunk';

describe('SHOW QUESTIONS action', () => {
  it('Should return ADD_QUESTIONS action with question payload', () => {
    const testQuestions = [{'question': 'Who am i?'}];
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

describe('Update loader status for asking question', () => {
  it('Should return Update loader action', () => {
    const loaderVisibility = true;
    const action = updateLoaderStatus(loaderVisibility);
    expect(action.type).toEqual(ActionTypes.UPDATE_LOADER_STATUS);
    expect(action.payload).toEqual(loaderVisibility);
  });
});

describe('ASK_QUESTIONS action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });


  it('Should dispatch action for asking questions', async () => {
    const testQuestion = {'question': 'My Question'};
    spyOn(QuestionService, 'askQuestion').and.returnValues(testQuestion);
    await store.dispatch(askQuestion(testQuestion));
    expect(QuestionService.askQuestion).toHaveBeenCalledWith(testQuestion);
    expect(store.getActions()).toEqual([
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: true,
      },
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: false,
      },
    ]);
  });
  it('Should dispatch update loader status even on failure', async () => {
    const testQuestion = {'question': 'My Question'};
    spyOn(QuestionService, 'askQuestion').and.throwError(10);
    spyOn(console, 'log');
    await store.dispatch(askQuestion(testQuestion));
    expect(QuestionService.askQuestion).toHaveBeenCalledWith(testQuestion);
    expect(store.getActions()).toEqual([
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: true,
      },
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: false,
      },
    ]);

    expect(console.log).toHaveBeenCalledWith('Error in asking question');
  });
  it('Should dispatch update loader status on failure', async () => {
    const testQuestion = {'question': 'My Question'};
    spyOn(QuestionService, 'updateQuestion').and.throwError(10);
    await store.dispatch(updateQuestion([], testQuestion));
    expect(QuestionService.updateQuestion).toHaveBeenCalledWith(testQuestion);
    expect(store.getActions()).toEqual([
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: true,
      },
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: false,
      },
    ]);
  });
  it('Should dispatch update loader and addQuestions', async () => {
    const questions = [{id: 2, q: 10}, {id: 1, q: 20}];
    const testQuestion = {id: 1, q: 30};
    spyOn(QuestionService, 'updateQuestion').and.returnValues(undefined);
    await store.dispatch(updateQuestion(questions, testQuestion));
    expect(QuestionService.updateQuestion).toHaveBeenCalledWith(testQuestion);
    expect(store.getActions()).toEqual([
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: true,
      },
      {
          type: ActionTypes.ADD_QUESTIONS,
          payload: [questions[0], testQuestion],
      },
      {
          type: ActionTypes.UPDATE_LOADER_STATUS,
          payload: false,
      },
    ]);
  });
});
