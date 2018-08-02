/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import ReactDOM from 'react-dom';
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
const username='logged-in-user';

describe('Show Question component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <ShowQuestion
              users={users}
              questions={questions}
              updateQuestion={()=>{}}
              match={{params: {id: 2}}}
              loggedInUser={username}
              getAnswers={()=>{}}
              answers={[]}
              addAnswer={()=>{}}
              getAllUsers={()=>{}}
              getAllQuestions={()=>{}}
        />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});


describe('Show question component', () => {
  it('should have QuestionAnswerWrapper for question summary', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          match={{params: {id: 2}}}
          loggedInUser={username}
          getAnswers={()=>{}}
          answers={[]}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
    );

    const summaryWrapper = wrapper.find('#question-answer-summary-wrapper-id');
    expect(summaryWrapper.length).toEqual(1);
    expect(summaryWrapper.get(0).props.headerText
        ).toEqual('Asked By owner-2 to assigned-2');

    expect(summaryWrapper.get(0).props.bodyText).toEqual('question2');
  });

  it('should have QuestionDescription for question summary', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          questions={questions}
          match={{params: {id: 2}}}
          answers={[]}
          loggedInUser={username}
          getAnswers={()=>{}}
          addAnswer={()=>{}}
          updateQuestion={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
    );

    const summaryWrapper = wrapper.find('QuestionDescription');
    expect(summaryWrapper.length).toEqual(1);
    expect(summaryWrapper.props()).toEqual({
        summary: 'question2',
        owner: 'owner-2',
        priority: 'LOW',
        status: 'OPEN',
        assignedTo: 'assigned-2',
        id: 2,
      });
  });

  it('should have QuestionAnswerWrapper for question description', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          match={{params: {id: 2}}}
          loggedInUser={username}
          getAnswers={()=>{}}getAllUsers
          answers={[]}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
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
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          loggedInUser={username}
          getAnswers={()=>{}}
          answers={[]}
          addAnswer={()=>{}}getAllUsers
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
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
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}getAllUsers
          loggedInUser={username}
          getAnswers={()=>{}}
          answers={[]}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
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
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          answers={[]}
          match={{params: {id: 2}}}
          loggedInUser={username}
          getAnswers={()=>{}}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
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
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          match={{params: {id: 2}}}
          getAnswers={()=>{}}
          loggedInUser={username}
          answers={[]}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
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
          questions={questions}
          updateQuestion={mockedUpdateQuestion}
          users={users}
          getAnswers={()=>{}}
          answers={[]}
          match={{params: {id: 2}}}
          loggedInUser={username}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
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

  it('should QuestionAnswerWrapper for each answer', () => {
    const mockedGetAnswers = jest.fn();
    const questionId = 2;
    const answers = [{id: 1, answer: 'ans-1'}, {id: 20, answer: 'ans-2'}];
    const wrapper = shallow(
        <ShowQuestion
          questions={questions}
          users={users}
          getAnswers={mockedGetAnswers}
          answers={answers}
          match={{params: {id: questionId}}}
          loggedInUser={username}
          updateQuestion={()=>{}}
          addAnswer={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
    );
    expect(wrapper.find('#show-question--answer-1-id').length).toEqual(1);
    expect(wrapper.find('#show-question--answer-20-id').length).toEqual(1);
  });

  it('should have a temporary question answer wrapper', () => {
    const questionId = 2;
    const wrapper = shallow(
        <ShowQuestion
          questions={questions}
          users={users}
          getAnswers={()=>{}}
          answers={[]}
          match={{params: {id: questionId}}}
          loggedInUser={username}
          addAnswer={()=>{}}
          updateQuestion={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
    );

    expect(wrapper.find('#show-question-answer--temporary-id').length)
        .toEqual(1);
  });

  it('should have a temporary question answer wrapper in editing mode', () => {
    const questionId = 2;
    const wrapper = shallow(
        <ShowQuestion
          questions={questions}
          users={users}
          getAnswers={()=>{}}
          answers={[]}
          match={{params: {id: questionId}}}
          loggedInUser={username}
          updateQuestion={()=>{}}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
          addAnswer={()=>{}}
        />
    );
    expect(
      wrapper.find('#show-question-answer--temporary-id')
        .get(0).props.isEditing
    ).toEqual(true);
  });

  it('should call add answer on click of save on temporary', () => {
    const questionId = 2;
    const answer = 'answer 1';
    const mockAddAnswer = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          questions={questions}
          users={users}
          getAnswers={()=>{}}
          answers={[]}
          match={{params: {id: questionId}}}
          loggedInUser={username}
          updateQuestion={()=>{}}
          addAnswer={mockAddAnswer}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
        />
    );
    wrapper.find(
      '#show-question-answer--temporary-id').get(0).props.saveHandler(answer);
    expect(mockAddAnswer).toHaveBeenCalledWith({
      answer: 'answer 1',
      answeredBy: username,
      questionId: 2});
  });

  describe('on mount', () => {
    it('should call getAnswers on mount of question', () => {
      const mockedGetAnswers = jest.fn();
      const questionId = 2;
      shallow(
          <ShowQuestion
            questions={questions}
            users={users}
            getAnswers={mockedGetAnswers}
            answers={[]}
            match={{params: {id: questionId}}}
            loggedInUser={username}
            updateQuestion={()=>{}}
            addAnswer={()=>{}}
            getAllUsers={()=>{}}
            getAllQuestions={()=>{}}
          />
      );

      expect(mockedGetAnswers).toHaveBeenCalledWith(questionId);
    });

    it('should not call get all questions when questions is in redux', () => {
      const mockGetAllQuestions = jest.fn();
      shallow(<ShowQuestion questions={questions}
                            users={users}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 10}}}
                            loggedInUser={username}
                            updateQuestion={()=>{}}
                            addAnswer={()=>{}}
                            getAllUsers={()=>{}}
                            getAllQuestions={mockGetAllQuestions}/>);

      expect(mockGetAllQuestions).not.toHaveBeenCalled();
    });

    it('should call get all questions when questions are not in redux', () => {
      const mockGetAllQuestions = jest.fn();
      shallow(<ShowQuestion questions={[]}
                            users={users}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 10}}}
                            loggedInUser={username}
                            updateQuestion={()=>{}}
                            addAnswer={()=>{}}
                            getAllUsers={()=>{}}
                            getAllQuestions={mockGetAllQuestions}/>);

      expect(mockGetAllQuestions).toHaveBeenCalledWith();
    });

    it('should call get all users when users are not in redux', () => {
      const mockGetAllUsers = jest.fn();
      shallow(<ShowQuestion questions={[]}
                            users={[]}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 10}}}
                            updateQuestion={()=>{}}
                            addAnswer={()=>{}}
                            getAllQuestions={()=>{}}
                            loggedInUser={username}
                            getAllUsers={mockGetAllUsers}/>);

      expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it('should not call get all users when users are in redux', () => {
      const mockGetAllUsers = jest.fn();
      shallow(<ShowQuestion questions={[]}
                            users={users}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 10}}}
                            updateQuestion={()=>{}}
                            addAnswer={()=>{}}
                            getAllQuestions={()=>{}}
                            loggedInUser={username}
                            getAllUsers={mockGetAllUsers} />);

      expect(mockGetAllUsers).not.toHaveBeenCalled();
    });
  });

  it('should set state on component update', () => {
    const node = document.createElement('div');
    const component = ReactDOM.render(<ShowQuestion questions={[]}
                                                    users={[]}
                                                    getAnswers={()=>{}}
                                                    answers={[]}
                                                    loggedInUser={username}
                                                    match={{params: {id: 1}}}
                                                    updateQuestion={()=>{}}
                                                    addAnswer={()=>{}}
                                                    getAllQuestions={()=>{}}
                                                    getAllUsers={()=>{}} />,
                                       node);

    ReactDOM.render(<ShowQuestion questions={questions}
                                  users={users}
                                  getAnswers={()=>{}}
                                  answers={[]}
                                  match={{params: {id: 1}}}
                                  loggedInUser={username}
                                  updateQuestion={()=>{}}
                                  addAnswer={()=>{}}
                                  getAllQuestions={()=>{}}
                                  getAllUsers={()=>{}} />,
                     node);

    expect(component.state).toEqual(questions[0]);
  });
});
