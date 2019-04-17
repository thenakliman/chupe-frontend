import {connect} from 'react-redux';
import {FeedbackSessions} from './FeedbackSessions';
import {getAllFeedbackSessions} from '../../../Actions/feedbackSessionActions';


const mapStateToProps = (state) => ({
  feedbackSessions: state.feedback.feedbackSessions,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllFeedbackSessions: () => dispatch(getAllFeedbackSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackSessions);
