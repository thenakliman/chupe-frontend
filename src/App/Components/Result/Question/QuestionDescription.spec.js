/* eslint-disable */
import {QuestionDescription} from './QuestionDescription';
import React from 'react';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Question description', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <QuestionDescription
              id={2}
              summary='some summary'
              owner='owner-2'
              assignedTo='assigned-to'
              status='my-status'
              priority='some priority'
              />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

  it('should have a question description div', () => {
      const wrapper = shallow(<QuestionDescription />);
      expect(wrapper.find('#question-description').length).toBe(1);
  });

  it('should have a question summary div with given text', () => {
      const summary = 'question summary';
      const wrapper = shallow(<QuestionDescription summary = {summary}/>);
      expect(wrapper.find('#question-summary').length).toBe(1);
  });

  it('should have a question summary', () => {
      const summary = 'question summary';
      const wrapper = shallow(<QuestionDescription summary = {summary}
                                                   id={10}/>);
      expect(wrapper.find('#question-summary').props().children
        ).toEqual(['#', 10, ' ', summary]);
  });

  it('should show question owner', () => {
      const owner = 'fake user';
      const wrapper = shallow(<QuestionDescription owner = {owner}/>);
      expect(wrapper.find('#question-summary-asked-by').props().children
          ).toEqual(owner);
  });

  it('should show question assigned to', () => {
      const assignedTo = 'fake user';
      const wrapper = shallow(<QuestionDescription assignedTo = {assignedTo}/>);
      expect(wrapper.find('#question-summary-assigned-to').props().children
          ).toEqual(assignedTo);
  });

  it('should show question status', () => {
      const status = 'OPEN';
      const wrapper = shallow(<QuestionDescription status = {status}/>);
      expect(wrapper.find('#question-summary-status').props().children
          ).toEqual(status);
  });

  it('should show question priority', () => {
      const priority = 'LOW';
      const wrapper = shallow(<QuestionDescription priority = {priority}/>);
      expect(wrapper.find('#question-summary-priority').props().children
          ).toEqual(priority);
  });
});
