import React from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {AskQuestion} from './AskQuestion';
import {askQuestion} from '../../../Actions/questionActions';

const mapStateToProps = (state) => ({
    users: state.users,
});

export const mapDispatchToProps = (dispatch) => ({
    askQuestion: (question) => {
        dispatch(askQuestion(question));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
