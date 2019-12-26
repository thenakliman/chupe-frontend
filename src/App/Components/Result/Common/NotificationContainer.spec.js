import {mount} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import NotificationContainer from './NotificationContainer';
import Notification from './Notification';
/* eslint-enable */
import configureStore from 'redux-mock-store';


describe('Notification container', () => {
  it('should show notification when notification ids exist', () => {
    const notifications = [{id: 'LOADER-ID-1'}];
    const store = configureStore()({notifications: notifications});
    spyOn(store, 'dispatch');

    const container = mount(
        <Provider store={store}>
          <NotificationContainer/>
        </Provider>);

    expect(container.find('Notification').props().notifications)
        .toEqual(notifications);
  });

  it('should call setTimeout', () => {
    const notifications = [{id: 'LOADER-ID-1'}];
    const store = configureStore()({notifications: notifications});
    spyOn(store, 'dispatch');
    global.setTimeout = jest.fn();

    mount(<Provider store={store}>
      <NotificationContainer/>
    </Provider>);

    expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
  });
});
