import {setUsername} from '../../Actions/loginActions';
import {Login} from './Login';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => dispatch(setUsername(username)),
});

export default connect(null, mapDispatchToProps)(Login);
