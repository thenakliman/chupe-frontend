import React from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {QuestionList} from './QuestionList';
import {askQuestion} from '../../Actions/questionActions';
import {getAllQuestions} from '../../Actions/questionActions';

const mapStateToProps = (state) => ({
    users: state.users.usersData,
});

export const mapDispatchToProps = (dispatch) => ({
    askQuestion: (question) => {
        dispatch(askQuestion(question));
    },
    getQuestions: () => {
        dispatch(getAllQuestions());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
