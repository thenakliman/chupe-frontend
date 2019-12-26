import {Question} from './Question';
import {connect} from 'react-redux';
import {getAllQuestions} from '../../../Actions/questionActions';
import {getUsername} from '../../../utils/cookies';


const mapStateToProps = (state) => ({
  questions: state.questions,
  loggedInUser: getUsername(),
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => {
    dispatch(getAllQuestions());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Question);
