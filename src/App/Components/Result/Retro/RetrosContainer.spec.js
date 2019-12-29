import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import RetrosContainer, {mapDispatchToProps} from './RetrosContainer';
/* eslint-enable */
import {Retros} from './Retros';
import configureStore from 'redux-mock-store';
import * as RetroActions from '../../../Actions/retroActions';
import * as PracticeAssessmentActions from '../../../Actions/bestPracticesActions';


describe('Question Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      retro: {
        retros: [{'userName': 'user1'}, {'userName': 'user2'}],
        practicesAssessment: [{bestPracticeId: 1, answer: true}]
      },
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have retros in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getAllRetros').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <RetrosContainer/>
        </Provider>);

    const props = container.find(Retros).props();
    expect(props.retros).toEqual(initialState.retro.retros);
  });

  it('should have practicesAssessment in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getAllRetros').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <RetrosContainer/>
        </Provider>);

    const props = container.find(Retros).props();
    expect(props.practicesAssessment).toEqual(initialState.retro.practicesAssessment);
  });

  it('should have getAllRetros in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getAllRetros').and.returnValue(fakeAction);

    const container = mount(
        <Provider store={store}>
          <RetrosContainer/>
        </Provider>);

    container.find(Retros).props();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should have createRetro in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'createRetro').and.returnValue(fakeAction);
    const dispatch = jest.fn();

    const props = mapDispatchToProps(dispatch);

    const retro = {name: 'test-retro'};
    props.createRetro(retro);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });

  it('should have getPracticesAssessment in props', () => {
    const fakeAction = 'fake - action';
    spyOn(PracticeAssessmentActions, 'getPracticesAssessment').and.returnValue(fakeAction);
    const dispatch = jest.fn();

    const props = mapDispatchToProps(dispatch);

    const retro = {name: 'test-retro'};
    props.getPracticesAssessment(retro);
    expect(dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
