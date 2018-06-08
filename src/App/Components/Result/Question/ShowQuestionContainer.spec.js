import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import ShowQuestionContainer from './ShowQuestionContainer';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import * as questionActions from '../../../Actions/questionActions';


describe('Question Result container', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
        questions: {
            questionsData: [{
              id: 10,
              question: 'when?',
              owner: 'o1',
              assignedTo: 'at',
              description: 'd1',
              }],
        },
        users: {
          usersData: [{'userName': 'user1'}, {'userName': 'user2'}],
        },
        currentView: {
            currentQuestion: 10,
            isEditingQuestion: false,
        },
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('Should have questions property', () => {
    const container = mount(
      <Provider store={store}>
        <ShowQuestionContainer/>
      </Provider>);

    const props = container.find(ShowQuestion).props();
    expect(props.question)
      .toEqual(initialState.questions.questionsData[0].question);

    expect(props.owner)
      .toEqual(initialState.questions.questionsData[0].owner);

    expect(props.id)
      .toEqual(initialState.currentView.currentQuestion);

    expect(props.assignedTo)
      .toEqual(initialState.questions.questionsData[0].assignedTo);

    expect(props.description)
      .toEqual(initialState.questions.questionsData[0].description);

    expect(props.id)
      .toEqual(initialState.questions.questionsData[0].id);

    expect(props.isEditing)
      .toEqual(initialState.currentView.isEditingQuestion);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('Should have users property', () => {
    const container = mount(
      <Provider store={store}>
        <ShowQuestionContainer/>
      </Provider>);

    const props = container.find(ShowQuestion).props();
    expect(props.users).toEqual(initialState.users.usersData);
  });

  it('Should have questions property', () => {
    const container = mount(
      <Provider store={store}>
        <ShowQuestionContainer/>
      </Provider>);

    const props = container.find(ShowQuestion).props();
    expect(props.questions).toEqual(initialState.questions.questionsData);
  });

  it('should dispatch an set isEditingQuestion on click of edit button', () => {
    const container = mount(
      <Provider store={store}>
        <ShowQuestionContainer/>
      </Provider>);

    container.find(ShowQuestion).props().setEditingQuestion(true);
    expect(store.dispatch).toHaveBeenCalledWith({
      'payload': true,
      'type': 'SET_IS_EDITING_QUESTION',
      });
  });

  it('should dispatch actions on question update', () => {
    const container = mount(
      <Provider store={store}>
        <ShowQuestionContainer/>
      </Provider>);

    const testQuestion = {a: 1};
    spyOn(questionActions, 'updateQuestion').and.returnValue(testQuestion);

    container.find(ShowQuestion).props().updateQuestion([], {});

    expect(store.dispatch).toHaveBeenCalledWith(testQuestion);
  });
});
