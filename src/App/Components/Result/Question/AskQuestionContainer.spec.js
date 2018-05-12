import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import AskQuestionContainer from './AskQuestionContainer';
/* eslint-enable */
import {AskQuestion} from './AskQuestion';
import configureStore from 'redux-mock-store';
import * as QuestionActions from '../../../Actions/questionActions';


describe('Question Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
        'users': {
            'usersData': [{'userName': 'user1'}, {'userName': 'user2'}],
        },
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should askQuestion be called on click', () => {
    const question = {'question': 'how'};
    spyOn(QuestionActions, 'askQuestion').and.returnValue({});

    const container = mount(
      <Provider store={store}>
        <AskQuestionContainer/>
      </Provider>);

    const props = container.find(AskQuestion).props();
    props.askQuestion(question);
    expect(store.dispatch).toHaveBeenCalledWith({});
  });

  it('should dispatch change view on submit on click', () => {
    spyOn(QuestionActions, 'askQuestion').and.returnValue({});

    const container = mount(
      <Provider store={store}>
        <AskQuestionContainer/>
      </Provider>);

    const props = container.find(AskQuestion).props();
    props.askQuestion();
    expect(store.dispatch).toHaveBeenCalledWith({});
  });

  it('should return all users called on component mount', () => {
    spyOn(QuestionActions, 'getAllQuestions');
    const container = mount(
      <Provider store={store}>
        <AskQuestionContainer/>
      </Provider>);

    expect(container.find(AskQuestion).props().users)
        .toEqual(initialState.users.usersData);
  });
});
