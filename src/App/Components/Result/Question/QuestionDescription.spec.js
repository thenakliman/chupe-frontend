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
      expect(wrapper.find('#question-summary-status').props().value
        ).toEqual(status);
  });

  it('should show set question priority', () => {
      const priority = 'LOW';
      const wrapper = shallow(<QuestionDescription priority = {priority}/>);
      expect(wrapper.find('#question-summary-priority').props().value
        ).toEqual(priority);
  });

  it('should show three options for select', () => {
      const priority = 'LOW';
      const wrapper = shallow(<QuestionDescription priority = {priority}/>);
      expect(wrapper.find('#question-summary-priority')
        .children().map((children) => children.text())).toEqual(
          ['Low', 'Medium', 'High']);
  });

  it('should show two options for select', () => {
      const status = 'OPEN';
      const wrapper = shallow(<QuestionDescription status = {status}/>);
      expect(wrapper.find('#question-summary-status')
        .children().map((children) => children.text())).toEqual(
          ['Open', 'Closed']);
  });

  it('should call change status method', () => {
      const status = 'OPEN';
      const targetStatus = 'CLOSE';
      const changeStatus = jest.fn();
      const wrapper = shallow(<QuestionDescription
                                status = {status}
                                changeStatus={changeStatus}/>);

      wrapper.find('#question-summary-status')
        .simulate('change', {target: {value: targetStatus}});

      expect(changeStatus).toHaveBeenCalledWith(targetStatus);
  });

  it('should call change priority method', () => {
      const priority = 'LOW';
      const targetPriority = 'HIGH';
      const changePriority = jest.fn();
      const wrapper = shallow(
          <QuestionDescription priority = {priority}
                               changePriority={changePriority}/>);

      wrapper.find('#question-summary-priority')
        .simulate('change', {target: {value: targetPriority}});
      expect(changePriority).toHaveBeenCalledWith(targetPriority);
  });
});
