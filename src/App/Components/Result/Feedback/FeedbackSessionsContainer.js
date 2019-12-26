import {connect} from 'react-redux';
import {FeedbackSessions} from './FeedbackSessions';
import {createFeedbackSession, getAllFeedbackSessions} from '../../../Actions/feedbackActions';


const mapStateToProps = (state) => ({
  feedbackSessions: state.feedback.feedbackSessions,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllFeedbackSessions: () => dispatch(getAllFeedbackSessions()),
  createFeedbackSession: (feedbackSession) => dispatch(
      createFeedbackSession(feedbackSession)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackSessions);
