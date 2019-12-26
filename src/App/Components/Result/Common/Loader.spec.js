import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import Loader from './Loader';
/* eslint-enable */
import configureStore from 'redux-mock-store';


describe('Loader container', () => {
  it('should show loader when loader ids exist', () => {
    const store = configureStore()({loaders: ['LOADER-ID-1']});
    spyOn(store, 'dispatch');

    const container = mount(
        <Provider store={store}>
          <Loader/>
        </Provider>);

    expect(container.find('.loader-container').length).toBe(1);
    expect(container.find('.loader').length).toBe(1);
  });

  it('should show loader when loader ids are more than one exist', () => {
    const store = configureStore()({loaders: ['LOADER-ID-1', 'LOADER-ID-2']});
    spyOn(store, 'dispatch');

    const container = mount(
        <Provider store={store}>
          <Loader/>
        </Provider>);

    expect(container.find('.loader-container').length).toBe(1);
    expect(container.find('.loader').length).toBe(1);
  });

  it('should not show loader when loader ids does not exist', () => {
    const store = configureStore()({loaders: []});
    spyOn(store, 'dispatch');

    const container = mount(
        <Provider store={store}>
          <Loader/>
        </Provider>);

    expect(container.find('.loader-container').length).toBe(0);
    expect(container.find('.loader').length).toBe(0);
  });
});
