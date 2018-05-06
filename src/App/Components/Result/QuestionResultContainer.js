import React from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {QuestionResult} from './QuestionResult';
import {askQuestion} from '../../Actions/questionActions';
import {getAllQuestions} from '../../Actions/questionActions';

export const mapDispatchToProps = (dispatch) => ({
    askQuestion: (question) => {
        dispatch(askQuestion(question));
    },
    getQuestions: () => {
        dispatch(getAllQuestions());
    },
});

export default connect(null, mapDispatchToProps)(QuestionResult);
