import React from 'react'; // eslint-disable-line no-unused-vars
import {Question} from './Question'; // eslint-disable-line no-unused-vars
import {shallow, mount} from 'enzyme';
import * as History from './../../../utils/history';

describe('List Questions', () => {
  it('should have a button', () => {
    const wrapper = shallow(
        <Question
            questions={[{}]}
            getQuestions={()=>{}}
            loggedInUsername=''
        />);
    expect(wrapper.find('#ask-question-button').length).toEqual(1);
  });

  it('should have a questions', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUsername=''
        />);

    expect(wrapper.find('#all-question-ordered-list').props().children.length)
            .toEqual(2);
  });

  it('should redirect to ask question', () => {
    History.history = {push: jest.fn()};
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUsername=''
        />);

    expect(wrapper.find('#ask-question-button').simulate('click'));
    expect(History.history.push).toHaveBeenCalledWith('/question/ask');
  });

  it('should call show question', () => {
    History.history = {push: jest.fn()};

    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUsername=''
        />);

    expect(wrapper.find('#view-question-button-2').simulate('click'));
    expect(History.history.push).toHaveBeenCalledWith('/question/2/view');
  });

  it('should call get questions on component mount', () => {
    const getQuestions = jest.fn();
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    shallow(
        <Question
            questions={questions}
            getQuestions={getQuestions}
            loggedInUsername=''
        />);
    expect(getQuestions).toHaveBeenCalledWith();
  });

  it('should set all questions to questions on state in constructor', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    const container = mount(
        <Question
            loggedInUsername='user1'
            questions={questions}
            getQuestions={()=>{}}
        />);
    expect(container.state().questions).toEqual(questions);
  });

  it('should set state of questions having given owner', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
      {id: 3, question: 'okay?', owner: 'user1', assignedTo: 'assignedUser3'},
    ];
    const container = mount(
        <Question
            loggedInUsername='user1'
            questions={questions}
            getQuestions={()=>{}}
        />);
    container.find('#show-owner-question-button-id').simulate('click');
    expect(container.find('#all-questions-table-id')
        .get(0).props.children.length).toEqual(2);
  });
});
