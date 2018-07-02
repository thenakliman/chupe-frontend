import {authenticate} from '../../Actions/loginActions';
import {Login} from './Login';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.loggedInUserDetails.userName,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (username) => dispatch(authenticate(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
