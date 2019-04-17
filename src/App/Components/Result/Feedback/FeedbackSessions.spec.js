/* eslint-disable */
import React from 'react';
import {FeedbackSessions} from './FeedbackSessions';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const feedbackSessions = [{
  description: 'retro - 1',
}, {
  description: 'retro - 2',
}];

describe('Show feedback sessions component', () => {
  it('should call getAllFeedbackSessions on component did mount ', () => {
    const getAllFeedbackSessions = jest.fn();
    shallow(
        <FeedbackSessions
          feedbackSessions={feedbackSessions}
          getAllFeedbackSessions={getAllFeedbackSessions}
        />
    );

    expect(getAllFeedbackSessions).toHaveBeenCalledWith();
  });

  it('should have rows for each feedback sessions', () => {
    const getAllFeedbackSessions = jest.fn();
    const wrapper = shallow(
        <FeedbackSessions
          feedbackSessions={feedbackSessions}
          getAllFeedbackSessions={getAllFeedbackSessions}
        />
    );

    expect(wrapper.find('tr').length).toBe(3);
  });

  it('should have input field for session create', () => {
    const getAllFeedbackSessions = jest.fn();
    const wrapper = shallow(
        <FeedbackSessions
          feedbackSessions={feedbackSessions}
          getAllFeedbackSessions={getAllFeedbackSessions}
        />
    );

    expect(wrapper.find('input').length).toBe(1);
  });

  it('should have input field for session create', () => {
    const getAllFeedbackSessions = jest.fn();
    const wrapper = shallow(
        <FeedbackSessions
          feedbackSessions={feedbackSessions}
          getAllFeedbackSessions={getAllFeedbackSessions}
        />
    );

    expect(wrapper.find('#feedbackSession-button-id').length).toBe(1);
  });

  describe('should match snapshot', () => {
    const wrapper = shallow(<FeedbackSessions
       feedbackSessions={feedbackSessions}
       getAllFeedbackSessions={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('should have initial state with empty string', () => {
    const wrapper = shallow(<FeedbackSessions
       feedbackSessions={feedbackSessions}
       getAllFeedbackSessions={jest.fn()}
    />);

    expect(wrapper.state().description).toEqual('');
  });

  describe('should change internal state of the component', () => {
    const wrapper = shallow(<FeedbackSessions
       feedbackSessions={feedbackSessions}
       getAllFeedbackSessions={jest.fn()}
    />);

    const description = 'some description';
    wrapper.find('#feedbackSession-input-id')
        .simulate('change', {target: {value: description}});

    expect(wrapper.state().description).toEqual(description);
  });

  describe('should change internal state of the component', () => {
    const createFeedbackSession = jest.fn();
    const wrapper = shallow(<FeedbackSessions
       feedbackSessions={feedbackSessions}
       getAllFeedbackSessions={jest.fn()}
       createFeedbackSession={createFeedbackSession}
    />);

    const description = 'some description';
    wrapper.find('#feedbackSession-input-id')
        .simulate('change', {target: {value: description}});

    wrapper.find('#feedbackSession-button-id').simulate('click');

    expect(createFeedbackSession)
            .toHaveBeenCalledWith({description: description});
  });

  describe('should change state to empty string on create of session', () => {
    const createFeedbackSession = jest.fn();
    const wrapper = shallow(<FeedbackSessions
       feedbackSessions={feedbackSessions}
       getAllFeedbackSessions={jest.fn()}
       createFeedbackSession={createFeedbackSession}
    />);

    const description = 'some description';
    wrapper.find('#feedbackSession-input-id')
        .simulate('change', {target: {value: description}});

    wrapper.find('#feedbackSession-button-id').simulate('click');

    expect(wrapper.state().description).toBe('');
  });
});
