/* eslint-disable */
import React from 'react';
import {Feedbacks} from './Feedbacks';
import {FeedbackPopUp} from './FeedbackPopUp';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


const feedbacks = [{
  id: 10101,
  description: 'retro - 1',
}, {
  id: 10102,
  description: 'retro - 2',
}];

describe('Show feedback component', () => {
  describe('should match snapshot', () => {
    const wrapper = shallow(<Feedbacks
        match={{params: {id: 101}}}
        feedbacks={feedbacks}
        getAllFeedbacks={jest.fn()}
        getAllUsers={jest.fn()}
        giveFeedback={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call getAllFeedbacks on component did mount ', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={jest.fn()}
            giveFeedback={jest.fn()}
        />
    );

    expect(getAllFeedbacks).toHaveBeenCalledWith(feedbackSessionId);
  });

  it('should show row for each feedbacks', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={jest.fn()}
            giveFeedback={jest.fn()}
        />
    );

    expect(wrapper.find('tr').length).toBe(3);
  });

  it('should have initial state isGivingFeedback set to false', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={jest.fn()}
            giveFeedback={jest.fn()}
        />
    );

    expect(wrapper.state().isGivingFeedback).toBeFalsy();
  });

  it('should call get all users on component did mount', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    const getAllUsers = jest.fn();
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={getAllUsers}
            giveFeedback={jest.fn()}
        />
    );

    expect(getAllUsers).toHaveBeenCalledWith();
  });

  it('should set give feedback pop up to true on click of button', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    const createFeedback = jest.fn();
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={jest.fn()}
            giveFeedback={createFeedback}
        />
    );

    wrapper.find('#give-feedback-button').simulate('click');

    expect(wrapper.state().isGivingFeedback).toBeTruthy();
  });

  it('should show give feedback pop up when isGivingFeedback is true', () => {
    const getAllFeedbacks = jest.fn();
    const feedbackSessionId = 101;
    const createFeedback = jest.fn();
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={feedbacks}
            getAllFeedbacks={getAllFeedbacks}
            getAllUsers={jest.fn()}
            giveFeedback={createFeedback}
        />
    );

    wrapper.find('#give-feedback-button').simulate('click');

    expect(wrapper.find(FeedbackPopUp).length).toBe(1);
  });

  it('should provide users as property to FeedbackPopUp', () => {
    const feedbackSessionId = 101;
    const users = [{id: 10}];
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={[]}
            users={users}
            getAllFeedbacks={jest.fn()}
            getAllUsers={jest.fn()}
            giveFeedback={jest.fn()}
        />
    );

    wrapper.setState({isGivingFeedback: true});

    expect(wrapper.find(FeedbackPopUp).props().users).toBe(users);
  });

  it('should change pop up on call of onCancel of FeedbackPopUp', () => {
    const feedbackSessionId = 101;
    const users = [{id: 10}];
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={[]}
            users={users}
            getAllFeedbacks={jest.fn()}
            getAllUsers={jest.fn()}
            giveFeedback={jest.fn()}
        />
    );

    wrapper.setState({isGivingFeedback: true});
    wrapper.find(FeedbackPopUp).props().onCancel();

    expect(wrapper.state().isGivingFeedback).toBeFalsy();
  });

  it('should call create feedback on call of onSubmit of pop up', () => {
    const feedbackSessionId = 101;
    const users = [{id: 10}];
    const giveFeedback = jest.fn();
    const wrapper = shallow(
        <Feedbacks
            match={{params: {id: feedbackSessionId}}}
            feedbacks={[]}
            users={users}
            getAllFeedbacks={jest.fn()}
            getAllUsers={jest.fn()}
            giveFeedback={giveFeedback}
        />
    );

    wrapper.setState({isGivingFeedback: true});
    const feedback = {
      description: 'description data',
      giveTo: 'user',
    };

    wrapper.find(FeedbackPopUp).props().onSubmit(feedback);
    expect(giveFeedback).toHaveBeenCalledWith(
        {...feedback, sessionId: feedbackSessionId});
  });
});
