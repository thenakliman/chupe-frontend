import {connect} from 'react-redux';
import {Retro} from './Retro';
import {getAllUsers} from '../../../Actions/userActions';
import {
  castVote,
  changeStatus,
  createActionItem,
  createRetroPoint,
  getActionItems,
  getAllRetros,
  getRetroPoints
} from '../../../Actions/retroActions';

export const mapStateToProps = (state) => ({
  retroPoints: state.retro.retroPoints,
  actionItems: state.retro.actionItems,
  retros: state.retro.retros,
  users: state.users,
});

export const mapDispatchToProps = (dispatch) => ({
  getRetroPoints: (retroId) => dispatch(getRetroPoints(retroId)),
  getAllRetros: () => dispatch(getAllRetros()),
  vote: (retroId, retroPointId) => dispatch(castVote(retroId, retroPointId)),
  createRetroPoint: (retroPoint) => dispatch(createRetroPoint(retroPoint)),
  createActionItem: (actionItem) => dispatch(createActionItem(actionItem)),
  getActionItems: (retroId) => dispatch(getActionItems(retroId)),
  getUsers: () => dispatch(getAllUsers()),
  changeStatus: (retroId, status) => dispatch(changeStatus(retroId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
