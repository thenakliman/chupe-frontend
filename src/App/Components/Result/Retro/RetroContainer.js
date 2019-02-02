import {connect} from 'react-redux';
import {Retro} from './Retro';
import {getAllRetros} from '../../../Actions/retroActions';

const mapStateToProps = (state) => ({
  retros: state.retro.retros,
});

const mapDispatchToProps = (dispatch) => ({
  getAllRetros: () => dispatch(getAllRetros()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
