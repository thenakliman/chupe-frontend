import {Question} from './Question';
import {connect} from 'react-redux';
import {RESULT_COMPONENTS} from '../../constants';
import {changeCurrentView} from '../../../Actions/currentViewActions';


const mapStateToProps = (state) => ({
    questions: state.questions.questionsData,
});

const mapDispatchToProps = (dispatch) => ({
    askQuestion: () => {
        dispatch(changeCurrentView(RESULT_COMPONENTS.ASK_QUESTION_COMPONENT));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Question);
