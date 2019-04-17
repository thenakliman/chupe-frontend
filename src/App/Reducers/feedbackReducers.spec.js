import {feedback} from './feedbackReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Feedback Reducer', () => {
  const initialState = {
      feedbackSessions: [],
  };

  it('should add feedbacks to redux', () => {
    const feedbackSessions = [{id: 'feedback-sessions'}];
    const newState = feedback(initialState, {
      type: ActionTypes.ADD_FEEDBACK_SESSIONS,
      payload: feedbackSessions});

    expect(newState).toEqual({feedbackSessions: feedbackSessions});
  });

  it('should not add feedbacks if action is not add feedback sessions', () => {
    const feedbackSessions = [{id: 'feedback-sessions'}];
    const newState = feedback(initialState, {
      type: 'INVALID_ACTION',
      payload: feedbackSessions});

    expect(newState).toEqual({feedbackSessions: []});
  });

  it('should provide default fields when undefined is passed', () => {
    const newState = feedback(undefined, {
      type: ActionTypes.ADD_FEEDBACK_SESSIONS,
      payload: [{id: 'payload'}],
    });

    expect(newState).toEqual({feedbackSessions: []});
  });
});
