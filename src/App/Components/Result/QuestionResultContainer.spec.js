import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import QuestionResultContainer from './QuestionResultContainer';
/* eslint-enable */
import {QuestionResult} from './QuestionResult';
import configureStore from 'redux-mock-store';
import * as QuestionActions from '../../Actions/questionActions';


describe('Question Result container', () => {
  let store;

  beforeEach(() => {
    const initialState = {};

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should askQuestion be called on click', () => {
    const question = {'question': 'how'};
    spyOn(QuestionActions, 'askQuestion').and.returnValue({});

    const container = mount(
      <Provider store={store}>
        <QuestionResultContainer/>
      </Provider>);

    const props = container.find(QuestionResult).props();
    props.askQuestion(question);
    expect(store.dispatch).toHaveBeenCalledWith({});
  });

  it('should ask questions be called on click', () => {
    spyOn(QuestionActions, 'askQuestion').and.returnValue({});

    const container = mount(
      <Provider store={store}>
        <QuestionResultContainer/>
      </Provider>);

    const props = container.find(QuestionResult).props();
    props.askQuestion();
    expect(store.dispatch).toHaveBeenCalledWith({});
  });
});