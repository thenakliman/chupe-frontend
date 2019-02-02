import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {shallow} from 'enzyme';
import RetroContainer from './RetroContainer';
/* eslint-enable */
import {Retro} from './Retro';
import configureStore from 'redux-mock-store';
import * as RetroActions from '../../../Actions/retroActions';

describe('Question Result container', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
        retro: {retros: [{'userName': 'user1'}, {'userName': 'user2'}]},
    };

    store = configureStore()(initialState);
    spyOn(store, 'dispatch');
  });

  it('should have retros in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getAllRetros').and.returnValue(fakeAction);

    const container = mount(
      <Provider store={store}>
        <RetroContainer/>
      </Provider>);

    const props = container.find(Retro).props();
    expect(props.retros).toEqual(initialState.retro.retros);
  });

  it('should have getAllRetros in props', () => {
    const fakeAction = 'fake - action';
    spyOn(RetroActions, 'getAllRetros').and.returnValue(fakeAction);

    const container = mount(
      <Provider store={store}>
        <RetroContainer/>
      </Provider>);

    container.find(Retro).props();
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction);
  });
});
