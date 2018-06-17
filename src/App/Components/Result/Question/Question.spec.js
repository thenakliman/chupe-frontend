import React from 'react'; // eslint-disable-line no-unused-vars
import {Question} from './Question'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import * as History from './../../../utils/history';

describe('List Questions', () => {
  it('should have a button', () => {
    const wrapper = shallow(
        <Question
            questions={[{}]}
            getQuestions={()=>{}}
            loggedInUser=''
        />);
    expect(wrapper.find('#ask-question-button').length).toEqual(1);
  });

  it('should have a asked by me button', () => {
    const wrapper = shallow(
        <Question
            questions={[{}]}
            getQuestions={()=>{}}
            loggedInUser='user1'
        />);
    expect(wrapper.find('#asked-by-me-question-button').length).toEqual(1);
  });

  it('should have a show all question button', () => {
    const wrapper = shallow(
        <Question
            questions={[{}]}
            getQuestions={()=>{}}
            loggedInUser='user1'
        />);
    expect(wrapper.find('#show-all-question-button').length).toEqual(1);
  });

  it('should have a asked to me button', () => {
    const wrapper = shallow(
        <Question
            questions={[{}]}
            getQuestions={()=>{}}
            loggedInUser='user1'
        />);
    expect(wrapper.find('#asked-to-me-question-button').length).toEqual(1);
  });

  it('should have initial state contains default filter', () => {
    const questions = [
        {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
        {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
      ];
      const wrapper = shallow(
          <Question
              questions={questions}
              getQuestions={()=>{}}
              loggedInUser='user1'
          />);

      expect(wrapper.state()).toEqual({filter: null});
  });

  it('should filter based on owner field', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
      {id: 3, question: 'how?', owner: 'user1', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUser='user1'
        />);

    expect(wrapper.find('#asked-by-me-question-button').simulate('click'));
    expect(wrapper.find('tbody').props().children.length)
            .toEqual(2);
  });

  it('should filter based on assigned  field', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
      {id: 3, question: 'how?', owner: 'user1', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUser='assignedUser2'
        />);

    expect(wrapper.find('#asked-to-me-question-button').simulate('click'));
    expect(wrapper.find('tbody').props().children.length)
            .toEqual(2);
  });

  it('should reset filter on show all question', () => {
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
      {id: 3, question: 'how?', owner: 'user1', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            getQuestions={()=>{}}
            loggedInUser='assignedUser2'
        />);

    wrapper.setState({filter: {owner: 'assignedUser2'}});
    expect(wrapper.find('#show-all-question-button').simulate('click'));
    expect(wrapper.state()).toEqual({filter: null});
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
            loggedInUser=''
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
            loggedInUser=''
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
            loggedInUser=''
        />);
    expect(getQuestions).toHaveBeenCalledWith();
  });

  it('should reset filter state on mount of component', () => {
    const getQuestions = jest.fn();
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    shallow(
        <Question
            questions={questions}
            getQuestions={getQuestions}
            loggedInUser=''
        />);
    expect(getQuestions).toHaveBeenCalledWith();
  });
});
