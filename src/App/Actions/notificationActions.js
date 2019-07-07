import {ActionTypes} from './ActionTypes';

export const showNotification = (id, type, message) => ({
  type: ActionTypes.SHOW_NOTIFICATION,
  payload: {
    id: id,
    message: message,
    type: type,
  },
});


export const showNotificationFromObject = (notification) => ({
  type: ActionTypes.SHOW_NOTIFICATION,
  payload: {
    id: notification.id,
    message: notification.message,
    type: notification.type,
  },
});


export const hideNotification = (id) => ({
  type: ActionTypes.HIDE_NOTIFICATION,
  payload: id,
});
