import {connect} from 'react-redux';
import {MeetingDiscussionItem} from './MeetingDiscussionItem';
import {
  getMeetingDiscussionItems,
  createMeetingDiscussionItem,
  } from '../../../Actions/meetingActions';
import {getAllUsers} from '../../../Actions/userActions';


const mapStateToProps = (state) => ({
  meetingDiscussionItems: state.meeting.meetingDiscussionItems,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getMeetingDiscussionItems:
    (meetingId) => dispatch(getMeetingDiscussionItems(meetingId)),
  createMeetingDiscussionItem:
    (discussionItem) => dispatch(createMeetingDiscussionItem(discussionItem)),
  getAllUsers: () => dispatch(getAllUsers()),
});

export default
  connect(mapStateToProps, mapDispatchToProps)(MeetingDiscussionItem);
