/* eslint-disable */
import React from 'react';
import {FeedbackPopUp} from './FeedbackPopUp';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


const users = [{
  userName: 'user - 1',
}, {
  userName: 'user - 2',
}];

describe('Show feedback pop up component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have default description empty string', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

    expect(wrapper.state().description).toEqual('');
  });

  it('should have default users empty string', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

    expect(wrapper.state().feedbackGivenToUser).toEqual('');
  });

  it('should set state to newly changed description', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

    wrapper.find('textarea').simulate('change',
        {target: {value: 'description-value'}});

    expect(wrapper.state().description).toEqual('description-value');
  });

  it('should have option for each user and default for select', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

    expect(wrapper.find('option').length).toBe(3);
  });

  it('should set user on change of select', () => {
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />);

     wrapper.find('select').simulate('change', {target: {value: 'user-1'}});

    expect(wrapper.state().feedbackGivenToUser) .toBe('user-1');
  });

  it('should call on submit button', () => {
    const onSubmit = jest.fn()
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={onSubmit}
        onCancel={jest.fn()}
      />);

    wrapper.setState({description: 'fake', feedbackGivenToUser: 'user'});

    wrapper.find('#feedback-submit-button').simulate('click');
    expect(onSubmit).toHaveBeenCalledWith({
        description: 'fake', givenTo: 'user'});
  });

  it('should call on cancel button', () => {
    const onCancel = jest.fn()
    const wrapper = shallow(
      <FeedbackPopUp
        users={users}
        onSubmit={jest.fn()}
        onCancel={onCancel}
      />);

    const feedback = {
      description: 'fake',
      feedbackGivenToUser: 'user-1'
    };

    wrapper.setState(feedback);

    wrapper.find('#feedback-cancel-button').simulate('click');
    expect(onCancel).toHaveBeenCalledWith();
  });
});
