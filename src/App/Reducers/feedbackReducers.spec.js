import {feedback} from './feedbackReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Feedback Reducer', () => {
  const initialState = {
    feedbackSessions: [],
    feedbacks: [],
  };

  it('should add feedbacks to redux', () => {
    const feedbacks = [{id: 'feedbacks'}];
    const newState = feedback(initialState, {
      type: ActionTypes.ADD_FEEDBACKS,
      payload: feedbacks
    });

    expect(newState.feedbacks).toEqual(feedbacks);
  });

  it('should add feedback Sessions to redux', () => {
    const feedbackSessions = [{id: 'feedback-sessions'}];
    const newState = feedback(initialState, {
      type: ActionTypes.ADD_FEEDBACK_SESSIONS,
      payload: feedbackSessions
    });

    expect(newState.feedbackSessions).toEqual(feedbackSessions);
  });

  it('should not add session if action is not for feedback sessions', () => {
    const feedbackSessions = [{id: 'feedback-sessions'}];
    const newState = feedback(initialState, {
      type: 'INVALID_ACTION',
      payload: feedbackSessions
    });

    expect(newState.feedbackSessions).toEqual([]);
  });

  it('should not add feedbacks if action is not add feedback sessions', () => {
    const feedbackSessions = [{id: 'feedback-sessions'}];
    const newState = feedback(initialState, {
      type: 'INVALID_ACTION',
      payload: feedbackSessions
    });

    expect(newState.feedbacks).toEqual([]);
  });

  it('should provide default fields when undefined is passed', () => {
    const newState = feedback(undefined, {
      type: ActionTypes.ADD_FEEDBACK_SESSIONS,
      payload: [{id: 'payload'}],
    });

    expect(newState).toEqual({
      feedbackSessions: [],
      feedbacks: [],
    });
  });
});
