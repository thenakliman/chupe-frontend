import {Question} from './Question';
import {connect} from 'react-redux';
import {RESULT_COMPONENTS} from '../../constants';
import {changeCurrentView, setCurrentQuestion}
            from '../../../Actions/currentViewActions';
import {getAllQuestions} from '../../../Actions/questionActions';


const mapStateToProps = (state) => ({
    questions: state.questions.questionsData,
});

const mapDispatchToProps = (dispatch) => ({
    askQuestion: () => {
        dispatch(changeCurrentView(RESULT_COMPONENTS.ASK_QUESTION_COMPONENT));
    },
    showQuestion: (questionID) => {
        dispatch(setCurrentQuestion(questionID));
        dispatch(changeCurrentView(RESULT_COMPONENTS.SHOW_QUESTION_COMPONENT));
    },
    getQuestions: () => {
        dispatch(getAllQuestions());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Question);
