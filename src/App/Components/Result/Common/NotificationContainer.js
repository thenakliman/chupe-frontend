import {connect} from 'react-redux';
import {hideNotification} from '../../../Actions/notificationActions';
import {Notification} from './Notification';

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  hideNotification: (id) => {
    setTimeout(() => dispatch(hideNotification(id)), 10000);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
