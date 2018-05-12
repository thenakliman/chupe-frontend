
import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import QuestionContainer from './QuestionContainer';
/* eslint-enable */
import configureStore from 'redux-mock-store';
import {Question} from './Question';


describe('Question Result container', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
        'questions': {
            'questionsData': [
                {id: 1, question: 'when?', owner: 'o1'},
                {id: 2, question: 'how?', owner: 'o2'}],
        },
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('Should have questions property', () => {
    const container = mount(
      <Provider store={store}>
        <QuestionContainer/>
      </Provider>);

    expect(container.find(Question).props().questions)
        .toEqual(initialState.questions.questionsData);
  });

  it('Should have questions property', () => {
    const container = mount(
      <Provider store={store}>
        <QuestionContainer/>
      </Provider>);

    container.find(Question).props().askQuestion();
    expect(store.dispatch).toHaveBeenCalledWith({
        'payload': 'ASK_QUESTION_COMPONENT',
        'type': 'CHANGE_RESULT_VIEW'});
  });
});
