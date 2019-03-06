import {connect} from 'react-redux';
import {Retros} from './Retros';
import {getAllRetros, createRetro} from '../../../Actions/retroActions';


const mapStateToProps = (state) => ({
  retros: state.retro.retros,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllRetros: () => dispatch(getAllRetros()),
  createRetro: (retro) => dispatch(createRetro(retro)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Retros);
