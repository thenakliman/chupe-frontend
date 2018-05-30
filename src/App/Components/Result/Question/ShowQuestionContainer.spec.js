import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import ShowQuestionContainer from './ShowQuestionContainer';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import configureStore from 'redux-mock-store';


describe('Question Result container', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
        'questions': {
            'questionsData': [{
              id: 10,
              question: 'when?',
              owner: 'o1',
              assignedTo: 'at',
              description: 'd1'}],
        },
        'currentView': {
            currentQuestion: 10,
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

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
