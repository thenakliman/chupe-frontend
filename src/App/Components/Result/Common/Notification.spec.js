import {shallow} from 'enzyme';
/* eslint-disable */
import {Provider} from 'react-redux';
import React from 'react';
import {Notification} from './Notification';
/* eslint-enable */
import configureStore from 'redux-mock-store';


describe('Notification', () => {
  it('should not show notification when notification does not exist', () => {
    const container = shallow(<Notification notifications={[]}/>)

    expect(container.find("div").length).toBe(0);
  });

  it('should show error notification', () => {
    const notification = {
      id: 'notification-10',
      type: 'ERROR',
      message: "message - 1"
    }

    const container = shallow(<Notification
      notifications={[notification]}
      hideNotification={jest.fn()}
    />)

    expect(
      container.find(".notification-message-container .error").length).toBe(1);
  });

  it('should show success notification', () => {
    const notification = {
      id: 'notification-10',
      type: 'SUCCESS',
      message: "message - 1"
    }

    const container = shallow(<Notification
      notifications={[notification]}
      hideNotification={jest.fn()}
    />)

    expect(
      container.find(".notification-message-container .success").length).toBe(1);
  });

  it('should show notification', () => {
    const notification = {
      id: 'notification-10',
      type: 'SUCCESS1',
      message: "message - 1"
    }

    const container = shallow(<Notification
      notifications={[notification]}
      hideNotification={jest.fn()}
    />)

    expect(
      container.find(".notification-message-container").length).toBe(1);
  });

  it('should show warning notification', () => {
    const notification = {
      id: 'notification-10',
      type: 'WARNING',
      message: "message - 1"
    }

    const container = shallow(<Notification
      notifications={[notification]}
      hideNotification={jest.fn()}
    />)

    expect(
      container.find(".notification-message-container .warning").length).toBe(1);
  });

  it('should call hide notification', () => {
    const notification = {
      id: 'notification-10',
      type: 'WARNING',
      message: "message - 1"
    }

    const hideNotification = jest.fn();

    const container = shallow(<Notification
      notifications={[notification]}
      hideNotification={hideNotification}
    />)

    expect(hideNotification).toHaveBeenCalledWith('notification-10');
  });

  it('should show multiple notification', () => {
    const notification1 = {
      id: 'notification-10',
      type: 'SUCCESS',
      message: "message - 1"
    };
    const notification2 = {
      id: 'notification-11',
      type: 'ERROR',
      message: "message - 2"
    };
    const notification3 = {
      id: 'notification-13',
      type: 'WARNING',
      message: "message - 3"
    };

    const container = shallow(<Notification
      notifications={[notification1, notification2, notification3]}
      hideNotification={jest.fn()}
    />);

    expect(
      container.find(".notification-message-container .success").length).toBe(1);
    expect(
      container.find(".notification-message-container .error").length).toBe(1);
    expect(
      container.find(".notification-message-container .warning").length).toBe(1);
  });
})