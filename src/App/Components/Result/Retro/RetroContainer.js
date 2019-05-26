import {connect} from 'react-redux';
import {Retro} from './Retro';
import {getAllUsers} from '../../../Actions/userActions';

import {
  getRetroPoints,
  getActionItems,
  createActionItem,
  castVote,
  createRetroPoint} from '../../../Actions/retroActions';

export const mapStateToProps = (state) => ({
  retroPoints: state.retro.retroPoints,
  actionItems: state.retro.actionItems,
  users: state.users,
});

export const mapDispatchToProps = (dispatch) => ({
  getRetroPoints: (retroId) => dispatch(getRetroPoints(retroId)),
  vote: (retroId, retroPointId) => dispatch(castVote(retroId, retroPointId)),
  createRetroPoint: (retroPoint) => dispatch(createRetroPoint(retroPoint)),
  createActionItem: (actionItem) => dispatch(createActionItem(actionItem)),
  getActionItems: (retroId) => dispatch(getActionItems(retroId)),
  getUsers: () => dispatch(getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
