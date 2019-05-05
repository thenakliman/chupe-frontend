/* eslint-disable */
import React from 'react';
import {MeetingDiscussionItem} from './MeetingDiscussionItem';
import {MeetingDiscussionItemPopUp} from './MeetingDiscussionItemPopUp';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


const meetingDiscussionItems = [{
  id: 10101,
  subject: 'meeting - 1',
}, {
  id: 10102,
  subject: 'meeting - 2',
}];

describe('Show meeting discussion item component', () => {
  describe('should match snapshot', () => {
    const wrapper = shallow(<MeetingDiscussionItem
       match={{params: {id: 101}}}
       meetingDiscussionItems={meetingDiscussionItems}
       getMeetingDiscussionItems={jest.fn()}
       getAllUsers={jest.fn()}
       users={[]}
       createMeetingDiscussionItem={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call getMeetingDiscussionItems on component did mount ', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          getAllUsers={jest.fn()}
          users={[]}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    expect(getMeetingDiscussionItems).toHaveBeenCalledWith(meetingId);
  });

  it('should show row for each meetingDiscussionItems', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          getAllUsers={jest.fn()}
          users={[]}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    expect(wrapper.find('tr').length).toBe(3);
  });

  it('should have initial state isAddingMeetingDiscussionItem set to false', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          getAllUsers={jest.fn()}
          users={[]}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    expect(wrapper.state().isAddingMeetingDiscussionItem).toBeFalsy();
  });

  it('should call get all users on component did mount', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    const getAllUsers = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          users={[]}
          getAllUsers={getAllUsers}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    expect(getAllUsers).toHaveBeenCalledWith();
  });

  it('should set give meeting discussion item pop up to true on click of button', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    const createFeedback = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          getAllUsers={jest.fn()}
          createMeetingDiscussionItem={createFeedback}
        />
    );

    wrapper.find('#meeting-discussion-item-button').simulate('click');

    expect(wrapper.state().isAddingMeetingDiscussionItem).toBeTruthy();
  });

  it('should show give meeting discussion item pop up when isAddingMeetingDiscussionItem is true', () => {
    const getMeetingDiscussionItems = jest.fn();
    const meetingId = 101;
    const createFeedback = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={meetingDiscussionItems}
          getMeetingDiscussionItems={getMeetingDiscussionItems}
          getAllUsers={jest.fn()}
          createMeetingDiscussionItem={createFeedback}
        />
    );

    wrapper.find('#meeting-discussion-item-button').simulate('click');

    expect(wrapper.find(MeetingDiscussionItemPopUp).length).toBe(1);
  });

  it('should provide users as property to MeetingDiscussionItemPopUp', () => {
    const meetingId = 101;
    const users = [{id: 10}];
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={[]}
          users={users}
          getMeetingDiscussionItems={jest.fn()}
          getAllUsers={jest.fn()}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    wrapper.setState({isAddingMeetingDiscussionItem: true});

    expect(wrapper.find(MeetingDiscussionItemPopUp).props().users).toBe(users);
  });

  it('should change pop up on call of onCancel of MeetingDiscussionItemPopUp', () => {
    const meetingId = 101;
    const users = [{id: 10}];
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={[]}
          users={users}
          getMeetingDiscussionItems={jest.fn()}
          getAllUsers={jest.fn()}
          createMeetingDiscussionItem={jest.fn()}
        />
    );

    wrapper.setState({isAddingMeetingDiscussionItem: true});
    wrapper.find(MeetingDiscussionItemPopUp).props().onCancel();

    expect(wrapper.state().isAddingMeetingDiscussionItem).toBeFalsy();
  });

  it('should call create meeting discussion item on call of onSubmit of pop up', () => {
    const meetingId = 101;
    const users = [{id: 10}];
    const createMeetingDiscussionItem = jest.fn();
    const wrapper = shallow(
        <MeetingDiscussionItem
          match={{params: {id: meetingId}}}
          meetingDiscussionItems={[]}
          users={users}
          getMeetingDiscussionItems={jest.fn()}
          getAllUsers={jest.fn()}
          createMeetingDiscussionItem={createMeetingDiscussionItem}
        />
    );

    wrapper.setState({isAddingMeetingDiscussionItem: true});
    const meetingDiscussionItem = {
        subject: 'subject data',
    };

    wrapper.find(MeetingDiscussionItemPopUp).props().onSubmit(meetingDiscussionItem);
    expect(createMeetingDiscussionItem).toHaveBeenCalledWith(
        {...meetingDiscussionItem, meetingId: meetingId});
  });
});
