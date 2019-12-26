import {createFeedback, createFeedbackSession, getAllFeedbacks, getAllFeedbackSessions} from './feedbackActions';

import configureStore from 'redux-mock-store';
import {FeedbackService} from '../Services/FeedbackService';
import thunk from 'redux-thunk';

describe('Feedback action', () => {
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
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            name: 'fakeTask',
          },
        ],
        type: 'ADD_FEEDBACK_SESSIONS',
      },
      {
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
    expect(FeedbackService.getAllFeedbackSessions).toHaveBeenCalledWith();
  });

  it('Should show error message if failed to add feedback sessions', async () => {
    spyOn(FeedbackService, 'getAllFeedbackSessions').and.throwError('failed ');

    await store.dispatch(getAllFeedbackSessions());

    expect(FeedbackService.getAllFeedbackSessions).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_FEEDBACK_SESSION_NOTIFICATION_ID',
          message: 'Unable to fetch feedback sessions. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should dispatch action for create feedback sessions', async () => {
    const testFeedbackSession = {'name': 'fakeTask'};
    spyOn(FeedbackService, 'saveFeedbackSession');
    spyOn(FeedbackService, 'getAllFeedbackSessions')
        .and.returnValues(testFeedbackSession);

    await store.dispatch(createFeedbackSession(testFeedbackSession));
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_FEEDBACK_SESSION_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CREATE_FEEDBACK_SESSION_LOADER_ID',
        type: 'HIDE_LOADER',
      },
      {
        payload: {
          name: 'fakeTask',
        },
        type: 'ADD_FEEDBACK_SESSIONS',
      },
      {
        payload: 'GET_FEEDBACK_SESSION_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);

    expect(FeedbackService.saveFeedbackSession)
        .toHaveBeenCalledWith(testFeedbackSession);
  });

  it('Should show error message if failed to create feedback', async () => {
    spyOn(console, 'log');
    spyOn(FeedbackService, 'saveFeedbackSession').and.throwError('failed ');
    const testFeedbackSession = {'name': 'fakeTask'};

    await store.dispatch(createFeedbackSession(testFeedbackSession));

    expect(FeedbackService.saveFeedbackSession)
        .toHaveBeenCalledWith(testFeedbackSession);
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_FEEDBACK_SESSION_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'CREATE_FEEDBACK_SESSION_NOTIFICATION_ID',
          message: 'Unable to create feedback sessions. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'CREATE_FEEDBACK_SESSION_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should dispatch action for fetching feedbacks', async () => {
    const feedbacks = [{id: 10}];
    const sessionId = 101;
    spyOn(FeedbackService, 'getAllFeedbacks').and.returnValues(feedbacks);

    await store.dispatch(getAllFeedbacks(sessionId));
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_FEEDBACK_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            id: 10,
          },
        ],
        type: 'ADD_FEEDBACKS',
      },
      {
        payload: 'GET_FEEDBACK_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);

    expect(FeedbackService.getAllFeedbacks).toHaveBeenCalledWith(sessionId);
  });

  it('Should show error message if failed to fetch feedback', async () => {
    spyOn(FeedbackService, 'getAllFeedbacks').and.throwError('failed ');
    const sessionId = 101;

    await store.dispatch(getAllFeedbacks(sessionId));

    expect(FeedbackService.getAllFeedbacks).toHaveBeenCalledWith(sessionId);
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_FEEDBACK_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_FEEDBACK_NOTIFICATION_ID',
          message: 'Unable to fetch feedback. Please try after sometime.',
          type: 'ERROR',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_FEEDBACK_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should dispatch action for create feedbacks', async () => {
    const feedback = {id: 10};
    spyOn(FeedbackService, 'saveFeedback').and.returnValues(feedback);

    await store.dispatch(createFeedback(feedback));
    expect(store.getActions()).toEqual([
      {
        payload: 'CREATE_FEEDBACK_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: 'CREATE_FEEDBACK_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);

    expect(FeedbackService.saveFeedback).toHaveBeenCalledWith(feedback);
  });

  it('Should dispatch action for notification when create feedback fails', async () => {
    spyOn(FeedbackService, 'saveFeedback').and.throwError('failed ');
    const feedback = {id: 10};
    await store.dispatch(createFeedback(feedback));

    expect(FeedbackService.saveFeedback).toHaveBeenCalledWith(feedback);
    expect(store.getActions()).toEqual([{
      payload: 'CREATE_FEEDBACK_LOADER_ID',
      type: 'SHOW_LOADER',
    }, {
      payload: {
        id: 'CREATE_FEEDBACK_NOTIFICATION_ID',
        message: 'Unable to create feedback. Please try after sometime.',
        type: 'ERROR'
      },
      type: 'SHOW_NOTIFICATION',
    }, {
      payload: 'CREATE_FEEDBACK_LOADER_ID',
      type: 'HIDE_LOADER',
    }]);
  });
});
