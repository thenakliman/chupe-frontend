import {getAllFeedbackSessions} from './feedbackSessionActions';
import configureStore from 'redux-mock-store';
import {ActionTypes} from './ActionTypes';
import {FeedbackService} from '../Services/FeedbackService';
import thunk from 'redux-thunk';

describe('Get_RETROS action', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('Should dispatch action for fetching feedback sessions', async () => {
    const testFeedbackSessions = [{'name': 'fakeTask'}];
    spyOn(FeedbackService, 'getAllFeedbackSessions')
        .and.returnValues(testFeedbackSessions);

    await store.dispatch(getAllFeedbackSessions());
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_FEEDBACK_SESSIONS,
        payload: testFeedbackSessions,
      },
    ]);
    expect(FeedbackService.getAllFeedbackSessions).toHaveBeenCalledWith();
  });

  it('Should show error message if failed to add feedback', async () => {
    spyOn(console, 'log');
    spyOn(FeedbackService, 'getAllFeedbackSessions').and.throwError('failed ');

    await store.dispatch(getAllFeedbackSessions());

    expect(FeedbackService.getAllFeedbackSessions).toHaveBeenCalledWith();
    expect(console.log)
        .toHaveBeenCalledWith('Error on fetching feedback sessions');
  });
});
