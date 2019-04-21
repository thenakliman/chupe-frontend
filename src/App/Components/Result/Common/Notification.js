import React from 'react';
import propTypes from 'prop-types';
import {NotificationType} from './constants';

require('./Notification.css');

export class Notification extends React.Component {
  static getClassName(notificationType) {
    let className = 'notification-message-container ';
    if (notificationType === NotificationType.ERROR) {
      className += 'error';
    } else if (notificationType === NotificationType.SUCCESS) {
      className += 'success';
    } else if (notificationType === NotificationType.WARNING) {
      className += 'warning';
    }

    return className;
  }

  render() {
    if (this.props.notifications.length === 0) {
      return null;
    }

    return (<div>
      { this.props.notifications.map((notification) =>
        <div className={Notification.getClassName(notification.type)}
             key={notification.id}>
             {this.props.hideNotification(notification.id)}
          <b><i>{notification.message}</i></b>
        </div>
        )
      }
    </div>);
  }
}

Notification.propTypes = {
  notifications: propTypes.array.isRequired,
};
