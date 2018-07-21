import React from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import {AskQuestion} from './AskQuestion';
import {askQuestion} from '../../../Actions/questionActions';
import {getAllUsers} from '../../../Actions/userActions';

const mapStateToProps = (state) => ({
    users: state.users,
});

export const mapDispatchToProps = (dispatch) => ({
    askQuestion: (question) => dispatch(askQuestion(question)),
    getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
