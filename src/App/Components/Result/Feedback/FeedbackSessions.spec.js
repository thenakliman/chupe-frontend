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
});
