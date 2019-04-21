import {notifications} from './notificationReducers';
import {ActionTypes} from '../Actions/ActionTypes';


describe('Notification reducer', () => {
  it('should add notification to redux', () => {
    const notification = {type: "ERROR", id: "10", message: "msg"};
    const newState = notifications([], {
      type: "SHOW_NOTIFICATION",
      payload: notification});

    expect(newState).toEqual([notification]);
  });

  it('should remove notification from redux', () => {
    const newState = notifications([{id: "LOADER-1"}, {id: "LOADER-2"}], {
      type: "HIDE_NOTIFICATION",
      payload: "LOADER-1"});

    expect(newState).toEqual([{id: "LOADER-2"}]);
  });

  it('should remove notification when only one loader is in redux', () => {
    const newState = notifications([{id: "LOADER-1"}], {
      type: "HIDE_NOTIFICATION",
      payload: "LOADER-1"
    });

    expect(newState).toEqual([]);
  });

  it('should return existing state when invalid action', () => {
    const newState = notifications([], {
      type: 'INVALID_ACTION',
      payload: {id: "LOADER_ID"}});

    expect(newState).toEqual([]);
  });

  it('should return default state when state is undefined', () => {
    const newState = notifications(undefined, {
          type: 'INVALID_ACTION',
          payload: {id: "LOADER_ID"},
      });

    expect(newState).toEqual([]);
  });
});
