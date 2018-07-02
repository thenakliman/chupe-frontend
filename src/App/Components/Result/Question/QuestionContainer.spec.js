import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import QuestionContainer from './QuestionContainer';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import {Question} from './Question';
import * as QuestionActions from '../../../Actions/questionActions';
import * as CookiesUtil from '../../../utils/cookies';


describe('Question Result container', () => {
  let initialState;
  let store;
  const username = 'testUser';

  beforeEach(() => {
    initialState = {
        'questions': [
          {id: 1, question: 'when?', owner: 'o1'},
          {id: 2, question: 'how?', owner: 'o2'},
        ],
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
    spyOn(CookiesUtil, 'getUsername').and.returnValue(username);
  });

  it('Should have questions property', () => {
    const container = mount(
      <Provider store={store}>
        <QuestionContainer loggedInUser={username}/>
      </Provider>);

    expect(container.find(Question).props().questions)
        .toEqual(initialState.questions);
  });

  it('Should have logged in user username property', () => {
    const container = mount(
      <Provider store={store}>
        <QuestionContainer loggedInUser={username}/>
      </Provider>);

    expect(container.find(Question).props().loggedInUser)
        .toEqual(username);
  });

  it('Should dispatch get questions', () => {
    spyOn(QuestionActions, 'getAllQuestions');
    const container = mount(
      <Provider store={store}>
        <QuestionContainer loggedInUser={username}/>
      </Provider>);

    container.find(Question).props().getQuestions();
    expect(QuestionActions.getAllQuestions).toHaveBeenCalled();
  });
});
