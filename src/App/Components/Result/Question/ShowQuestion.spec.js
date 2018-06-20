/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const questions = [{
    question: 'question1',
    id: 1,
    description: 'test-description1',
    owner: 'owner-1',
    assignedTo: 'assigned-1',
  },
  {
    question: 'question2',
    id: 2,
    description: 'test-description2',
    owner: 'owner-2',
    assignedTo: 'assigned-2',
  }];

const users = [{'userName': 'user1'}, {'userName': 'user2'}];

describe('Show Question component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <ShowQuestion
              users={users}
              isEditing={false}
              questions={questions}
              setEditingQuestion={()=>{}}
              updateQuestion={()=>{}}
              match={{params: {id: 2}}}
        />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});


describe('Show question component', () => {
  it('should have QuestionAnswerWrapper for question summary', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={false}
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()}
          match={{params: {id: 2}}}
        />
    );

    const summaryWrapper = wrapper.find('#question-answer-summary-wrapper-id');
    expect(summaryWrapper.length).toEqual(1);
    expect(summaryWrapper.get(0).props.headerText
        ).toEqual('Asked By owner-2 to assigned-2');

    expect(summaryWrapper.get(0).props.bodyText).toEqual('question2');
  });

  it('should have QuestionAnswerWrapper for question description', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={false}
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()}
          match={{params: {id: 2}}}
        />
    );

    const summaryWrapper = wrapper.find(
      '#question-answer-description-wrapper-id');

    expect(summaryWrapper.length).toEqual(1);
    expect(summaryWrapper.get(0).props.headerText
        ).toEqual('Description Added by owner-2');

    expect(summaryWrapper.get(0).props.bodyText).toEqual('test-description2');
  });

  it('Component should have required questions properties', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );
    expect(wrapper.state()).toEqual({
      id: 2,
      question: 'question2',
      description: 'test-description2',
      owner: 'owner-2',
      assignedTo: 'assigned-2',
    });
  });

  it('Component should call update question on summary change', () => {
    const mockedUpdateQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );

    wrapper.find('#question-answer-summary-wrapper-id')
          .get(0).props.saveHandler('test question');

    expect(mockedUpdateQuestion).toHaveBeenCalledWith(
        questions, {
          id: 2,
          question: 'test question',
          description: 'test-description2',
          owner: 'owner-2',
          assignedTo: 'assigned-2',
       });
  });

  it('Component should not call update question on summary change', () => {
    const mockedUpdateQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );

    wrapper.find('#question-answer-summary-wrapper-id')
        .get(0).props.saveHandler('');

    expect(mockedUpdateQuestion).not.toHaveBeenCalledWith(
        questions, {
          id: 2,
          question: '',
          description: 'test-description2',
          owner: 'owner-2',
          assignedTo: 'assigned-2',
       });
  });

  it('Component should call update question on description change', () => {
    const mockedUpdateQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );
    const description = 'test-10';

    wrapper.find('#question-answer-description-wrapper-id')
        .get(0).props.saveHandler(description);

    expect(mockedUpdateQuestion).toHaveBeenCalledWith(
        questions, {
          id: 2,
          question: 'question2',
          description: description,
          owner: 'owner-2',
          assignedTo: 'assigned-2',
       });
  });
  it('Component should not call update method on empty description', () => {
    const mockedUpdateQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );
    wrapper.find('#question-answer-description-wrapper-id')
        .get(0).props.saveHandler('');

    expect(mockedUpdateQuestion).not.toHaveBeenCalledWith(
        questions, {
          id: 2,
          question: 'question2',
          description: '',
          owner: 'owner-2',
          assignedTo: 'assigned-2',
       });
  });
});
