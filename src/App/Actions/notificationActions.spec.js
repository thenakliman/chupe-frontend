import {hideNotification, showNotification} from './notificationActions';

describe('should create notification actions', () => {
  it('should return show notification action', async () => {
    const id = 'i-d';
    const type = 'ERROR';
    const message = 'new message';
    expect(showNotification(id, type, message)).toEqual({
      type: 'SHOW_NOTIFICATION',
      payload: {
        id: id,
        type: type,
        message: message,
      },
    });
  });

  it('should return hide notification action', async () => {
    const notificationId = 'notification-id';
    expect(hideNotification(notificationId)).toEqual({
      type: 'HIDE_NOTIFICATION',
      payload: notificationId,
    });
  });
});
