import {UserResult} from './UserResult';
import {connect} from 'react-redux';
import {getAllUsers} from '../../../Actions/userActions';

export const mapStateToProps = (state) => ({
    users: state.users.usersData,
});

export const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getAllUsers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserResult);
