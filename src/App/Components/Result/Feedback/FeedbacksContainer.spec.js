import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import FeedbacksContainer from './FeedbacksContainer';
/* eslint-enable */
import {Feedbacks} from './Feedbacks';
import configureStore from 'redux-mock-store';
import * as FeedbackActions from '../../../Actions/feedbackActions';

describe('Feedback Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
        feedback: {feedbacks: [{id: 'feedbacks'}]},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have feedbacks in props', () => {
    const container = mount(
      <Provider store={store}>
        <FeedbacksContainer match={{params: {id: 101}}}/>
      </Provider>);

    const props = container.find(Feedbacks).props();
    expect(props.feedbacks).toEqual(initialState.feedback.feedbacks);
  });

  it('should call getAllFeedbacks', () => {
    const fakeAction = 'fake - action';
    spyOn(FeedbackActions, 'getAllFeedbacks')
        .and.returnValue(fakeAction);

    const feedbackSessionId = 101;
    const container = mount(
      <Provider store={store}>
        <FeedbacksContainer match={{params: {id: feedbackSessionId}}}/>
      </Provider>);

    container.find(Feedbacks).props().getAllFeedbacks(feedbackSessionId);
    expect(FeedbackActions.getAllFeedbacks).toHaveBeenCalledWith(101);
  });
});
