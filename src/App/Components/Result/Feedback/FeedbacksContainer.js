import {connect} from 'react-redux';
import {Feedbacks} from './Feedbacks';
import {createFeedback, getAllFeedbacks,} from '../../../Actions/feedbackActions';
import {getAllUsers} from '../../../Actions/userActions';


const mapStateToProps = (state) => ({
  feedbacks: state.feedback.feedbacks,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFeedbacks: (sessionId) => dispatch(getAllFeedbacks(sessionId)),
  giveFeedback: (sessionId) => dispatch(createFeedback(sessionId)),
  getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks);
