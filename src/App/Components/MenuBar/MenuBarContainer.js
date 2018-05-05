import {connect} from 'react-redux';
import MenuBar from './Menu';
import {getAllUsers} from '../../Actions/userActions';
import {getAllQuestions} from '../../Actions/questionActions';

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getAllUsers());
    },
    getQuestions: () => {
        dispatch(getAllQuestions());
    },
});

export default connect(null, mapDispatchToProps)(MenuBar);
