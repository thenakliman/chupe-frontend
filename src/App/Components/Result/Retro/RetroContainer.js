import {connect} from 'react-redux';
import {Retro} from './Retro';
import {getRetroPoints} from '../../../Actions/retroActions';

export const mapStateToProps = (state) => ({
  retroPoints: state.retro.retroPoints,
});

export const mapDispatchToProps = (dispatch) => ({
  getRetroPoints: (retroId) => dispatch(getRetroPoints(retroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
