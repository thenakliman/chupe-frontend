/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import {mapStateToProps, mapDispatchToProps} from './ShowQuestionContainer';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import * as questionActions from '../../../Actions/questionActions';
import * as answerActions from '../../../Actions/answerActions';


describe('Question Result container', () => {
  let initialState;
  let store;

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

  it('should dispatch an set updateQuestion on click of edit button', () => {
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
});
