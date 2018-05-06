import {connect} from 'react-redux';
import {MenuBar} from './Menu';
import {changeCurrentView} from '../../Actions/currentViewActions';
import {RESULT_COMPONENTS} from '../constants';

const mapDispatchToProps = (dispatch) => ({
    showUserTab: () => {
        dispatch(changeCurrentView(RESULT_COMPONENTS.USER_COMPONENT));
    },
    showQuestionTab: () => {
        dispatch(changeCurrentView(RESULT_COMPONENTS.QUESTION_COMPONENT));
    },
});

export default connect(null, mapDispatchToProps)(MenuBar);
