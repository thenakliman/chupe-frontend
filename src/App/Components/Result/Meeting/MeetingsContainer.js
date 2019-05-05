import {connect} from 'react-redux';
import {Meetings} from './Meetings';
import {getMeetings, createMeeting} from '../../../Actions/meetingActions';

const mapStateToProps = (state) => ({
  meetings: state.meeting.meetings,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllMeetings: () => dispatch(getMeetings()),
  createMeeting: (meeting) => dispatch(createMeeting(meeting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
