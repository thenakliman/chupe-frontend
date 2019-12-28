import {connect} from 'react-redux'
import {PracticesAssessment} from './PracticesAssessment'
import {getBestPractices, savePracticeAssessment} from '../../../Actions/bestPracticesActions'

export const mapStateToProps = (state) => ({
    practices: state.retro.practices
});

export const mapDispatchToProps = (dispatch) => ({
    fetchPractices: () => dispatch(getBestPractices()),
    savePracticeAssessment: (retroId, assessments) => dispatch(savePracticeAssessment(retroId, assessments))
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticesAssessment);
