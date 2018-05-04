import {connect} from 'react-redux';
import MenuBar from './Menu';
import {getAllUsers} from '../../Actions/userActions';

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getAllUsers());
    },
});

export default connect(null, mapDispatchToProps)(MenuBar);
