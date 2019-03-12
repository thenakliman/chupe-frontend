import {connect} from 'react-redux';
import {Retro} from './Retro';
import {
  getRetroPoints,
  castVote,
  createRetroPoint} from '../../../Actions/retroActions';

export const mapStateToProps = (state) => ({
  retroPoints: state.retro.retroPoints,
});

export const mapDispatchToProps = (dispatch) => ({
  getRetroPoints: (retroId) => dispatch(getRetroPoints(retroId)),
  vote: (retroId, retroPointId) => dispatch(castVote(retroId, retroPointId)),
  createRetroPoint: (retroPoint) => dispatch(createRetroPoint(retroPoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
