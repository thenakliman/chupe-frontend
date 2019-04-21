/* eslint-disable */
import React from 'react';
import {Feedbacks} from './Feedbacks';
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
        />
    );

    expect(wrapper.find('tr').length).toBe(3);
  });
});
