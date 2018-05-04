import {UserResult} from './UserResult';
import {connect} from 'react-redux';

export const mapStateToProps = (state) => ({
    users: state.users.usersData,
});

export default connect(mapStateToProps)(UserResult);
