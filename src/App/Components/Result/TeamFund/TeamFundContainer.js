import {TeamFund} from './TeamFund';
import {connect} from 'react-redux';
import {fetchTeamFund} from '../../../Actions/teamFundActions';


const mapStateToProps = (state) => ({
  teamFund: state.teamFund,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamFund: () => dispatch(fetchTeamFund()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamFund);
