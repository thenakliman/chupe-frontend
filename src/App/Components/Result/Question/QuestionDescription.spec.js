/* eslint-disable */
import {QuestionDescription} from './QuestionDescription';
import React from 'react';
/* eslint-enable */
import {shallow} from 'enzyme';

describe('Question description', () => {
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
      const wrapper = shallow(<QuestionDescription summary = {summary}/>);
      expect(wrapper.find('#question-summary').props().children).toBe(summary);
  });

  it('should show question owner', () => {
      const owner = 'fake user';
      const wrapper = shallow(<QuestionDescription owner = {owner}/>);
      expect(wrapper.find('#question-owner').props().children
          ).toEqual(['Asked By: ', owner]);
  });

  it('should show question assigned to', () => {
      const assignedTo = 'fake user';
      const wrapper = shallow(<QuestionDescription assignedTo = {assignedTo}/>);
      expect(wrapper.find('#question-assigned-to').props().children
          ).toEqual(['Assigned To: ', assignedTo]);
  });

  it('should show question status', () => {
      const status = 'OPEN';
      const wrapper = shallow(<QuestionDescription status = {status}/>);
      expect(wrapper.find('#question-status').props().children
          ).toEqual(['Status: ', status]);
  });

  it('should show question priority', () => {
      const priority = 'LOW';
      const wrapper = shallow(<QuestionDescription priority = {priority}/>);
      expect(wrapper.find('#question-priority').props().children
          ).toEqual(['Priority: ', priority]);
  });
});
