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
import * as UserActions from '../../../Actions/userActions';
import * as Config from '../../../utils/cookies';


describe('Question Result container', () => {
  let store;
  let initialState;
  const username = 'testUsername';

  beforeEach(() => {
    initialState = {
        'users': [{'userName': 'user1'}, {'userName': 'user2'}],
    };

    spyOn(Config, 'getUsername').and.returnValue(username);
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
        .toEqual(initialState.users);
  });

  it('should call getUsers on mount of component', () => {
    const action = 'some action';
    spyOn(UserActions, 'getAllUsers').and.returnValue(action);
    const container = mount(
      <Provider store={store}>
        <AskQuestionContainer/>
      </Provider>);

    container.find(AskQuestion).props().getAllUsers();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should provide logged in user as props', () => {
    const container = mount(
      <Provider store={store}>
        <AskQuestionContainer/>
      </Provider>);

    expect(container.find('AskQuestion').props().loggedInUser)
        .toEqual(username);
  });
});
