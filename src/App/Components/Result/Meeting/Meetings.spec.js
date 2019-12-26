/* eslint-disable */
import React from 'react';
import {Meetings} from './Meetings';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as History from '../../../utils/history';


const meetings = [{
  id: 10101,
  subject: 'retro - 1',
}, {
  id: 10102,
  subject: 'retro - 2',
}];

describe('Show meetings component', () => {
  it('should call getAllMeetings on component did mount ', () => {
    const getAllMeetings = jest.fn();
    shallow(
        <Meetings
            meetings={meetings}
            getAllMeetings={getAllMeetings}
        />
    );

    expect(getAllMeetings).toHaveBeenCalledWith();
  });

  it('should have rows for each meetings', () => {
    const getAllMeetings = jest.fn();
    const wrapper = shallow(
        <Meetings
            meetings={meetings}
            getAllMeetings={getAllMeetings}
        />
    );

    expect(wrapper.find('tr').length).toBe(3);
  });

  it('should have input field for meeting create', () => {
    const getAllMeetings = jest.fn();
    const wrapper = shallow(
        <Meetings
            meetings={meetings}
            getAllMeetings={getAllMeetings}
        />
    );

    expect(wrapper.find('input').length).toBe(1);
  });

  it('should have input field for session create', () => {
    const getAllMeetings = jest.fn();
    const wrapper = shallow(
        <Meetings
            meetings={meetings}
            getAllMeetings={getAllMeetings}
        />
    );

    expect(wrapper.find('#meeting-button-id').length).toBe(1);
  });

  describe('should match snapshot', () => {
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('should have initial state with empty string', () => {
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
    />);

    expect(wrapper.state().subject).toEqual('');
  });

  describe('should change internal state of the component', () => {
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
    />);

    const subject = 'some subject';
    wrapper.find('#meeting-input-id')
        .simulate('change', {target: {value: subject}});

    expect(wrapper.state().subject).toEqual(subject);
  });

  describe('should change internal state of the component on change', () => {
    const createMeeting = jest.fn();
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
        createMeeting={createMeeting}
    />);

    const subject = 'some subject';
    wrapper.find('#meeting-input-id')
        .simulate('change', {target: {value: subject}});

    wrapper.find('#meeting-button-id').simulate('click');

    expect(createMeeting)
        .toHaveBeenCalledWith(subject);
  });

  describe('should push new route to history', () => {
    const createMeeting = jest.fn();
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
        createMeeting={createMeeting}
    />);
    History.history.push = jest.fn();

    wrapper.find('#meeting-10101').simulate('click');
    expect(History.history.push).toHaveBeenCalledWith('/meeting/10101');
  });

  describe('should change state to empty string on create of session', () => {
    const createMeeting = jest.fn();
    const wrapper = shallow(<Meetings
        meetings={meetings}
        getAllMeetings={jest.fn()}
        createMeeting={createMeeting}
    />);

    const subject = 'some subject';
    wrapper.find('#meeting-input-id')
        .simulate('change', {target: {value: subject}});

    wrapper.find('#meeting-button-id').simulate('click');

    expect(wrapper.state().subject).toBe('');
  });
});
