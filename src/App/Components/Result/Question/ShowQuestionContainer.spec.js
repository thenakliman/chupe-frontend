/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import {mapStateToProps, mapDispatchToProps} from './ShowQuestionContainer';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import * as questionActions from '../../../Actions/questionActions';
import * as answerActions from '../../../Actions/answerActions';
import * as UserActions from '../../../Actions/userActions';
import * as Cookies from '../../../utils/cookies';

describe('Question Result container', () => {
  let initialState;
  let store;
  const username = 'fakeloggedinuser';

  beforeEach(() => {
    initialState = {
        questions: [{
          id: 10,
          question: 'when?',
          owner: 'o1',
          assignedTo: 'at',
          description: 'd1',
          }],
        users: [{'userName': 'user1'}, {'userName': 'user2'}],
        currentView: {
            currentQuestion: 10,
            isEditingQuestion: false,
        },
        answers: null,
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
    spyOn(Cookies, 'getUsername').and.returnValue(username);
  });

  it('Should have users property', () => {
      const props = mapStateToProps(initialState);
      expect(props.users).toEqual(initialState.users);
  });

  it('Should have questions property', () => {
      const props = mapStateToProps(initialState);
      expect(props.questions).toEqual(initialState.questions);
  });

  it('Should have answers property', () => {
      const props = mapStateToProps(initialState);
      expect(props.answers).toEqual(null);
  });

  it('Should have loggedInUser property', () => {
      const props = mapStateToProps(initialState);
      expect(props.loggedInUser).toEqual(username);
  });

  it('should dispatch set updateQuestion on click of edit button', () => {
      const fakeAction = 'fakeAction';
      spyOn(questionActions, 'updateQuestion').and.returnValue(fakeAction);
      const props = mapDispatchToProps(store.dispatch);
      props.updateQuestion('arg1', 'arg2');
      expect(questionActions.updateQuestion)
          .toHaveBeenCalledWith('arg1', 'arg2');
      expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should dispatch an get answers on mount', () => {
      const fakeAction = 'fakeAction';
      spyOn(answerActions, 'getAnswers').and.returnValue(fakeAction);
      const questionId = 1101;
      const props = mapDispatchToProps(store.dispatch);
      props.getAnswers(questionId);

      expect(answerActions.getAnswers).toHaveBeenCalledWith(questionId);
      expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should dispatch an get answers on mount', () => {
      const fakeAction = 'fakeAction';
      spyOn(answerActions, 'addAnswer').and.returnValue(fakeAction);
      const props = mapDispatchToProps(store.dispatch);
      const question = {id: 10};

      props.addAnswer(question);

      expect(answerActions.addAnswer).toHaveBeenCalledWith(question);
      expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should call get all questions', () => {
      const fakeAction = 'fakeAction';
      spyOn(questionActions, 'getAllQuestions').and.returnValue(fakeAction);
      const props = mapDispatchToProps(store.dispatch);

      props.getAllQuestions();

      expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should call get all users', () => {
      const fakeAction = 'fakeAction';
      spyOn(UserActions, 'getAllUsers').and.returnValue(fakeAction);
      const props = mapDispatchToProps(store.dispatch);

      props.getAllUsers();

      expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
