import {connect} from 'react-redux';
import {Feedbacks} from './Feedbacks';
import {getAllFeedbacks} from '../../../Actions/feedbackSessionActions';


const mapStateToProps = (state) => ({
  feedbacks: state.feedback.feedbacks,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllFeedbacks: (sessionId) => dispatch(getAllFeedbacks(sessionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks);
