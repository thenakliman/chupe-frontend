import {connect} from 'react-redux';
import {Retros} from './Retros';
import {createRetro, getAllRetros} from '../../../Actions/retroActions';
import {getPracticesAssessment} from "../../../Actions/bestPracticesActions";


const mapStateToProps = (state) => ({
  retros: state.retro.retros,
  practicesAssessment: state.retro.practicesAssessment,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllRetros: () => dispatch(getAllRetros()),
  createRetro: (retro) => dispatch(createRetro(retro)),
  getPracticesAssessment: (retro) => dispatch(getPracticesAssessment(retro))
});

export default connect(mapStateToProps, mapDispatchToProps)(Retros);
