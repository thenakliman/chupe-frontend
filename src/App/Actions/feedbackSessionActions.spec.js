import {
  getAllFeedbackSessions,
  getAllFeedbacks,
  createFeedbackSession} from './feedbackSessionActions';

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

  it('Should dispatch action for create feedback sessions', async () => {
    const testFeedbackSession = {'name': 'fakeTask'};
    spyOn(FeedbackService, 'saveFeedbackSession');
    spyOn(FeedbackService, 'getAllFeedbackSessions')
        .and.returnValues(testFeedbackSession);

    await store.dispatch(createFeedbackSession(testFeedbackSession));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_FEEDBACK_SESSIONS,
        payload: testFeedbackSession,
      },
    ]);

    expect(FeedbackService.saveFeedbackSession)
        .toHaveBeenCalledWith(testFeedbackSession);
  });

  it('Should show error message if failed to add feedback', async () => {
    spyOn(console, 'log');
    spyOn(FeedbackService, 'saveFeedbackSession').and.throwError('failed ');
    const testFeedbackSession = {'name': 'fakeTask'};

    await store.dispatch(createFeedbackSession(testFeedbackSession));

    expect(FeedbackService.saveFeedbackSession)
            .toHaveBeenCalledWith(testFeedbackSession);

    expect(console.log)
        .toHaveBeenCalledWith('Error on creating feedback sessions');
  });
  it('Should dispatch action for fetching feedbacks', async () => {
    const feedbacks = [{id: 10}];
    const sessionId = 101;
    spyOn(FeedbackService, 'getAllFeedbacks').and.returnValues(feedbacks);

    await store.dispatch(getAllFeedbacks(sessionId));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.ADD_FEEDBACKS,
        payload: feedbacks,
      },
    ]);
    expect(FeedbackService.getAllFeedbacks).toHaveBeenCalledWith(sessionId);
  });

  it('Should show error message if failed to add feedback', async () => {
    spyOn(console, 'log');
    spyOn(FeedbackService, 'getAllFeedbacks').and.throwError('failed ');
    const sessionId = 101;

    await store.dispatch(getAllFeedbacks(sessionId));

    expect(FeedbackService.getAllFeedbacks).toHaveBeenCalledWith(sessionId);
    expect(console.log)
        .toHaveBeenCalledWith('Error on fetching feedbacks');
  });
});
