import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import FeedbackSessionsContainer from './FeedbackSessionsContainer';
/* eslint-enable */
import {FeedbackSessions} from './FeedbackSessions';
import configureStore from 'redux-mock-store';
import * as FeedbackActions from '../../../Actions/feedbackActions';

describe('Feedback Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      feedback: {feedbackSessions: [{id: 'feedback-session'}]},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have feedback sessions in props', () => {
    const fakeAction = 'fake - action';
    spyOn(FeedbackActions, 'getAllFeedbackSessions')
        .and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <FeedbackSessionsContainer/>
        </Provider>);

    const props = container.find(FeedbackSessions).props();
    expect(props.feedbackSessions)
        .toEqual(initialState.feedback.feedbackSessions);
  });

  it('should have getAllFeedbackSessions in props', () => {
    const fakeAction = 'fake - action';
    spyOn(FeedbackActions, 'getAllFeedbackSessions')
        .and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <FeedbackSessionsContainer/>
        </Provider>);

    container.find(FeedbackSessions).props();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should call createFeedbackSession', () => {
    const fakeAction = 'fake - action';
    spyOn(FeedbackActions, 'createFeedbackSession')
        .and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <FeedbackSessionsContainer/>
        </Provider>);

    container.find('#feedbackSession-button-id').simulate('click');
    expect(FeedbackActions.createFeedbackSession)
        .toHaveBeenCalledWith({description: ''});
  });
});
