import {connect} from 'react-redux';
import {Retros} from './Retros';
import {getAllRetros} from '../../../Actions/retroActions';

const mapStateToProps = (state) => ({
  retros: state.retro.retros,
});

const mapDispatchToProps = (dispatch) => ({
  getAllRetros: () => dispatch(getAllRetros()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retros);
