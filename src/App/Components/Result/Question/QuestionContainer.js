import {Question} from './Question';
import {connect} from 'react-redux';
import {getAllQuestions} from '../../../Actions/questionActions';


const mapStateToProps = (state) => ({
    questions: state.questions.questionsData,
    loggedInUser: state.loggedInUserDetails.userName,
});

const mapDispatchToProps = (dispatch) => ({
    getQuestions: () => {
        dispatch(getAllQuestions());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Question);
