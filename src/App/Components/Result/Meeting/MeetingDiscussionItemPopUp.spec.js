/* eslint-disable */
import React from 'react';
import {MeetingDiscussionItemPopUp} from './MeetingDiscussionItemPopUp';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


const users = [{
  userName: 'user - 1',
}, {
  userName: 'user - 2',
}];

describe('Show meeting discussion item pop up component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have default discussion item empty string', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    expect(wrapper.state().discussionItem).toEqual('');
  });

  it('should have default users empty string', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    expect(wrapper.state().discussionItemType).toEqual('');
  });

  it('should set state to newly changed description', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    wrapper.find('textarea').simulate('change',
        {target: {value: 'description-value'}});

    expect(wrapper.state().discussionItem).toEqual('description-value');
  });

  it('should have option for each user and default for select', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    expect(wrapper.find('#select-assigned-to').find('option').length).toBe(3);
  });

  it('should set user on change of user select', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    wrapper.find('#select-assigned-to').simulate('change', {target: {value: 'user-1'}});

    expect(wrapper.state().assignedTo).toBe('user-1');
  });


  it('should have two option for discussion item type', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    expect(wrapper.find('#select-discussion-item-type').find('option').length).toBe(3);
  });

  it('should set discussion item type on change of type select', () => {
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

    wrapper.find('#select-discussion-item-type').simulate('change', {target: {value: 'ACTION_ITEM'}});

    expect(wrapper.state().discussionItemType).toBe('ACTION_ITEM');
  });

  it('should call on submit button', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={onSubmit}
            onCancel={jest.fn()}
        />);

    wrapper.setState({discussionItem: 'fake', discussionItemType: 'user'});

    wrapper.find('#meeting-discussion-item-submit-button').simulate('click');
    expect(onSubmit).toHaveBeenCalledWith({
      discussionItem: 'fake',
      discussionItemType: 'user',
      assignedTo: '',
    });
  });

  it('should call on cancel button', () => {
    const onCancel = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItemPopUp
            users={users}
            onSubmit={jest.fn()}
            onCancel={onCancel}
        />);

    const feedback = {
      discussionItem: 'fake',
      discussionItemType: 'user-1',
    };

    wrapper.setState(feedback);

    wrapper.find('#meeting-discussion-item-cancel-button').simulate('click');
    expect(onCancel).toHaveBeenCalledWith();
  });
});
