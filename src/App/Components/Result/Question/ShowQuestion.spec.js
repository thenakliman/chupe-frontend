/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {STATUS, PRIORITY} from './constants';

const questions = [{
    question: 'question1',
    id: 1,
    description: 'test-description1',
    owner: 'owner-1',
    assignedTo: 'assigned-1',
    status: STATUS.OPEN,
    priority: PRIORITY.HIGH,
  },
  {
    question: 'question2',
    id: 2,
    description: 'test-description2',
    owner: 'owner-2',
    assignedTo: 'assigned-2',
    status: STATUS.CLOSE,
    priority: PRIORITY.MEDIUM,
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
              updateAnswer={()=>{}}
        />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});


describe('Show question component', () => {
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
          updateAnswer={()=>{}}
        />
    );

    const summaryWrapper = wrapper.find('QuestionDescription');
    expect(summaryWrapper.length).toEqual(1);
    expect(summaryWrapper.props().summary).toEqual('question2');
    expect(summaryWrapper.props().owner).toEqual('owner-2');
    expect(summaryWrapper.props().priority).toEqual('MEDIUM');
    expect(summaryWrapper.props().status).toEqual('CLOSE');
    expect(summaryWrapper.props().assignedTo).toEqual('assigned-2');
    expect(summaryWrapper.props().id).toEqual(2);
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
          updateAnswer={()=>{}}
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
          updateAnswer={()=>{}}
        />
    );
    expect(wrapper.state()).toEqual({
      id: 2,
      question: 'question2',
      description: 'test-description2',
      owner: 'owner-2',
      assignedTo: 'assigned-2',
      status: 'CLOSE',
      priority: 'MEDIUM',
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
          updateAnswer={()=>{}}
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
          status: STATUS.CLOSE,
          priority: PRIORITY.MEDIUM,
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
          updateAnswer={()=>{}}
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
          status: STATUS.OPEN,
          priority: PRIORITY.LOW,
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
          updateAnswer={()=>{}}
        />
    );
    expect(wrapper.find('#show-question--answer-1-id').length).toEqual(1);
    expect(wrapper.find('#show-question--answer-20-id').length).toEqual(1);
  });

  it('should call updateAnswer on click of edit question', () => {
    const mockedGetAnswers = jest.fn();
    const updateAnswer = jest.fn();
    const questionId = 2;
    const answeredBy = 'lal_singh';
    const id = 1;
    const answers = [{
      id: id,
      answer: 'ans-1',
      answeredBy: answeredBy,
      questionId: questionId,
    }];

    const wrapper = mount(
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
          updateAnswer={updateAnswer}
        />
    );

    const newAnswer = 'new answer';
    wrapper.instance().handleAnswerDescription(id, newAnswer);

    expect(updateAnswer).toHaveBeenCalledWith(id, {
      id: id,
      answer: newAnswer,
      questionId: questionId,
      answeredBy: answeredBy});
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
          updateAnswer={()=>{}}
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
          updateAnswer={()=>{}}
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
          users={users}assignedTo
          getAnswers={()=>{}}
          answers={[]}
          match={{params: {id: questionId}}}
          loggedInUser={username}
          updateQuestion={()=>{}}
          addAnswer={mockAddAnswer}
          getAllUsers={()=>{}}
          getAllQuestions={()=>{}}
          updateAnswer={()=>{}}
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
            updateAnswer={()=>{}}
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
                            updateAnswer={()=>{}}
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
                            updateAnswer={()=>{}}
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
                            updateAnswer={()=>{}}
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
                            updateAnswer={()=>{}}
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
                                                    updateAnswer={()=>{}}
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
                                  updateAnswer={()=>{}}
                                  getAllUsers={()=>{}} />,
                     node);

    expect(component.state).toEqual(questions[0]);
  });

  it('should call method to update question with given priority', () => {
      const updateQuestion = jest.fn();
      const wrapper = mount(<ShowQuestion questions={questions}
                            users={[]}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 1}}}
                            updateQuestion={updateQuestion}
                            addAnswer={()=>{}}
                            getAllQuestions={()=>{}}
                            loggedInUser={username}
                            updateAnswer={()=>{}}
                            getAllUsers={()=>{}}/>);

      const priority = 'LOW';
      wrapper.find('#question-summary-priority')
        .simulate('change', {target: {value: priority}});

      expect(updateQuestion).toHaveBeenCalledWith(
        questions,
        Object.assign({}, questions[0], {priority: priority}));
  });

  it('should call method to update question with given status', () => {
      const updateQuestion = jest.fn();
      const wrapper = mount(<ShowQuestion questions={questions}
                            users={[]}
                            getAnswers={()=>{}}
                            answers={[]}
                            match={{params: {id: 1}}}
                            updateQuestion={updateQuestion}
                            addAnswer={()=>{}}
                            getAllQuestions={()=>{}}
                            loggedInUser={username}
                            updateAnswer={()=>{}}
                            getAllUsers={()=>{}}/>);

      const status = 'OPEN';
      wrapper.find('#question-summary-status')
        .simulate('change', {target: {value: status}});

      expect(updateQuestion).toHaveBeenCalledWith(
        questions,
        Object.assign({}, questions[0], {status: status}));
  });
});
