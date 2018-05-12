import React from 'react'; // eslint-disable-line no-unused-vars
import {Question} from './Question'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';

describe('List Questions', () => {
  it('should have a button', () => {
    const wrapper = shallow(<Question questions={[{}]} askQuestion={()=>{}}/>);
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
            askQuestion={()=>{}}
        />);

    expect(wrapper.find('#all-question-ordered-list').props().children.length)
            .toEqual(2);
  });

  it('should call ask question', () => {
    const askQuestion = jest.fn();
    const questions = [
      {id: 1, question: 'when?', owner: 'user1', assignedTo: 'assignedUser1'},
      {id: 2, question: 'how?', owner: 'user2', assignedTo: 'assignedUser2'},
    ];
    const wrapper = shallow(
        <Question
            questions={questions}
            askQuestion={askQuestion}
        />);

    expect(wrapper.find('#ask-question-button').simulate('click'));
    expect(askQuestion).toHaveBeenCalledWith();
  });
});
