import {authenticate} from '../../Actions/loginActions';
import {Login} from './Login';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.loggedInUserDetails.userName,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: async (username, password) => {
    await dispatch(authenticate(username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
